import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { LoginComponent } from './pages/login/login.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { PrimeNgModule } from '../prime-ng/prime-ng.module';
import { TokenInterceptorService } from './interceptores/token-interceptor.service';
import { UsuarioBloqueadoComponent } from './components/usuario-bloqueado/usuario-bloqueado.component';
import { RecuperarCuentaComponent } from './pages/recuperar-cuenta/recuperar-cuenta.component';
import { RestablecerPasswordComponent } from './pages/restablecer-password/restablecer-password.component';

@NgModule({
   declarations: [
      LoginComponent,
      RegistroComponent,
      UsuarioBloqueadoComponent,
      RecuperarCuentaComponent,
      RestablecerPasswordComponent
   ],
   imports: [
      CommonModule,
      ReactiveFormsModule,
      RouterModule,
      HttpClientModule,
      PrimeNgModule
   ],
   exports: [
      LoginComponent,
      RegistroComponent
   ],
   providers: [
      { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptorService, multi: true }
   ]
})
export class AuthModule { }
