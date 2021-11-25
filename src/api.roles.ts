import { RolesBuilder } from 'nest-access-control';
import { Role } from './auth/interfaces/role.enum';

export enum ApiResource {
  USER = 'USER',
  LEGACY = 'LEGACY',
}

export const roles: RolesBuilder = new RolesBuilder();

roles
  // USER ROLES
  .grant(Role.USER)
  .readOwn([ApiResource.USER])
  .updateOwn([ApiResource.USER])
  // ADMIN ROLES
  .grant(Role.ADMIN)
  .extend(Role.USER)
  .readAny([ApiResource.USER])
  .createAny([ApiResource.USER])
  .updateAny([ApiResource.USER])
  .deleteAny([ApiResource.USER])
  // Legacy API
  .readAny([ApiResource.LEGACY])
  .createAny([ApiResource.LEGACY])
  .updateAny([ApiResource.LEGACY])
  .deleteAny([ApiResource.LEGACY]);
