import path from "path";
import swaggerAutogen from "swagger-autogen";
import * as fs from "fs";
import { configService } from "@/services/config.service";

const doc = {
  info: {
    title: "My API",
    description: "Description",
  },
  host: configService.APP_URL,
  basePath: `/${configService.APP_PREFIX}`,
};

const conrtollersFolder = "src/controllers";
const outputFile = path.join(__dirname, "swagger.json");

const endpointsFiles = fs
  .readdirSync(conrtollersFolder)
  .map((file) => `${conrtollersFolder}/${file}`);

swaggerAutogen()(outputFile, endpointsFiles, doc);
