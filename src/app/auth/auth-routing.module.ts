import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { RecuperarCuentaComponent } from './pages/recuperar-cuenta/recuperar-cuenta.component';
import { RestablecerPasswordComponent } from './pages/restablecer-password/restablecer-password.component';
import { isNotAuthenticatedGuard } from './guards/is-not-authenticated.guard';

const routes: Routes = [
    {
        path: 'auth',
        canActivate: [ isNotAuthenticatedGuard ],
        children: [
            { path: 'login', component: LoginComponent },
            { path: 'registro', component: RegistroComponent },
            { path: 'recuperar-cuenta', component: RecuperarCuentaComponent },
            { path: 'restablecer-password', component: RestablecerPasswordComponent },
        ]
    }
]

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
})
export class AuthRoutingModule { }
