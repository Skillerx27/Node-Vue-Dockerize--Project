var expect = require("chai").expect;
var io = require("socket.io-client");

//connecting to socket test server
var socketUrl = "http://localhost:5050";

var options = {
    transports: ["websocket"],
    "force new connection": true,
};

//helper functionto generate day
function generateDate(day) {
    //calucalting today date
    let result = new Date();
    if (day) {
        result.setDate(result.getDate() + day)
    }
    result.setDate(result.getDate())
    var day = String(result.getDate()).padStart(2, '0')
    var month = String(result.getMonth() + 1).padStart(2, '0')
    var year = result.getFullYear()
    var todayDate = year + "/" + month + '/' + day

    return todayDate
}

//helper funcion to generate time
function generateTime() {
    let todayDate = new Date();
    let todayTime = todayDate.toLocaleTimeString([], { hour12: false });
    return todayTime
}

describe("Sockets", function () {
    var client1, client2, client3;

    it("Test user connected with socket", function (done) {
        // client1 = io.connect(socketUrl, options);
        client1 = io.connect(socketUrl, options);
        done();
    })


    // user cann't bid before start time
    it("This bid has not started", function (done) {
        let date = generateDate()
        let time = generateTime()
        // Set up client1 connection
        client1 = io.connect(socketUrl, options);
        client1.emit("bidPrice", { productId: 0, userId: 1, date: date, time: time , bidPrice: 15})
        client1.on('prodStatus', (data) => {
            expect(data.status).to.equal(200)
            done()
        })
    });
    
    // user cann't bid because time over
    it("this bid time is over", function (done) {
        let date = generateDate()
        let time = generateTime()

        console.log('time', time)
        // Set up client1 connection
        client1 = io.connect(socketUrl, options);
        client1.emit("bidPrice", { productId: 1, userId: 1, date: date, time: time , bidPrice: 15})
        client1.on('prodStatus', (data) => {
            expect(data.status).to.equal(200)
            done()
        })
    });
    
    // user can bid this product
    it("bid successful", function (done) {
        let date = generateDate()
        let time = generateTime()
        // Set up client1 connection
        client1 = io.connect(socketUrl, options);
        client1.emit("bidPrice", { productId: 2, userId: 1, date: date, time: time , bidPrice: 15})
        client1.on('prodStatus', (data) => {
            expect(data.status).to.equal(200)
            done()
        })
    });
    
    // cant not bid above the predifined limit
    it("biding with above predfined limit", function (done) {
        let date = generateDate()
        let time = generateTime()
        // Set up client1 connection
        client1 = io.connect(socketUrl, options);
        client1.emit("bidPrice", { productId: 2, userId: 1, date: date, time: time, bidPrice: 250})
        client1.on('prodStatus', (data) => {
            expect(data.status).to.equal(200)
            done()
        })
    });
    
    // subsequently bidding 
    it("subsequent bidding will failed", function (done) {
        let date = generateDate()
        let time = generateTime()
        // Set up client1 connection
        client1 = io.connect(socketUrl, options);
        client1.emit("bidPrice", { productId: 2, userId: 1, date: date, time: time, bidPrice: 15})
        client1.on('prodStatus', (data) => {
            expect(data.status).to.equal(200)
            done()
        })
    });

});


