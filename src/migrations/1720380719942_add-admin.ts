import { ColumnDefinitions, MigrationBuilder } from "node-pg-migrate";
import { usersService } from "@/services/users.service";
import { role, RoleBits } from "@/auth/roles";

export const shorthands: ColumnDefinitions | undefined = undefined;

export async function up(pgm: MigrationBuilder): Promise<void> {
  const hash = await usersService.hashUserPassword("admin");
  await pgm.sql(
    `insert into "Users" (username, "passwordHash", "rolesMask", email, "emailConfirmed")
     values ('admin', '${hash}', ${role(RoleBits.admin)}, 'email', true)
     returning *`,
  );
}

export async function down(pgm: MigrationBuilder): Promise<void> {
  pgm.sql(`delete from "Users" where username = 'admin'`);
}
