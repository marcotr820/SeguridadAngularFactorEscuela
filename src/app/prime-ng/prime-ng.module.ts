import { NgModule } from '@angular/core';
//Primeng
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { MenubarModule } from 'primeng/menubar';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { CardModule } from 'primeng/card';
import { DropdownModule } from 'primeng/dropdown';
import { PasswordModule } from 'primeng/password';
import { MessagesModule } from 'primeng/messages';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { MessageModule } from 'primeng/message';
import { DividerModule } from 'primeng/divider';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@NgModule({
   declarations: [],
   imports: [],
   exports: [
      ButtonModule,
      InputTextModule,
      MenubarModule,
      TableModule,
      DialogModule,
      CardModule,
      DropdownModule,
      PasswordModule,
      MessagesModule,
      ConfirmDialogModule,
      ToastModule,
      MessageModule,
      DividerModule,
      ProgressSpinnerModule
   ]
})
export class PrimeNgModule { }
