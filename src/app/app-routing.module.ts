import { NgModule } from '@angular/core';

import { RouterModule, Routes } from "@angular/router";
import { DashboardRoutingModule } from './dashboard/dashboard-routing.module';

import { AuthRoutingModule } from './auth/auth-routing.module';

const rutasPrincipales: Routes = [
    // path: '/dashboard' DashboardRoutingModule,
    // path: '/auth' AuthRoutingModule
    {
        path: '**',
        redirectTo: '', pathMatch: 'full'
    }
];

@NgModule({
    declarations: [],
    imports: [
        RouterModule.forRoot(rutasPrincipales),
        //al importar los routing modulo se reconocera automaticamente las rutas hijas creadas
        DashboardRoutingModule,
        AuthRoutingModule
    ],
    exports: [
        RouterModule
    ]
})

export class AppRoutingModule { }
