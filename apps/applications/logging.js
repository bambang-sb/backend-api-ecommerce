const winston = require('winston');


let fileNameError = "logs/error.log";
let fileNameCombined = "logs/combined.log";
if (process.env.NODE_ENV === 'production') {
  fileNameError = "logs/error.log";
  fileNameCombined = "logs/combined.log";
}

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({ filename: fileNameError, level: 'error' }),
    new winston.transports.File({ filename: fileNameCombined }),
  ],
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple(),
  }));
}

module.exports = logger;