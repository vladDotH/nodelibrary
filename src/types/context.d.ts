import { User } from "@/types/user";

interface CtxAugmentation {
  user?: User;
}

declare module "koa" {
  export interface Context extends CtxAugmentation {}
}
