import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RolDto } from '../../classes/rolDto';
import { RolService } from '../../services/rol.service';
import { MessageService } from 'primeng/api';
import { ResponseDto } from 'src/app/shared/classes/responseDto';

@Component({
   selector: 'app-crear-editar-rol',
   templateUrl: './crear-editar-rol.component.html',
   styleUrls: ['./crear-editar-rol.component.css'],
   providers: [MessageService],
})
export class CrearEditarRolComponent implements OnInit {

   isLoading: boolean = false;
   erroresMsj: string[] = [];
   mostrarModal: boolean = false;
   headerModal: string = '';
   formRol: FormGroup = this.fb.group({
      id: ['', []],
      name: ['', [Validators.required]]
   });

   constructor(
      private fb: FormBuilder,
      private rolService: RolService,
      private messageService: MessageService
   ) { }

   ngOnInit(): void {
      this.ocultarErrores();
   }

   @Input() set mostrarModalInput(mostrarModal: boolean) {
      if (mostrarModal) {
         this.mostrarModalFuncion();
      }
   }
   @Input() set rolValueInput(rolValue: RolDto) {
      if (rolValue && (!!rolValue.id)) {
         const { id, name } = rolValue;
         this.formRol.patchValue({
            id,
            name,
         });
      }
   }
   @Output() createUpdateOk: EventEmitter<boolean> = new EventEmitter<boolean>();
   @Output() modalCanceladoOutput: EventEmitter<boolean> = new EventEmitter<boolean>();

   ocultarErrores(){
      this.formRol?.valueChanges.subscribe(() => {
         if (this.erroresMsj.length != 0) {
            //al ocultar el formulario se resetea y se ejecuta esta funcion por que los valores cambian a null y receteamos los errores
            this.erroresMsj = [];
         }
      });
   }

   createUpdateRol(event: Event) {
      event.preventDefault();
      if (this.formRol.pristine || this.isLoading) {
         return;
      }
      if (!this.formRol.valid) {
         let formKeys = this.formRol.controls;
         Object.keys(formKeys).forEach((key) => {
            this.formRol.get(key)?.markAsDirty();
         });
         return;
      }
      let rol: RolDto = this.formRol.value;
      this.erroresMsj = [];
      this.isLoading = true;
      this.rolService.createUpdateRol(rol).subscribe({
         next: (resp) => {
            this.ocultarModalDatoCreado();
            this.messageService.add({ severity: 'success', summary: 'Confirmed', detail: 'Acción realizada con exito.' });
            this.isLoading = false;
         },
         error: (err: ResponseDto<null>) => {
            this.erroresMsj = err.errorMessages;
            this.isLoading = false;
         }
      })
   }

   mostrarModalFuncion() {
      this.headerModal = 'Crear Rol';
      this.mostrarModal = true; 
   }

   cancelarModal() {
      this.mostrarModal = false
      this.modalCanceladoOutput.emit(this.mostrarModal);
      this.formRol.reset();
   }

   campoEsValido(campo: string): boolean {
      if (this.formRol.get(campo)?.invalid && this.formRol.get(campo)?.dirty) {
         return true;
      }
      return false;
   }

   ocultarModalDatoCreado(event?: Event) {
      event?.preventDefault();
      this.mostrarModal = false;
      this.createUpdateOk.emit(this.mostrarModal);
      this.formRol.reset();
   }
}
