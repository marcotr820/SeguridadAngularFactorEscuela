import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { AsyncValidator, FormControl, ValidationErrors } from '@angular/forms';
import { Observable, map, of, switchMap, timer, tap } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
   providedIn: 'root'
})
export class EmailValidatorService implements AsyncValidator {
   private baseUrl = environment.baseUrl;

   constructor(private http: HttpClient) { }

   validarUserName = (http: HttpClient) => (control: FormControl): Observable<ValidationErrors | null> => {
      if (!!control.value) {
         const userName = control.value;
         const params = new HttpParams().set('userName', userName);
         return timer(900).pipe(
            tap(),
            switchMap(() => http.get(`${this.baseUrl}/cuentas/UserNameExiste`, { params })),
            map(resp => {
               return (!!resp) ? { userNameTomado: true } : null;
            })
         )
      }
      return of(null);
   }

   validate(control: FormControl): Observable<ValidationErrors | null> {
      if (!!control.value) {
         const email = control.value;
         const params = new HttpParams().set('email', email);
         return timer(900).pipe(
            tap(),
            switchMap(() => this.http.get(`${this.baseUrl}/cuentas/EmailExiste`, { params })),
            map(resp => {
               return (!!resp) ? { emailTomado: true } : null;
            })
         )
      }
      return of(null);
   }
}
