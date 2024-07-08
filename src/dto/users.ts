import Joi from "joi";
import { RoleChangeData, UserCreate } from "@/types/user";

export const UserCreateDto = Joi.object<UserCreate>({
  email: Joi.string().required(),
  username: Joi.string().required(),
  password: Joi.string().required(),
});

export const UserLoginDto = Joi.object<UserCreate>({
  username: Joi.string().required(),
  password: Joi.string().required(),
});

export const RoleChangeDto = Joi.object<RoleChangeData>({
  role: Joi.number().required(),
});
