import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { PrimeNgModule } from '../prime-ng/prime-ng.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RolIndexComponent } from './pages/rol-index/rol-index.component';
import { CrearEditarRolComponent } from './components/crear-editar-rol/crear-editar-rol.component';
import { SelectRolComponent } from './components/select-rol/select-rol.component';



@NgModule({
    declarations: [
        RolIndexComponent,
        CrearEditarRolComponent,
        SelectRolComponent
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
    exports: [
        SelectRolComponent,
        RolIndexComponent
    ]
})
export class RolModule { }
