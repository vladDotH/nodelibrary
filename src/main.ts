import Koa from "koa";

import { apiController } from "@/controllers/api.controller";
import { configService } from "@/services/config.service";
import { logger } from "@/util/logger";
import bodyParser from "koa-bodyparser";
import passport from "koa-passport";
import { LocalStrategy } from "@/auth/local.strategy";
import { JwtStrategy } from "@/auth/jwt.strategy";
import { errorsHandler } from "@/util/errors-handler";

const app = new Koa();
app.keys = [configService.SESSION_SECRET];

app.use(errorsHandler);
app.use(bodyParser());

app.use(passport.initialize());
passport.use(LocalStrategy);
passport.use(JwtStrategy);

app.use(apiController.routes());
app.listen(configService.PORT, configService.HOST);
logger.info(`App started in ${configService.APP_URL}`);
