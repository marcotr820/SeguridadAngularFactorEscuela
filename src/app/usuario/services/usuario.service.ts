import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { UsuarioDto } from '../classes/usuarioDto';
import { environment } from '../../../environments/environment';
import { Observable, catchError, delay, throwError } from 'rxjs';
import { UsuarioCreacionDto } from '../classes/usuarioCreacionDto';
import { ResponseDto } from 'src/app/shared/classes/responseDto';
import { UsuarioByIdDto } from '../classes/usuarioByIdDto';
import { UsuarioActualizarDto } from '../classes/usuarioActualizarDto';

@Injectable({
    providedIn: 'root'
})
export class UsuarioService {

    private baseUrl: string = environment.baseUrl;
    public modalEditarUsuario$: EventEmitter<string> = new EventEmitter<string>();
    
    constructor(private http: HttpClient) { }

    get token() {
        return localStorage.getItem("token") || '';
    }

    get headers() {
        return {
            headers: { "Authorization": `Bearer ${this.token}` }
        }
    }

    getAllUsuarios(): Observable<ResponseDto<UsuarioDto[]>> {
        return this.http.get<ResponseDto<UsuarioDto[]>>(`${this.baseUrl}/usuarios/get-all`).pipe(delay(300));
    }

    getUsuarioById(id: string){
        const url = `${this.baseUrl}/usuarios/${id}`
        return this.http.get<ResponseDto<UsuarioByIdDto>>(url);
    }

    crearUsuario(usuario: UsuarioCreacionDto) {
        let body = usuario;
        return this.http.post<ResponseDto<UsuarioDto>>(`${this.baseUrl}/usuarios/crear-usuario`, body, this.headers)
            .pipe(
                catchError((error: HttpErrorResponse) => {
                    return throwError(() => error.error);
                })
            );
    }

    actualizarUsuario(usuario: UsuarioActualizarDto) {
        let body = usuario;
        return this.http.put(`${this.baseUrl}/usuarios/actualizar-usuario`, body);
    }

    eliminarUsuario(id: string) {
        const url = `${this.baseUrl}/usuarios`;
        const params = new HttpParams().set('id', id);
        return this.http.delete(url, { params });
    }
}
