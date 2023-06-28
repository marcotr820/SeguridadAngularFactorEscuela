import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { RolDto } from 'src/app/rol/classes/rolDto';
import { UsuarioService } from '../../services/usuario.service';
import { UsuarioCreacionDto } from '../../classes/usuarioCreacionDto';
import { EmailValidatorService } from '../../services/email-validator.service';
import { HttpErrorResponse, HttpClient } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { ValidatorService } from 'src/app/shared/validator/validator.service';
import { ResponseDto } from 'src/app/shared/classes/responseDto';

@Component({
    selector: 'app-crear-usuario',
    templateUrl: './crear-usuario.component.html',
    styleUrls: ['./crear-usuario.component.css'],
    providers: [MessageService],
    encapsulation: ViewEncapsulation.None
})
export class CrearUsuarioComponent implements OnInit {

    isLoading: boolean = false;
    modalVisible: boolean = false;
    rolesInvalid: boolean = false;
    erroresMsj: string[] = [];
    estados: any[] = [];

    @Input() set mostrarModalInput(mostrarModal: boolean) {
        if (mostrarModal) {
            this.modalVisible = mostrarModal;
            //this.rolesFormArray.clear(); //limpiamos el select-rol cada vez que se habra el modal para crear
        }
    }

    public crearUsuarioForm: FormGroup = this.fb.group({
        userName: ['', {
            validators: [Validators.required, Validators.minLength(5)],
            // asyncValidators: [this.emailValidator.validarUserName(this.http)]
        }],
        email: ['', {
            validators: [Validators.required, Validators.pattern(this.validatorS.emailPattern)],
            // asyncValidators: [this.emailValidator]
        }],
        roles: this.fb.array([], Validators.required),
        password: ['', [Validators.required, Validators.minLength(7)]],
        confirmarPassword: ['', [Validators.required]],
    }, {
        validators: [this.passwordsIguales()],
    });

    get rolesControl() {
        return this.crearUsuarioForm.get('roles') as FormArray;
    }

    constructor(
        private fb: FormBuilder,
        private usuarioService: UsuarioService,
        private emailValidator: EmailValidatorService,
        private messageService: MessageService,
        private validatorS: ValidatorService,
        private http: HttpClient) { }

    ngOnInit(): void {
        
    }

    @Output() ocultarModalCreadoOkOutput: EventEmitter<boolean> = new EventEmitter<boolean>();
    @Output() ocultarModalCanceladoOutput: EventEmitter<boolean> = new EventEmitter<boolean>();

    get rolesFormArray() {
        return this.crearUsuarioForm.get('roles') as FormArray;
    }

    get userNameMsjError(): string {
        const error = this.crearUsuarioForm.get('userName')?.errors;
        if (error?.['required']) { return 'El usuario es obligatorio.' }
        if (error?.['minlength']) { return 'El usuario debe tener mas de 5 caracteres.' }
        if (error?.['userNameTomado']) { return 'El nombre de usuario no esta disponible.' }
        return '';
    }

    get emailErrorMsj(): string {
        const error = this.crearUsuarioForm.get('email')?.errors;
        if (error?.['required']) { return 'El email es obligatorio' }
        if (error?.['pattern']) { return 'El email no tiene un formato correcto.' }
        if (error?.['emailTomado']) { return 'El email ya está en uso.' }
        return '';
    }

    crearUsuario(event: Event) {
        event.preventDefault();

        if (this.isLoading) {
            return;
        }

        if (this.rolesFormArray.invalid) {
            //validacion formArray roles envio al componente select-rol
            this.rolesInvalid = true;
        }

        if (!this.crearUsuarioForm.valid) {
            Object.keys(this.crearUsuarioForm.controls).forEach((key) => {
                this.crearUsuarioForm.get(key)?.markAsDirty();
            });
            return;
        }
        this.isLoading = true;
        this.erroresMsj = [];
        let usuario: UsuarioCreacionDto = this.crearUsuarioForm.value;
        
        this.usuarioService.crearUsuario(usuario).subscribe({
            next: (resp) => {
                this.ocultarModal();
                this.messageService.add({ severity: 'success', summary: 'Confirmed', detail: 'Acción realizada con exito.' });
            },
            error: (err: ResponseDto<null>) => {
                this.isLoading = false;
                this.erroresMsj = err.errorMessages;
            }
        });
    }

    ocultarModal(event?: Event) {
        event?.preventDefault();
        this.modalVisible = false;
        if (!this.modalVisible) {
            this.ocultarModalCreadoOkOutput.emit(this.modalVisible);
            this.crearUsuarioForm.patchValue({
                userName: null,
                email: null,
                password: null,
                confirmarPassword: null
            });
            this.crearUsuarioForm.markAsPristine();
        }
    }

    ocultarModalCancelado() {
        this.modalVisible = false;
        this.rolesInvalid = false;  //al cerrar el modal borramos la advertencia del select-rol
        this.ocultarModalCanceladoOutput.emit(this.modalVisible);
        //al momento de cancelar el modal limpiamos los campos menos el de roles para no tener que informar al componente select-rol
        //que se establesca en null y se quede con el valor que se ah seleccionado anteriormente al abrir nuevamente el modal
        this.crearUsuarioForm.patchValue({
            userName: null,
            email: null,
            password: null,
            confirmarPassword: null
        });
        this.crearUsuarioForm.markAsPristine();
    }

    recibirRol(rol: RolDto) {
        if (rol) {
            this.rolesFormArray.clear();
            this.rolesFormArray.push(this.fb.control(rol.id));
        }
    }

    campoEsValido(campo: string): boolean {
        if (this.crearUsuarioForm.get(campo)?.invalid
            && this.crearUsuarioForm.controls[campo].dirty) {
            return true;
        }
        return false;
    }

    passwordsIguales() {
        return (formGroup: AbstractControl): ValidationErrors | null => {
            const pass1 = formGroup.get("password")?.value;
            const pass2 = formGroup.get("confirmarPassword")?.value;
            if (pass1 !== pass2) {
                formGroup.get("confirmarPassword")?.setErrors({ noIguales: true });
                return { noIguales: true }
            }
            formGroup.get("confirmarPassword")?.setErrors(null);
            return null;
        }
    }
}
