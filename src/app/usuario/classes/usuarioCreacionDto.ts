export class UsuarioCreacionDto {
    userName: string = '';
    email: string = '';
    password: string = '';
    confirmarPassword: string = '';
    roles: string[] = [];   //id de los roles en array
}
