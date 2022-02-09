const winston = require('winston');
const logger =  winston.createLogger({
  transports: [
    new winston.transports.File({
      level: 'info',
      filename: 'logfile.log',
      json: true,
      format: winston.format.combine(winston.format.timestamp(), winston.format.json())
    }),
    new winston.transports.File({
      level: 'error',
      filename: 'error-logfile.log',
      json: true,
      format: winston.format.combine(winston.format.timestamp(), winston.format.json())
    })
  ]
})

module.exports=logger