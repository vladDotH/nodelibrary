import jwt from "passport-jwt";
import { configService } from "@/services/config.service";

export const JwtStrategy = new jwt.Strategy(
  {
    secretOrKey: configService.SESSION_SECRET,
    jwtFromRequest: (req) => {
      console.log(req);
      return req.cookies.get(configService.COOKIE_KEY);
    },
  },
  function (payload, done) {
    console.log("jwt strategy: ", payload, done);

    return done("Error", false);
  },
);
