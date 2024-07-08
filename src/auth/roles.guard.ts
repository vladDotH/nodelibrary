import { Context, Next } from "koa";
import { RoleBits } from "@/auth/roles";
import { sum } from "lodash";
import { Unauthorized } from "http-errors";

export function rolesGuard(...roles: RoleBits[]) {
  const mask = sum(roles.map((r) => 1 << r));
  return (ctx: Context, next: Next) => {
    if (!ctx.user || !(ctx.user.rolesMask & mask)) {
      throw Unauthorized();
    }
    return next();
  };
}
