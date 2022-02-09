// require modules
const express = require("express")
const helmet = require("helmet")
const bodyParser = require("body-parser")
const cors = require("cors")
const morgan = require("morgan")
const socketToken = require('./config/socketToken').socketToken
const logger = require('./config/logger')

/**
 * load Product Services
 * @type {class} productService
 */
const productService = require('./app/service/productService')
/**
 * init
 * @type {object} productServiceObj
 */
const productServiceObj = new productService()

//  app init
const app = express();

// Dotenv will be used for accessing the environment variables
const dotenv = require("dotenv")
dotenv.config()

app.use(morgan("URL :url Method :method StatusCode :status"));

//securing the backend with helmet and cors
app.use(helmet())
app.use(
  cors({
    origin: [
      "http://localhost:8080",
    ],
    credentials: true,
  })
)

// parse incoming body request
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//Socket for main server request
var socket = require('socket.io')
var server = app.listen(4040, function () {
  console.log('main socket is listening on port 4040');
});

let io = socket(server)
io.on('connection', async function (socket, next) {
  let flag = false
  const token = socket.handshake.auth.token;
  req = {
    headers: { authorization: token }
  }
  await socketToken(req, socket.res, next)
    .then(result => {
      flag = true
    })
    .catch((err) => {
      return next(new Error('Invalid Token 1'))
    })

  console.log(`${socket.id} is connected`);
  socket.on('disconnect', function (socket) {
    console.log(`user is disconnected`);
  });

  if (flag) {
     socket.on('bidPrice', async (data) => {
      console.log("FONTED DATA ",data)
      productServiceObj.bidProduct(data)
        .then(result => {
          socket.emit('prodStatus', result);
        }).catch(er => {
          console.log("ERROR",er)
          socket.emit('prodStatus', result)
        })
    });
  }

});



//socket for testing 
var server = app.listen(5050, function () {
  console.log('test socket listening for requests on port 5050');
});

let testio = socket(server)
testio.on('connection', async function (socket, next) {
  console.log(`${socket.id} is connected`)

  socket.on('disconnect', function (socket) {
    console.log(`user is disconnected`);
  });

  socket.on('bidPrice', async (data) => {
    await productServiceObj.bidProduct(data)
      .then(result => {
        console.log("DATA UPDATED", result)
        // io.emit('prodStatus', JSON.stringify(result))
        socket.emit('prodStatus', result);
      }).catch(er => {
        console.log("ERROR", er)
        socket.emit('prodStatus', result)
      })
  })
})

const userRoute = require("./routes/userRoutes/UserAuthRoute");
// route middlewares for users
app.use("/api/v1/auth", userRoute);

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log('Express is running on port', port)
  logger.log("info", `Server is listening on port: ${port}`)
})
