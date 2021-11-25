import { Role } from './role.enum';

export interface JwtAccessToken {
  sub: string; // public key
  signature: string;
  roles: Role[];
}
