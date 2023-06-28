import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';
import { UsuarioDto } from '../../classes/usuarioDto';
import { FormGroup, FormBuilder, Validators, AsyncValidator } from '@angular/forms';
import { EmailValidatorService } from '../../services/email-validator.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ResponseDto } from 'src/app/shared/classes/responseDto';

@Component({
    selector: 'app-editar-username',
    templateUrl: './editar-username.component.html',
    styleUrls: ['./editar-username.component.css']
})
export class EditarUsernameComponent implements OnInit {

    private _usuario = {} as UsuarioDto;
    public errorMsjs: string[] = [];
    public exitoMsj: boolean = false;
    public modalVisible: boolean = false;
    public isLoading: boolean = false;

    formEditarUserName: FormGroup = this.fb.group({
        idUsuario: '',
        nuevoUserName: ['', {
            validators: [Validators.required, Validators.minLength(5)],
            // asyncValidators: [this.emailValidator.validarUserName(this.http)]
        }]
    });

    constructor(
        private fb: FormBuilder,
        private authService: AuthService,
    ) { }

    ngOnInit(): void {
        this._usuario = this.authService.usuario;
        this.ocultarMensajeError();
    }

    @Input() set mostrarModalInput(mostrarModal: boolean) {
        if (mostrarModal) {
            this.formEditarUserName.get('idUsuario')?.reset(this.usuario.id);
            this.modalVisible = mostrarModal;
        }
    }
    @Output() ocultarModalOutput: EventEmitter<boolean> = new EventEmitter<boolean>();
    @Output() ocultarModalCanceladoOutput: EventEmitter<boolean> = new EventEmitter<boolean>();

    get usuario() {
        return { ...this._usuario };
    }

    get userNameMsjError(): string {
        const error = this.formEditarUserName.get('nuevoUserName')?.errors;
        if (error?.['required']) { return 'El usuario es obligatorio.'; }
        if (error?.['minlength']) { return 'El usuario debe tener mas de 5 caracteres.'; }
        if (error?.['userNameTomado']) { return 'El nombre de usuario no esta disponible.'; }
        return '';
    }

    ocultarMensajeError(): void {
        this.formEditarUserName.valueChanges.subscribe((val) => {
            if (this.errorMsjs.length != 0) {
                this.errorMsjs = [];
            }
        });
    }

    actualizarUserName(e: Event) {
        e.preventDefault();

        if (this.isLoading) {
            return;
        }
        if (!this.formEditarUserName.valid) {
            Object.keys(this.formEditarUserName.controls).forEach((key) => {
                this.formEditarUserName.get(key)?.markAsDirty();
            });
            return;
        }
        let usuario = this.formEditarUserName.value;
        this.errorMsjs = [];
        this.isLoading = true;
        this.authService.actualizarUserName(usuario).subscribe({
            next: ((resp) => {
                this.exitoMsj = true;
                setTimeout(() => {
                    this.authService.logOut();
                }, 2500);
            }),
            error: ((err: ResponseDto<null>) => {
                this.isLoading = false;
                this.errorMsjs = err.errorMessages;
            })
        });
    }
    ocultarModal(event?: Event) {
        this.modalVisible = false;
        this.ocultarModalOutput.emit(this.modalVisible);
    }
    cancelarModal() {
        this.modalVisible = false;
        this.ocultarModalCanceladoOutput.emit(this.modalVisible);
        this.formEditarUserName.reset();
    }

    campoEsValido(campo: string) {
        if (this.formEditarUserName.get(campo)?.invalid && this.formEditarUserName.get(campo)?.dirty) {
            return true;
        }
        return false;
    }

}
