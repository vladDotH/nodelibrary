import { Context, Next } from "koa";
import passport from "koa-passport";
import { AuthenticateOptions } from "passport";
import { User } from "@/types/user";
import { Unauthorized } from "http-errors";

export function authGuard(
  strategy: string,
  options: AuthenticateOptions = { session: false },
) {
  return async (ctx: Context, next: Next) => {
    const user = await new Promise<User>((resolve, reject) => {
      const authFn = passport.authenticate(strategy, options, (err, user) => {
        if (err) reject(err);
        else resolve(user);
      });
      authFn(ctx, next);
    });

    if (!user) throw Unauthorized();
    ctx.user = user;
    await next();
  };
}
