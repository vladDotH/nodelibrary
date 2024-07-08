import local from "passport-local";
import { usersService } from "@/services/users.service";
import { Forbidden } from "http-errors";
import { validate } from "@/util/validation";
import { UserLoginDto } from "@/dto/users";

export const LocalStrategy = new local.Strategy(async function verify(
  username,
  password,
  cb,
) {
  const loginData = validate(UserLoginDto, { username, password });
  const user = await usersService.loginUser(loginData);
  if (!user) cb(new Forbidden("incorrect user or email"));
  if (!user?.emailConfirmed) cb(new Forbidden("unconfirmed email"));
  else cb(null, user);
});
