import { logger } from "@/util/logger";
import { Context, Next } from "koa";

export async function errorsHandler(ctx: Context, next: Next) {
  try {
    await next();
  } catch (err) {
    logger.error(err.message);
    logger.verbose(err.stack?.toString());
    ctx.status = err.status ?? 500;
    ctx.body = err.message;
  }
}
