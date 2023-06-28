import { Component, EventEmitter, Input, Output, ViewEncapsulation, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { AuthService } from '../../../auth/services/auth.service';
import { ResponseDto } from 'src/app/shared/classes/responseDto';

@Component({
    selector: 'app-editar-password',
    templateUrl: './editar-password.component.html',
    styleUrls: ['./editar-password.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class EditarPasswordComponent implements OnInit {

    modalVisible: boolean = false;
    isLoading: boolean = false;
    errorMsjs: string[] = [];
    actualizarIsSuccess: boolean = false;
    formEditarPassword: FormGroup = this.fb.group({
        idUsuario: [this._authService.usuario.id],
        actualPassword: ["", [Validators.required, Validators.minLength(7)]],
        nuevoPassword: ["", [Validators.required, Validators.minLength(7)]],
        confirmarPassword: ["", [Validators.required]]
    }, {
        validators: [this.passwordsIguales("nuevoPassword", "confirmarPassword")],
    });

    @Input() set mostrarModalInput(valor: boolean) {
        if (valor) {
            this.formEditarPassword.reset({
                idUsuario: this._authService.usuario.id
            });
            this.modalVisible = valor;
        }
    }
    constructor(private fb: FormBuilder, private _authService: AuthService) { }

    ngOnInit(): void {
        this.ocultarMensajeError();
    }

    @Output() ocultarModalCanceladoOutput: EventEmitter<boolean> = new EventEmitter<boolean>();

    ocultarMensajeError(): void {
        this.formEditarPassword.valueChanges.subscribe((val) => {
            if (this.errorMsjs.length != 0) {
                this.errorMsjs = [];
            }
        })
    }

    actualizarPassword(event: Event) {
        event.preventDefault();
        if (this.isLoading) {
            return;
        }
        if (!this.formEditarPassword.valid) {
            Object.keys(this.formEditarPassword.controls).forEach((key) => {
                this.formEditarPassword.get(key)?.markAsDirty();
            });
            return;
        }
        let passwords = this.formEditarPassword.value;
        this.isLoading = true;
        this.errorMsjs = [];
        this._authService.actualizarPassword(passwords).subscribe({
            next: ((resp) => {
                this.actualizarIsSuccess = true;
                setTimeout(() => {
                    this._authService.logOut();
                }, 2500);
            }),
            error: ((err: ResponseDto<null>) => {
                this.isLoading = false;
                this.errorMsjs = err.errorMessages;
            })
        });
    }

    campoEsValido(campo: string) {
        if (this.formEditarPassword.get(campo)?.invalid && this.formEditarPassword.get(campo)?.dirty) {
            return true;
        }
        return false;
    }

    cancelarModal() {
        this.modalVisible = false;
        this.ocultarModalCanceladoOutput.emit(this.modalVisible);
        this.formEditarPassword.reset();
    }

    passwordsIguales(nuevoPassword: string, confirmarPassword: string) {
        return (formGroup: AbstractControl): ValidationErrors | null => {
            const pass1 = formGroup.get(nuevoPassword)?.value;
            const pass2 = formGroup.get(confirmarPassword)?.value;
            if (pass1 !== pass2) {
                formGroup.get(confirmarPassword)?.setErrors({ noIguales: true });
                return { noIguales: true }
            }
            formGroup.get(confirmarPassword)?.setErrors(null);
            return null;
        }
    }
}
