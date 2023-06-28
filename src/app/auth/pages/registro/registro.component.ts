import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { RegistroDto } from '../../classes/registroDto';
import { ValidatorService } from '../../../shared/validator/validator.service';
import { EmailValidatorService } from '../../../usuario/services/email-validator.service';
import { HttpClient } from '@angular/common/http';
import { ResponseDto } from 'src/app/shared/classes/responseDto';
import { LoginResponseDto } from '../../classes/loginResponseDto';

@Component({
    selector: 'app-registro',
    templateUrl: './registro.component.html',
    styleUrls: ['./registro.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class RegistroComponent implements OnInit {

    public isLoading: boolean = false;
    public erroresMsj: string[] = [];

    registroForm: FormGroup = this.fb.group({
        userName: ['marco12',
            [Validators.required, Validators.minLength(5)],
            // [this.emailValidator.validarUserName(this.http)]
        ],
        email: ['marco12@gmail.com', {
            validators: [Validators.required, Validators.pattern(this.validatorS.emailPattern)],
            // asyncValidators: [this.emailValidator]
        }],
        password: ['Admin123*', [Validators.required, Validators.minLength(7)]],
        confirmarPassword: ['Admin123*', [Validators.required]],
    }, {
        validators: [this.passwordsIguales()]
    });

    constructor(
        private fb: FormBuilder,
        private router: Router,
        private authService: AuthService,
        private validatorS: ValidatorService,
        private emailValidator: EmailValidatorService,
        private http: HttpClient
    ) { }

    ngOnInit(): void { }

    get userNameMsjError(): string {
        const error = this.registroForm.get('userName')?.errors;
        if (error?.['required']) { return 'El usuario es obligatorio.' }
        if (error?.['minlength']) { return 'El usuario debe tener mas de 5 caracteres.' }
        if (error?.['userNameTomado']) { return 'El nombre de usuario no esta disponible.' }
        return '';
    }

    get emailMsjError(): string {
        const error = this.registroForm.get('email')?.errors;
        if (error?.['required']) { return 'El email es obligatorio.' }
        if (error?.['pattern']) { return 'El email no tiene un formato correcto.' }
        if (error?.['emailTomado']) { return 'El email no esta disponible.' }
        return '';
    }

    registro() {
        if (this.isLoading) {
            return;
        }
        if (!this.registroForm.valid) {
            Object.keys(this.registroForm.controls).forEach((key) => {
                this.registroForm.get(key)?.markAsDirty();
            });
            return;
        }
        this.isLoading = true;
        this.erroresMsj = [];
        const registroDto: RegistroDto = this.registroForm.value;
        this.authService.registro(registroDto).subscribe({
            next: (resp) => {
                this.router.navigate(["/"]);
            },
            error: (error: ResponseDto<LoginResponseDto>) => {
                this.isLoading = false;
                this.erroresMsj = error.errorMessages;
            }
        });
    }

    campoNoValido(campo: string): boolean {
        if (!this.registroForm.get(campo)?.valid && this.registroForm.get(campo)?.dirty) {
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
