import winston from "winston";

const logger = winston.createLogger({
  transports: [
    new winston.transports.File({
      filename: "logs/errors.log",
      level: "error",
    }),

    new winston.transports.File({
      filename: "logs/warn.log",
      level: "warn",
    }),

    new winston.transports.File({
      filename: "logs/info.log",
      level: "info",
    }),

    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      ),
    }),
  ],
});

export default logger;
