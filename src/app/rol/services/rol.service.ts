import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { RolDto } from '../classes/rolDto';
import { Observable, shareReplay, map, delay, share, catchError, throwError } from 'rxjs';
import { ResponseDto } from 'src/app/shared/classes/responseDto';

@Injectable({
    providedIn: 'root'
})
export class RolService {

    private baseUrl = environment.baseUrl;

    constructor(private http: HttpClient) { }

    readonly getAllRolesSelectCache$ = this.http.get<ResponseDto<RolDto[]>>(`${this.baseUrl}/roles/get-all`).pipe(
        map((resp) => resp.result),
        share()
    )

    createUpdateRol(rol: RolDto) {
        const body = rol;
        return this.http.post<ResponseDto<RolDto>>(`${this.baseUrl}/roles/create-update`, body)
            .pipe(
                catchError((error: HttpErrorResponse) => {
                    return throwError(() => error.error);
                })
            );
    }

    getAllForIndex(): Observable<ResponseDto<RolDto[]>> {
        return this.http.get<ResponseDto<RolDto[]>>(`${this.baseUrl}/roles/get-all`).pipe(delay(200));
    }

    eliminarRol(id: string) {
        return this.http.delete(`${this.baseUrl}/roles/${id}`);
    }
}
