
export class UsuarioDto {
   constructor(
      public id: string = '',
      public userName: string = '',
      public email: string = '',
      public roles: string[] = []
   ) { }
}