export interface Env {
  HOST: string;
  PORT: number;
  PROTOCOL: string;
  APP_URL: string;
  APP_URL_FULL: string;

  DB_HOST: string;
  DB_PORT: number;
  DB_URI: string;
  DB_NAME: string;
  DB_USER: string;
  DB_PASSWORD: string;
  DATABASE_URL: string;
  DB_MAX_POOL: number;
  DB_IDLE_TIMEOUT: number;
  DB_CONN_TIMEOUT: number;

  SWAGGER_PREFIX: string;

  SESSION_SECRET: string;
  COOKIE_KEY: string;

  MAIL_CONFIRM_URL: string;
  MAILER_EMAIL: string;
  MAILER_TOKEN: string;

  SALT_ROUNDS: number;
}
