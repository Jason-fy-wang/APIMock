import winston from "winston";
import "winston-daily-rotate-file";

const {format} = winston
const {combine, timestamp, printf} = format

const transports = [
    //fileRotateTransport,   // for docker deploy,  disable output to file
    new winston.transports.Console()
  ];
if (process.env.ENABLE_FILE_LOG === 'true'){
  const fileRotateTransport = new winston.transports.DailyRotateFile({
    filename: "logs/%DATE%.log",
    datePattern: "YYYY-MM-DD",
    zippedArchive: true,
    maxSize: "100m",
    maxFiles: "14d",
  });
  transports.push(fileRotateTransport)
}
const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || "info",
  defaultMeta: { service: "mock-api" },
  exitOnError: false,
  format: combine(
    format.errors({stack: true}),
    timestamp({
        format: "YYYY-MM-DD HH:mm:ss.SSS"
    }),
    printf(({ timestamp, level, message }) => {
      return `${timestamp} [${level}]: ${message}`;
    })
  ),
  transports:[
    ...transports
  ]
});


export {logger};
