import { Context, Next } from "koa";
import passport from "koa-passport";
import { AuthenticateOptions } from "passport";
import { User } from "@/types/user";

export function authGuard(
  strategy: string,
  options: AuthenticateOptions = { session: false },
) {
  return async (ctx: Context, next: Next) => {
    const user = (await new Promise((error, resolve) => {
      passport.authenticate(strategy, options, (err, user) => {
        if (err) throw error(err);
        else resolve(user);
      });
    })) as User;

    ctx.user = user;
    return next();
  };
}
