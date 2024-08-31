import { SetMetadata } from '@nestjs/common';
import { Role } from '../enums/Role.enum';

export const Roles = (...roles: Role[]) => SetMetadata('roles', roles);
