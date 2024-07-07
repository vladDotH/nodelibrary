import { Env } from "@/types/Env";

export const configService = new Proxy(process.env, {
  get(target: any, p: string | symbol): any {
    if (!(p in target)) throw TypeError(`Invalid env variable ${String(p)}`);
    return target[p];
  },
}) as any as Env;
