import { Role } from './role.enum';

export interface AccessTokenPayload {
  publicKey: string;
  signature: string;
  roles: Role[];
}
