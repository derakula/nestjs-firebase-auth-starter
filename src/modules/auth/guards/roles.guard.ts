import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Roles } from '../roles.enum';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const methodRoles = this.reflector.get<Roles[]>('roles', context.getHandler()) || [];
        const classRoles = this.reflector.get<Roles[]>('roles', context.getClass()) || [];

        console.log('ROLES GUARD');

        if (!methodRoles && !classRoles) {
            return true;
        }

        const request = context.switchToHttp().getRequest();

        console.log(request);

        const allRoles = [...methodRoles, ...classRoles];

        return allRoles.includes(request.user.role);
    }
}