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
  basePath: "/api",

  definitions: {
    // модель задачи
    Todo: {
      id: "1",
      text: "test",
      done: false,
    },
    // модель массива задач
    Todos: [
      {
        // ссылка на модель задачи
        $ref: "#/definitions/Todo",
      },
    ],
    // модель объекта с текстом новой задачи
    Text: {
      text: "test",
    },
    // модель объекта с изменениями существующей задачи
    Changes: {
      changes: {
        text: "test",
        done: true,
      },
    },
  },
};

const conrtollersFolder = "src/controllers";
const outputFile = path.join(__dirname, "swagger.json");

const endpointsFiles = fs
  .readdirSync(conrtollersFolder)
  .map((file) => `${conrtollersFolder}/${file}`);

swaggerAutogen()(outputFile, endpointsFiles, doc);
