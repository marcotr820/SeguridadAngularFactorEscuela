export class RestablecerPasswordDto {
    
    constructor(
        public email: string = '',
        public reset_token: string = '',
        public password: string = '',
        public confirmarPassword: string = ''
    ) { }
}