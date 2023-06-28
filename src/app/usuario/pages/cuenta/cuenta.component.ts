import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../auth/services/auth.service';
import { UsuarioDto } from '../../classes/usuarioDto';

@Component({
   selector: 'app-cuenta',
   templateUrl: './cuenta.component.html',
   styleUrls: ['./cuenta.component.css']
})
export class CuentaComponent {

   public mostrarModalUserName: boolean = false;
   public mostrarModalPassword: boolean = false;
   public formCambiarPassword: FormGroup = this.fb.group({
      passwordActual: ['', [Validators.required]],
      nuevoPassword: ['', [Validators.required]]
   });

   constructor(private fb: FormBuilder, private authService: AuthService) {}

   get usuario(): UsuarioDto { 
      return {...this.authService.usuario} 
   }

   modalEditarUserNameVisible() {
      this.mostrarModalUserName = true;
   }
   ocultarModalUserName(valor: boolean){
      if (!valor) {
         this.mostrarModalUserName = valor;
      }
   }
   ocultarModalUserNameCancelado(valor: boolean) {
      if (!valor) {
         this.mostrarModalUserName = valor;
      }
   }

   modalEditarPasswordVisible(){
      this.mostrarModalPassword = true;
   }
   ocultarModalPasswordCancelado(valor: boolean) {
      if (!valor) {
         this.mostrarModalPassword = valor;
      }
   }

}
