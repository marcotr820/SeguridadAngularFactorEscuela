
import { Injectable } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { UsuarioDto } from 'src/app/usuario/classes/usuarioDto';

@Injectable({providedIn: 'root'})
export class UserHasRole {

    private usuario: UsuarioDto = new UsuarioDto();

    constructor(private authService: AuthService) { }
    
    userHasRole(rolesPermitidos: string[]): boolean {
        this.usuario = this.authService.usuario;

        return rolesPermitidos.some(rol => this.usuario.roles.includes(rol));
    }
}