import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ResponseDto } from 'src/app/shared/classes/responseDto';

@Component({
    selector: 'app-restablecer-password',
    templateUrl: './restablecer-password.component.html',
    styleUrls: ['./restablecer-password.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class RestablecerPasswordComponent implements OnInit {

    private reset_token: string = '';
    private email: string = '';
    resetPasswordIsSuccess: boolean = false;
    resetPasswordHasError: boolean = false;
    isLoading: boolean = false;

    form: FormGroup = this.fb.group({
        email: ['', []],
        resetToken: ['', []],
        password: ['', [Validators.required, Validators.minLength(7)]],
        confirmarPassword: ['', [Validators.required]]
    }, {
        validators: [this.passwordsIguales('password', 'confirmarPassword')],
    });

    constructor(
        private routeActive: ActivatedRoute,
        private fb: FormBuilder,
        private authService: AuthService,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.routeActive.queryParamMap.subscribe((param: ParamMap) => {
            this.reset_token = param.get('reset_token') || '';
            this.email = param.get('email') || '';
        });

        if (!this.reset_token || !this.email) {
            this.router.navigateByUrl("/auth/login");
        }
    }

    restablecerPassword() {
        if (this.isLoading) {
            return;
        }
        if (!this.form.valid) {
            Object.keys(this.form.controls).forEach((key) => {
                this.form.get(key)?.markAsDirty();
            });
            return;
        }
        this.form.patchValue({
            email: this.email,
            resetToken: this.reset_token
        });
        this.resetPasswordHasError = false;
        this.isLoading = true;
        this.authService.restablecerPassword(this.form.value).subscribe({
            next: (resp) => {
                this.resetPasswordIsSuccess = true;
            },
            error: (err: ResponseDto<null>) => {
                this.isLoading = false;
                this.resetPasswordHasError = true;
            }
        })
    }

    campoNoValido(campo: string): boolean {
        if (!this.form.get(campo)?.valid && this.form.get(campo)?.dirty) {
            return true;
        }
        return false;
    }

    passwordsIguales(campo1: string, campo2: string) {
        return (formGroup: AbstractControl): ValidationErrors | null => {
            const pass1 = formGroup.get(campo1)?.value;
            const pass2 = formGroup.get(campo2)?.value;
            if (pass1 !== pass2) {
                formGroup.get(campo2)?.setErrors({ noIguales: true });
                return { noIguales: true }
            }
            formGroup.get(campo2)?.setErrors(null);
            return null;
        }
    }

}
