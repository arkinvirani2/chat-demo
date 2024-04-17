import winston from "winston";

const { combine, timestamp, printf } = winston.format;
const myFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} ${level}: ${message}`;
});
const logger = winston.createLogger({
  levels: winston.config.syslog.levels,
  format: combine(timestamp(), myFormat),
  transports: [new winston.transports.Console()],
});

export default logger;
