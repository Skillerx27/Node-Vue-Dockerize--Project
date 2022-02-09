<template>
  <div class="product row">
  <div v-for="todo in allProducts" :key="todo.id" class="todo col-md-4">
     <div :class="'product-inner ' + todo.id">
      <div class="product-text-wrap">
        <h2 class="bg-text">Name: {{ todo.name }}</h2>
      </div>
      <div class="product-text-wrap">
        <h2 class="bg-text">Price: {{ todo.price }}</h2>
      </div>
      <div class="product-text-wrap">
        <h2 class="bg-text">Bid Price Limit: {{ todo.bidPriceLimit }}</h2>
      </div>
      <div class="product-text-wrap">
        <h2 class="bg-text">Bidding Start Date: {{ todo.startDate }}</h2>
      </div>
      <div class="product-text-wrap">
        <h2 class="bg-text">Bidding Start Time: {{convertTime(todo.startTime)}}</h2>
      </div>
      <div class="product-text-wrap">
        <h2 class="bg-text">Bidding Duration: {{convertDuration(todo.duration)}}</h2>
      </div>
      <div class="product-text-wrap">
        <h2 class="bg-text">{{winnerName(todo.startTime, todo.duration, todo.startDate, todo.userName)}}</h2>
      </div>
      <div class="product-image-wrap">
        <img :src="todo.imgUrl" class="image" />
      </div>
      <div class="product-detail">
        <h2>{{ todo.title }}</h2>
      </div>
      <div>
        <div>
          <input type='number' class='form-control' v-model="price" placeholder='Enter Bid Amount'>
        </div>
        <button
          v-on:click="handleSubmit(todo.id)"
          class="btn btn-primary btn-block bit-btn"
        >
          Bid
        </button>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
import SocketioService from '../components/socketioService'
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'product',
  data () {
    return {
      countdown: null,
      price: null
    }
  },
  methods: {
  winnerName (startTime, duration, startDate, userName) {
    const todayDate = new Date()
    const todayTime = todayDate.toLocaleTimeString([], { hour12: false })

    todayDate.setDate(todayDate.getDate())
    const day = String(todayDate.getDate()).padStart(2, '0')
    const month = String(todayDate.getMonth() + 1).padStart(2, '0')
    const year = todayDate.getFullYear()
    const todayFromatedDate = year + '/' + month + '/' + day

    const splitedTime = todayTime.split(':')
    const presenTime = (splitedTime[0] + ':' + splitedTime[1])
    const stHour = Number(startTime.split(':')[0])
    const stMinute = Number(startTime.split(':')[1])
    const drHour = Number(duration / 60).toFixed(0)
    const drMinute = Number(duration % 60).toFixed(0)
    const totalHour = Number(stHour) + Number(drHour)
    const totalMinute = Number(stMinute) + Number(drMinute)
    if (totalMinute >= 60) {
      const bidOverTime = Number(Number(totalMinute / 60).toFixed(0)) + Number(totalHour) + ':' + Number(totalMinute % 60)
      if (presenTime >= bidOverTime && todayFromatedDate === startDate) {
          return userName
      } else {
        return 'HIDDEN'
      }
    } else {
      const bidOverTime = totalHour + ':' + totalMinute
      if (presenTime >= bidOverTime && todayFromatedDate === startDate) {
          return userName
      } else {
        return 'HIDDEN'
      }
    }
  },
   convertTime (time) {
    let hour = Number(time.split(':')[0])
    const minute = Number(time.split(':')[1])
    if (hour === 12) {
      return String(hour + ':' + minute + ' A.M')
    } else if (hour > 12) {
       hour = hour % 12
       return String(hour + ':' + minute + ' P.M')
    } else {
      return String(hour + ':' + minute + ' A.M')
    }
  },
   convertDuration (time) {
    const hour = Number(time / 60).toFixed(0)
    const minute = Number(time % 60).toFixed(0)
    if (minute > 0) {
      return String(hour + ' Hour ' + minute + ' minute ')
    } else {
       return String(hour + ' Hour ')
    }
  },
    ...mapActions(['fetchTodos']),
    async handleSubmit (productId) {
      const data = this.price
      if (data != null) {
        await SocketioService.sendPrice(productId, data).then((res) => {
        console.log('value==============', res)
        if (res.status === 200) {
          this.fetchTodos()
          this.$toast.show(res.msg, {
           type: 'success'
          })
        } else {
          this.fetchTodos()
          this.$toast.show(res.msg, {
           type: 'error'
          })
        }
      })
      } else {
          this.$toast.show('price field empty!!', {
           type: 'error'
          })
      }
    }
  },
  computed: {
     ...mapGetters(['allProducts'])
  },
  created () {
     this.fetchTodos()
     SocketioService.setupSocketConnection()
  }
}
</script>

<style>
.product {
  width: 100%;
  padding: 25px;
}
.product-image-wrap .image {
  width: 100%;
}
.product-inner {
  position: relative;
  padding: 25px;
  box-shadow: 0px 0px 16px rgba(0, 0, 0, 0.25);
  margin-top: 10px
}
.product-detail p {
  font-size: 14px;
  line-height: 1.5;
  font-weight: 300;
  color: #676767;
}

.product-text-wrap .bg-text{
  font-size: 18px;
}
.bit-btn{
  padding: 5px 30px;
  margin-top: 10px;
}
</style>
