import pg from "pg";
import { configService } from "@/services/config.service";
import { logger } from "@/util/logger";
const { Pool } = pg;

export const db = new Pool({
  host: configService.DB_HOST,
  port: configService.DB_PORT,
  user: configService.DB_USER,
  database: configService.DB_NAME,
  password: configService.DB_PASSWORD,
  max: configService.DB_MAX_POOL,
  idleTimeoutMillis: configService.DB_IDLE_TIMEOUT,
  connectionTimeoutMillis: configService.DB_CONN_TIMEOUT,
  log: (messages) => {
    logger.debug(messages, { tag: "DB" });
  },
});
