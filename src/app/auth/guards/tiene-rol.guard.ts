
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

export function hasRole(rolesPermitidos: string[]) {

    return () => {
        const usuario = inject(AuthService).usuario;
        const router = inject(Router);
        //solo se evalua el primer rol si el usuario tiene mas roles no se contemplaran
        const tieneAcceso: Boolean =  Boolean(usuario && rolesPermitidos.includes(usuario.roles[0]));
        if (tieneAcceso) {
            return true;
        }

        router.navigateByUrl("/cuentas");
        return false
    }
}
