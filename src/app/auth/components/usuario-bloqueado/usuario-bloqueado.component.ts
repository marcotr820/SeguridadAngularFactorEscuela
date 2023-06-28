import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UsuarioDto } from '../../../usuario/classes/usuarioDto';
import { AuthService } from '../../services/auth.service';

@Component({
   selector: 'app-usuario-bloqueado',
   templateUrl: './usuario-bloqueado.component.html',
   styleUrls: ['./usuario-bloqueado.component.css']
})
export class UsuarioBloqueadoComponent {

   modalVisible: boolean = false;
   usuarioBloqueado = new UsuarioDto();

   constructor() { }

   @Input() set modalVisibleInput(modalVisibleBloqueo: boolean) {
      if (modalVisibleBloqueo) {
         this.modalVisible = modalVisibleBloqueo;
      }
   }

   @Output() modalVisibleOutput: EventEmitter<boolean> = new EventEmitter<boolean>();

   ocultarModal() {
      this.modalVisible = false;
      this.modalVisibleOutput.emit(this.modalVisible);
   }

}
