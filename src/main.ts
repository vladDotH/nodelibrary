import Koa from "koa";

import { apiController } from "@/controllers/api.controller";
import { configService } from "@/services/config.service";
import { logger } from "@/util/logger";
import bodyParser from "koa-bodyparser";

const app = new Koa();

app.use(errorsHandler);
app.use(bodyParser());

app.use(apiController.routes());
app.listen(configService.PORT, configService.HOST);
logger.info(`App started in ${configService.APP_URL}`);
