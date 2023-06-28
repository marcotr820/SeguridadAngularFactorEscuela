import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { AuthService } from "../services/auth.service";
import { map } from "rxjs";

export const AuthGuard: CanActivateFn = (route, state) => {
    
    const authService = inject(AuthService);
    const router = inject(Router);

    // return authService.isLoggedIn$.pipe(
    //     map((isLoggedIn) => {
    //         console.log("islogged", isLoggedIn);
            
    //         if (isLoggedIn) {
    //             return true;
    //         }

    //         router.navigateByUrl('/auth/login');
    //         return false;
    //     })  
    // );
    
    return authService.checkToken().pipe(
        map((isAuthenticate) => {
            if (isAuthenticate) {
                return true;
            }
            router.navigateByUrl('/auth/login');
            return false;
        })
    )
}