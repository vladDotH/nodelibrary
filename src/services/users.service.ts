import { User, UserCreate, UserIdentifiers, UserLogin } from "@/types/user";
import { db } from "@/util/db";
import bcrypt from "bcrypt";
import { configService } from "@/services/config.service";
import { role, RoleBits } from "@/auth/roles";
import { mailerService } from "@/services/mailer.service";
import uuid from "uuid";

function hashUserPassword(pwd: string) {
  return bcrypt.hash(pwd, +configService.SALT_ROUNDS);
}

function compareUserPassword(hash: string, pwd: string) {
  return bcrypt.compare(pwd, hash);
}

async function createUser(user: UserCreate) {
  if (await getUser(user)) return null;

  const hash = await hashUserPassword(user.password);
  const res = await db.query(
    `insert into "Users" (username, "passwordHash", "rolesMask", email)
     values ($1, $2, $3, $4)
     returning *`,
    [user.username, hash, role(RoleBits.admin), user.email],
  );

  return res.rows[0] as User;
}

async function sendConfirmationEmail(user: User) {
  if (user.emailConfirmed) return false;
  const token = uuid.v4();
  await db.query(
    `update "Users"
     set "emailToken"= $1
     where id = $2`,
    [token, user.id],
  );
  await mailerService.send({
    to: user.email,
    subject: "Подтверждение почтового адреса",
    html: `
      <header>
        Здравствуйте, ${user.username}!
      </header>
      <p>
        Для подтверждения почты перейдите по адресу
        <a>
          ${configService.APP_URL_FULL}/${configService.MAIL_CONFIRM_URL}/${token}
        </a>
      </p>
      <footer>
        --
        Сообщение отправлено автоматически.
      </footer>
    `,
  });
  return true;
}

async function confirmEmail(token: string) {
  const conn = await db.connect();
  await conn.query("begin");
  const res = await conn.query(
    `select * from "Users" where "emailToken" = $1`,
    [token],
  );
  const user = res.rows[0] as User | undefined;
  if (user) {
    await db.query(`update "Users" set "emailConfirmed" = true where id=$1`, [
      user.id,
    ]);
  }
  await conn.query("commit");

  return user ?? null;
}

async function loginUser(user: UserLogin) {
  const res = await getUser({ username: user.username });
  if (!res) {
    return null;
  }
  const correctPwd = await compareUserPassword(res.passwordHash, user.password);
  if (!correctPwd) {
    return null;
  }
  return res;
}

async function getUser(id: UserIdentifiers) {
  const res = await db.query(
    `select *
     from "Users"
     where id = $1 or username = $2 or email = $3`,
    [id.id, id.username, id.email],
  );

  return (res.rows[0] ?? null) as User | null;
}

async function changeRoles(id: number, roles: number) {
  const user = await getUser({ id });
  if (!user) return null;
  const res = await db.query(
    `update "Users"
     set "rolesMask" = $1
     where id = $2
     returning *`,
    [id, roles],
  );
  return (res.rows[0] ?? null) as User | null;
}

export const usersService = {
  hashUserPassword,
  compareUserPassword,
  loginUser,
  createUser,
  getUser,
  changeRoles,
  sendConfirmationEmail,
  confirmEmail,
};
