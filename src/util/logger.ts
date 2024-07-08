import winston from "winston";
import process from "process";
import { DateTime } from "luxon";

export const logger = winston.createLogger({
  level: "debug",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.colorize(),
    winston.format.printf(
      (info) =>
        `[App - ${process.pid}] ` +
        `${DateTime.fromISO(info.timestamp)!.toLocaleString({
          timeStyle: "medium",
          dateStyle: "short",
        })} ` +
        (info.tag ? `(${info.tag}) ` : "") +
        `${info.level} ` +
        `${info.message}`,
    ),
  ),
  transports: [new winston.transports.Console()],
});
