import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CookieService } from "ngx-cookie-service";
import { environment } from 'src/environments/environment';

@Injectable({
   providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

   constructor(private cookie: CookieService) { }

   intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<unknown>> {
      const token = this.cookie.get("token");
      
      if (!token || this.isThirdPartyRequest(req.url)) {
         return next.handle(req);
      }

      const requestWithHeader = req.clone({
         setHeaders: {
            Authorization: `Bearer ${token}`
         }
      });
      
      return next.handle(requestWithHeader);
   }

   private isThirdPartyRequest(url: string): boolean {
      return url.startsWith(environment.baseUrl) === false;
   }
}
