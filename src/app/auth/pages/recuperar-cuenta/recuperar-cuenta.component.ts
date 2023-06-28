import { Component, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorService } from '../../../shared/validator/validator.service';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-recuperar-cuenta',
    templateUrl: './recuperar-cuenta.component.html',
    styleUrls: ['./recuperar-cuenta.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class RecuperarCuentaComponent {

    envioEmailCorrecto: boolean = false;

    form: FormGroup = this.fb.group({
        email: ['',
            [Validators.required, Validators.pattern(this.validatorService.emailPattern)]
        ]
    });
    constructor(private fb: FormBuilder, private validatorService: ValidatorService,
        private authService: AuthService) { }

    get emailMsjError(): string {
        const error = this.form.get('email')?.errors;
        if (error?.['required']) { return 'El email es obligatorio.' }
        if (error?.['pattern']) { return 'El email no tiene un formato correcto.' }
        return '';
    }

    enviarEmailRestablecerPassword() {
        if (!this.form.valid) {
            Object.keys(this.form.controls).forEach((key) => {
                this.form.get(key)?.markAsDirty();
            });
            return;
        }
        const email = this.form.value;
        this.envioEmailCorrecto = true;
        this.authService.enviarEmailRestablecerPassword(email).subscribe({
            next: (resp) => {
            },
            error: (err) => {
            }
        });
    }

    campoNoValido(campo: string) {
        if (this.form.get(campo)?.invalid && this.form.get(campo)?.dirty) {
            return true;
        }
        return false;
    }

}
