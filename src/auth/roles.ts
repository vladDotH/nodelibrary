export enum RoleBits {
  user = 0,
  admin = 1,
}

export function role(bit: RoleBits) {
  return 1 << bit;
}
