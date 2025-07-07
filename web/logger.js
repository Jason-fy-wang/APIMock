import winston from "winston";
import "winston-daily-rotate-file";

const {format} = winston
const {combine, timestamp, printf} = format


const fileRotateTransport = new winston.transports.DailyRotateFile({
  filename: "logs/%DATE%.log",
  datePattern: "YYYY-MM-DD",
  zippedArchive: true,
  maxSize: "100m",
  maxFiles: "14d",
});

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
  transports: [
    fileRotateTransport,
    new winston.transports.Console()
  ],
});


export {logger};
