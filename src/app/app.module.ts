import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AuthModule } from './auth/auth.module';

import { AppComponent } from './app.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { UsuarioModule } from './usuario/usuario.module';

//paquete ngx-cookie-service
import { CookieService } from "ngx-cookie-service";
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptorService } from './auth/interceptores/token-interceptor.service';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        DashboardModule,
        UsuarioModule,
        AuthModule,
    ],
    providers: [
        //proveedor ngx-cookie-service
        CookieService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: TokenInterceptorService,
            multi: true
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
