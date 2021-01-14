import { SetMetadata } from '@nestjs/common';
import { Roles } from '../roles.enum';

export const RolesAllowed = (...roles: Roles[]) => SetMetadata('roles', roles);