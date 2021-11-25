import { Role } from './role.enum';

export interface UserInfo {
  publicKey: string;
  roles: Role[];
}
