import path from "path";
import swaggerAutogen from "swagger-autogen";
import * as fs from "fs";

const doc = {
  info: {
    title: "My API",
    description: "Description",
  },
  host: "localhost:3030",
};

const conrtollersFolder = "src/controllers";
const outputFile = path.join(__dirname, "swagger.json");

const endpointsFiles = fs
  .readdirSync(conrtollersFolder)
  .map((file) => `${conrtollersFolder}/${file}`);

swaggerAutogen()(outputFile, endpointsFiles, doc);
