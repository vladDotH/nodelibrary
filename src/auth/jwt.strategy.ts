import jwt from "passport-jwt";
import { configService } from "@/services/config.service";
import { usersService } from "@/services/users.service";
import { Unauthorized } from "http-errors";

export const JwtStrategy = new jwt.Strategy(
  {
    secretOrKey: configService.SESSION_SECRET,
    jwtFromRequest: (req) => {
      return req.cookies.get(configService.COOKIE_KEY) ?? null;
    },
    passReqToCallback: true,
  },
  async function (req, payload, done) {
    const user = await usersService.getUser({ id: payload.id });
    if (!user) done(Unauthorized(), false);
    return done(null, user);
  },
);
