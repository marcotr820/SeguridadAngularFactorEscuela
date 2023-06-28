import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { UsuarioDto } from '../../classes/usuarioDto';
import { UsuarioService } from '../../services/usuario.service';

@Component({
    selector: 'app-usuario',
    templateUrl: './usuario-index.component.html',
    styleUrls: ['./usuario-index.component.css'],
    providers: [ConfirmationService, MessageService],
    encapsulation: ViewEncapsulation.None
})
export class UsuarioIndexComponent implements OnInit {

    usuarios: UsuarioDto[] = [];
    isLoading: boolean = false;
    modalCrearVisible: boolean = false;

    constructor(
        private usuarioService: UsuarioService,
        private confirmationService: ConfirmationService,
        private messageService: MessageService
    ) { }

    ngOnInit(): void {
        this.getAllUsuarios();
    }

    getAllUsuarios() {
        this.isLoading = true;
        this.usuarioService.getAllUsuarios().subscribe({
            next: (resp) => {
                this.usuarios = resp.result;
                this.isLoading = false;
            },
            error: (resp) => { }
        })
    }

    mostrarModalCrear() {
        this.modalCrearVisible = true;
    }
    ocultarModalCrear(valor: boolean) {
        this.getAllUsuarios();
        this.modalCrearVisible = valor;
    }
    ocultarModalCrearCancelado(valor: boolean) {
        this.modalCrearVisible = valor;
    }

    confirmarEliminar(id: string) {
        this.confirmationService.confirm({
            message: 'Eliminar Registro?',
            header: 'Eliminar',
            icon: 'pi pi-exclamation-triangle',
            acceptLabel: 'Aceptar', acceptButtonStyleClass: 'cbc4',
            rejectLabel: 'Cancelar', rejectButtonStyleClass: 'cbn2',
            accept: () => { this.eliminarUsuario(id) }
        });
    }

    eliminarUsuario(id: string) {
        this.usuarioService.eliminarUsuario(id).subscribe({
            next: (resp) => {
                this.getAllUsuarios();
                this.messageService.add({ severity: 'success', summary: 'Confirmed', detail: 'Acción realizada con exito.' });
            }
        })
    }

    mostrarModalEditar(id: string) {
        this.usuarioService.modalEditarUsuario$.emit(id);
    }

    refrescarUsuarios(){
        this.getAllUsuarios();
    }
}
