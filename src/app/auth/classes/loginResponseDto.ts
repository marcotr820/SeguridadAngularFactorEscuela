import { UsuarioDto } from '../../usuario/classes/usuarioDto';

export class LoginResponseDto {
    usuario = {} as UsuarioDto;
    isBlocked: boolean = false;
    token: string = '';
}