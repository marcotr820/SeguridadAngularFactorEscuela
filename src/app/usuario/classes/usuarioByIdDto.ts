import { RolDto } from "src/app/rol/classes/rolDto";

export class UsuarioByIdDto {
    id: string = "";
    userName: string = "";
    email: string = "";
    roles: RolDto[] = [];
    isBlocked: boolean = false;
}
