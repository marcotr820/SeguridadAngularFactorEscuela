import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, catchError, delay, map, Observable, of, tap, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ResponseDto } from '../../shared/classes/responseDto';
import { LoginResponseDto } from '../classes/loginResponseDto';
import { LoginDto } from '../classes/loginDto';
import { RegistroDto } from '../classes/registroDto';
import { UsuarioDto } from 'src/app/usuario/classes/usuarioDto';
import { CookieService } from "ngx-cookie-service";
import { Router } from '@angular/router';
import { RestablecerPasswordDto } from '../classes/RestablecerPassword';

@Injectable({
    providedIn: 'root'
})
export class AuthService implements OnInit {

    // public _tokenDatos!: TokenModelo;
    private _usuario = new UsuarioDto();
    private readonly _baseUrl: string = environment.baseUrl;

    private isLoggedIn = new BehaviorSubject<boolean>(false);
    public get isLoggedIn$(): Observable<boolean> {
        return this.isLoggedIn.asObservable();
    }

    constructor(
        private http: HttpClient,
        private cookies: CookieService,
        private router: Router
    ) {}

    ngOnInit(): void {
    }

    get usuario(): UsuarioDto {
        return { ...this._usuario };
    }

    // private getTokenDatos(tokenRecibido: string) {
    //     if (!!tokenRecibido) {
    //         // return JSON.parse(window.atob(tokenRecibido.split('.')[1]));
    //     }
    //     return new TokenModelo();
    // }

    private setAuthentication(usuario: UsuarioDto, token: string): void {
        const expiracion = undefined;
        const path = "/";
        this.cookies.set("token", token, expiracion, path);
        this.isLoggedIn.next(true);
        this._usuario = usuario;
    }

    loginService(loginDto: LoginDto) {
        const url = `${this._baseUrl}/auth/login`;
        const body = loginDto;
        return this.http.post<ResponseDto<LoginResponseDto>>(url, body)
            .pipe(
                tap((resp) => {
                    if (!resp.result.isBlocked) {
                        this.setAuthentication(resp.result.usuario, resp.result.token)
                    }
                }),
                catchError((error: HttpErrorResponse) => {
                    return throwError(() => error.error);
                })
            );
    }

    registro(registroForm: RegistroDto) {
        return this.http.post<ResponseDto<LoginResponseDto>>(`${this._baseUrl}/auth/registro`, registroForm)
            .pipe(
                tap((resp) => {
                    this.setAuthentication(resp.result.usuario, resp.result.token);
                }),
                catchError((error: HttpErrorResponse) => {
                    return throwError(() => error.error);
                })
            );
    }

    checkToken() {
        const tokenExiste = this.cookies.check("token");
        if (!tokenExiste) {
            this.isLoggedIn.next(false);
            return of(false)
        };
        
        const url = `${this._baseUrl}/auth/check-token`;

        return this.http.get<ResponseDto<LoginResponseDto>>(url)
            .pipe(
            map((resp) => {
                this.setAuthentication(resp.result.usuario, resp.result.token);
                return true;
            }),
            catchError((error) => {
                this.isLoggedIn.next(false);
                this.cookies.delete("token");
                return of(false);
            })
            );
    }

    logOut(){
        const path = "/";
        this.cookies.delete("token", path);
        this.router.navigateByUrl("/auth/login");
    }

    enviarEmailRestablecerPassword(model: string) {
        const body = model;
        // const params = new HttpParams().set('email', email);
        return this.http.post(`${this._baseUrl}/usuarios/enviar-email-restablecer-password`, body);
    }

    restablecerPassword(model: RestablecerPasswordDto) {
        const body = model;
        return this.http.post<ResponseDto<null>>(`${this._baseUrl}/usuarios/restablecer-password`, body)
            .pipe(
                catchError((error: HttpErrorResponse) => {
                    return throwError(() => error.error);
                })
            );
    }

    actualizarUserName(usuario: any) {
        const body = usuario;
        return this.http.put<ResponseDto<null>>(`${this._baseUrl}/usuarios/actualizar-username`, body)
            .pipe(
                catchError((error: HttpErrorResponse) => {
                    return throwError(() => error.error);
                })
            );
    }

    actualizarPassword(passwords: any) {
        const body = passwords;
        return this.http.put(`${this._baseUrl}/usuarios/actualizar-password`, body)
            .pipe(
                catchError((error: HttpErrorResponse) => {
                    return throwError(() => error.error);
                })
            );
    }

}
