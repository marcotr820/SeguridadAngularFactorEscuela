import { Component, OnInit } from '@angular/core';
import { RolService } from '../../services/rol.service';
import { RolDto } from '../../classes/rolDto';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Observable } from 'rxjs';

@Component({
   selector: 'app-rol',
   templateUrl: './rol-index.component.html',
   styleUrls: ['./rol-index.component.css'],
   providers: [ConfirmationService, MessageService],
})
export class RolIndexComponent implements OnInit {

   roles: RolDto[] = [];
   isLoading: boolean = false;
   mostrarModal: boolean = false;
   form: FormGroup = this.fb.group({
      rol: ""
   });

   constructor(private fb: FormBuilder, private rolService: RolService,
      private confirmationService: ConfirmationService, private messageService: MessageService) { }

   ngOnInit(): void {
      this.getAllRolesIndex();
   }

   mostrarModalFuncion() { this.mostrarModal = true; }

   modalCanceladoOutput(valor: boolean) { this.mostrarModal = valor; }

   ocultarModalDatoCreadoOutput(valor: boolean) {
      if (!valor) {
         this.getAllRolesIndex();
         this.mostrarModal = valor;
      }
   }

   getAllRolesIndex() {
      this.isLoading = true;
      this.rolService.getAllForIndex().subscribe({
         next: (resp) => {
            this.roles = resp.result;
            this.isLoading = false;
         }
      });
   }

   editar(rol: RolDto) {
      console.log(rol);
      
      this.form.get('rol')?.setValue({ ...rol });
      this.mostrarModalFuncion();
   }

   confirmarEliminar(id: string) {
      this.confirmationService.confirm({
         message: 'Eliminar Registro?',
         header: 'Eliminar',
         icon: 'pi pi-exclamation-triangle',
         acceptLabel: 'Aceptar', acceptButtonStyleClass: 'cbc4',
         rejectLabel: 'Cancelar', rejectButtonStyleClass: 'cbn2',
         accept: () => { this.eliminarRol(id) }
      })
   }

   eliminarRol(id: string) {
      this.rolService.eliminarRol(id).subscribe({
         next: (resp) => {
            this.getAllRolesIndex();
            this.messageService.add({ severity: 'success', summary: 'Confirmed', detail: 'Acción realizada con exito.' });
         }
      })
   }

}
