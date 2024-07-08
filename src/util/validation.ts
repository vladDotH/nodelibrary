import { BadRequest } from "http-errors";
import Joi from "joi";

export function validate<T>(schema: Joi.Schema<T>, data: any) {
  const res = schema.validate(data);
  if (res.error) {
    throw BadRequest(res.error.message);
  }
  return res.value;
}
