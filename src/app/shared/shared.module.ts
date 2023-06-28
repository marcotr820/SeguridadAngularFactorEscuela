import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderMenubarComponent } from './header-menubar/header-menubar.component';
import { PrimeNgModule } from '../prime-ng/prime-ng.module';

@NgModule({
   declarations: [
      HeaderMenubarComponent
   ],
   imports: [
      CommonModule,
      PrimeNgModule
   ],
   exports: [
      HeaderMenubarComponent
   ]
})
export class SharedModule { }
