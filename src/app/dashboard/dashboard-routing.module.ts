import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../auth/guards/auth.guard';
import { CuentaComponent } from '../usuario/pages/cuenta/cuenta.component';
import { CS } from '../shared/classes/CS';
import { DashboardComponent } from './dashboard.component';
import { UsuarioIndexComponent } from '../usuario/pages/usuario-index/usuario-index.component';
import { RolIndexComponent } from '../rol/pages/rol-index/rol-index.component';
import { hasRole } from '../auth/guards/tiene-rol.guard';

const rutasHijas: Routes = [
    {
        path: '',
        component: DashboardComponent,
        canActivate: [AuthGuard],
        children: [
            { 
                path: 'usuarios',
                //enviamos los roles permitidos
                canActivate: [ hasRole(["ADMIN"]) ],
                component: UsuarioIndexComponent
            },
            {
                path: 'roles',
                canActivate: [ hasRole(["ADMIN"]) ],
                component: RolIndexComponent
            },
            { path: 'cuenta', component: CuentaComponent },
            { path: '', redirectTo: '/cuenta', pathMatch: 'full' }
        ]
    }
    // {
    //     path: '',
    //     component: PagesComponent,
    //     canActivate: [AuthGuard],
    //     children: [
    //         { path: '', component: IndexComponent },
    //         { path: 'cuenta', component: CuentaComponent },
    //         // {
    //         //    path: 'usuarios', component: UsuarioComponent, canActivate: [TieneRolGuard],
    //         //    data: {
    //         //       rolesPermitidos: [CS.SUPERADMIN, CS.ADMIN],
    //         //    }
    //         // },
    //         {
    //             path: 'roles', component: RolComponent, canActivate: [TieneRolGuard],
    //             data: {
    //                 rolesPermitidos: [CS.SUPERADMIN],
    //             }
    //         },
    //     ]
    // },
];

@NgModule({
    declarations: [],
    imports: [
        RouterModule.forChild(rutasHijas),
    ],
    exports: [RouterModule]
})

export class DashboardRoutingModule { }
