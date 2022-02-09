<template>
  <form @submit.prevent="handleSubmit">
    <div class="container">
      <div class="row">
      <h3>Login</h3>
    <div class="col-md-3"></div>
    <div class="col-md-6">
      <div class='form-group'>
      <label>Email </label>
      <input type='email' class='form-control' v-model="email" placeholder='Email'>
    </div>
    <div class='form-group'>
      <label>Password </label>
      <input type='password' class='form-control' v-model="password" placeholder='Password'>
    </div>
    </div>
    <div>
      <button class='btn btn-primary btn-block login-btn'>Login</button>
    </div>
    </div>
    </div>
  </form>
</template>

<script>
import SocketioService from '../components/socketioService'
import axios from 'axios'
export default {
  name: 'login',
  data () {
    return {
      email: '',
      password: ''
    }
  },
  created () {
      SocketioService.setupSocketConnection()
  },
  methods: {
    handleSubmit () {
      const data = {
        email: this.email,
        password: this.password
      }
      if (data.email && data.password) {
        axios.post('http://localhost:3030/api/v1/auth/login', data)
          .then(res => {
            if (res.data.status === 200) {
                localStorage.setItem('token', res.data.token)
                localStorage.setItem('userId', res.data.data.id)
                localStorage.setItem('userName', res.data.data.name)
                this.$router.push({ name: 'About' })
                SocketioService.setupSocketConnection()
            } else {
              this.$toast.show('Wrong user credentials', {
                type: 'error'
              })
            }
        }
      )
      } else {
        this.$toast.show('email or password is missing', {
                type: 'error'
        })
      }
      console.log('submittedasdasds', data)
    }
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.login-btn{
  margin-top: 10px;
  padding: 5px 30px;
}
</style>
