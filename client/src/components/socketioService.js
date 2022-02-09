import { io } from 'socket.io-client'

 function generateDate (days) {
  const result = new Date()
  if (days) {
      result.setDate(result.getDate() + days)
  }
  result.setDate(result.getDate())
  var day = String(result.getDate()).padStart(2, '0')
  var month = String(result.getMonth() + 1).padStart(2, '0')
  var year = result.getFullYear()
  var todayDate = year + '/' + month + '/' + day
  return todayDate
}

 function generateTime () {
  const todayDate = new Date()
  const todayTime = todayDate.toLocaleTimeString([], { hour12: false })
  return todayTime
}

class SocketioService {
  socket
  locaData
  setupSocketConnection () {
    this.socket = io('http://localhost:4040', {
      transports: ['websocket'],
      auth: {
        token: localStorage.getItem('token')
      }
    })
  }

  disconnect () {
    if (this.socket) {
      this.socket.disconnect()
    }
  }

  async sendPrice (productId, price) {
    // console.log('here', { productId: productId, price: price, userId: localStorage.getItem('userId') })
    const date = generateDate()
    const time = generateTime()
    console.log('console.log', date, time)
     this.socket.emit('bidPrice', { productId: productId, bidPrice: price, userId: localStorage.getItem('userId'), userName: localStorage.getItem('userName'), date: date, time: time })
    var resposeData
    await new Promise(resolve => {
      this.socket.on('prodStatus', data => {
        console.log('gotted data', data)
         resposeData = data
         resolve(resposeData)
      })
    })
    console.log('this.locaData', resposeData)
    return resposeData
    // await this.socket.on('prodStatus', async (data) => {
    //   console.log('data==', data)
    //   result = await data
    //   return result
    // })
  }
}
export default new SocketioService()
