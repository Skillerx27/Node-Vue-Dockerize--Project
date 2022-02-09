<template>
  <main id='app'>
  <section v-if="products.length > 0">
     <section class='products'>
  <Product
  />
  </section>
  </section>
  <h1 v-else>Please Login </h1>
  </main>
</template>
<script>
 import Product from '../components/Product.vue'
  import axios from 'axios'
  export default {
    name: 'About',
    components: {
      Product
    },
    data () {
      return {
        products: [],
        isConnected: false,
        socketMessage: ''
      }
    },
    sockets: {
    connect () {
      // Fired when the socket connects.
      this.isConnected = true
    }
    },
    async created () {
      await axios.get('http://localhost:3030/api/v1/auth/producList', {
        headers: {
            Authorization: localStorage.getItem('token')
        }
      }).then(result => {
         if (result.data.status === 200) {
         this.products = result.data.data
        }
      })
    },
    methods: {
      pingServer () {
      // Send the "pingServer" event to the server.
      // this.$socket.emit('bidPrice', 'PING!')
    }
   }
  }
</script>
<style>
</style>
