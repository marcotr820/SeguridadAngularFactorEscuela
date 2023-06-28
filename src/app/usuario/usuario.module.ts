import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuarioIndexComponent } from "./pages/usuario-index/usuario-index.component";
import { CuentaComponent } from './pages/cuenta/cuenta.component';
import { CrearUsuarioComponent } from './components/crear-usuario/crear-usuario.component';
import { EditarPasswordComponent } from './components/editar-password/editar-password.component';
import { EditarUsernameComponent } from './components/editar-username/editar-username.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RolModule } from '../rol/rol.module';
import { PrimeNgModule } from '../prime-ng/prime-ng.module';
import { EditarUsuarioComponent } from './components/editar-usuario/editar-usuario.component';


@NgModule({
    declarations: [
        UsuarioIndexComponent,
        CuentaComponent,
        CrearUsuarioComponent,
        EditarPasswordComponent,
        EditarUsernameComponent,
        EditarUsuarioComponent
    ],
    imports: [
        CommonModule,
        RolModule,
        RouterModule,
        SharedModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        PrimeNgModule
    ],
    exports: [
        UsuarioIndexComponent
    ]
})
export class UsuarioModule { }
