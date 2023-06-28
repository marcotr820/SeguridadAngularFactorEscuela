import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { AuthService } from "../services/auth.service";
import { tap, map, take } from 'rxjs';
import { CookieService } from "ngx-cookie-service";

export const isNotAuthenticatedGuard: CanActivateFn = (route, state) => {

    const authService = inject(AuthService);
    const router = inject(Router);

    return authService.checkToken().pipe(
        map((tokenValido: boolean) => {
            if (tokenValido) {
                router.navigateByUrl("/");
                return false;
            }
            return true;
        })
    )

}