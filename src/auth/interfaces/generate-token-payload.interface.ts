import { Role } from '../interfaces';

export interface GenerateTokenPayload {
  publicKey: string;
  signature: string;
  roles: Role[];
}
