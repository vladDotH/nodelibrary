import Joi from "joi";
import { UserCreate } from "@/types/User";

export const UserCreateDto = Joi.object<UserCreate>({
  email: Joi.string().required(),
  username: Joi.string().required(),
  password: Joi.string().required(),
});

export const UserLoginDto = Joi.object<UserCreate>({
  username: Joi.string().required(),
  password: Joi.string().required(),
});
