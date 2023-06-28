import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { LoginDto } from '../../classes/loginDto';
import { MessageService } from 'primeng/api';
import { ResponseDto } from 'src/app/shared/classes/responseDto';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
    providers: [MessageService],
    encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {

    public isLoading: boolean = false;
    public modalBloqueoVisible: boolean = false;
    public erroresMsj: string[] = [];

    loginForm: FormGroup = this.fb.group({
        userName: ['', [Validators.required, Validators.minLength(5)]],
        password: ['', [Validators.required, Validators.minLength(7)]]
    });

    constructor(
        private fb: FormBuilder,
        private router: Router,
        private _authService: AuthService
    ) {}

    ngOnInit(): void {
        this.ocultarErroresMsj();
    }

    ocultarErroresMsj(): void {
        this.loginForm.valueChanges.subscribe((val) => {
            if (this.erroresMsj.length != 0) {
                this.erroresMsj = [];
            }
        });
    }

    ocultarModalBloqueo(valor: boolean) {
        if (!valor) { this.modalBloqueoVisible = valor; }
    }

    login() {
        if (this.isLoading) {
            return;
        }
        if (!this.loginForm.valid) {
            let formKeys = this.loginForm.controls;
            Object.keys(formKeys).forEach((campo) => {
                this.loginForm.get(campo)?.markAsDirty();
            });
            return;
        }
        const login: LoginDto = this.loginForm.value;
        this.erroresMsj = [];
        this.isLoading = true;
        this._authService.loginService(login).subscribe({
            next: (resp) => {
                if (resp.result.isBlocked) {
                    this.modalBloqueoVisible = true;  //mostrarModal bloqueo
                    this.isLoading = false;
                    return;
                }
                this.router.navigateByUrl('/');
            },
            error: (error: ResponseDto<null>) => {
                this.isLoading = false;
                this.erroresMsj = error.errorMessages;
            }
        });
    }

    campoNoValido(campo: string) {
        if (this.loginForm.get(campo)?.invalid && this.loginForm.get(campo)?.dirty) {
            return true;
        }
        return false;
    }

}
