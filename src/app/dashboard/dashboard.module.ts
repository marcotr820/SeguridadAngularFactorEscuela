import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { PrimeNgModule } from '../prime-ng/prime-ng.module';
//animaciones tabla
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptorService } from '../auth/interceptores/token-interceptor.service';

@NgModule({
    declarations: [
        DashboardComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
        SharedModule,
        PrimeNgModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule
    ],
    providers: [
        // {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptorService, multi: true}
    ]
})
export class DashboardModule { }
