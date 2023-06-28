import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { RolDto } from 'src/app/rol/classes/rolDto';
import { UsuarioService } from '../../services/usuario.service';
import { UsuarioByIdDto } from '../../classes/usuarioByIdDto';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-editar-usuario',
    templateUrl: './editar-usuario.component.html',
    styleUrls: ['./editar-usuario.component.css']
})
export class EditarUsuarioComponent implements OnInit, OnDestroy {

    private modalSuscripcion: Subscription = new Subscription();
    public usuario: UsuarioByIdDto = new UsuarioByIdDto();
    public modalIsLoading: boolean = false;
    public rolUsuario: RolDto = new RolDto();
    public modalVisible: boolean = false;
    public isLoading: boolean = false;
    public estadosBloqueo: any[] = [];

    public editarUsuarioForm: FormGroup = this.fb.group({
        id: ["", []],
        isBlocked: [false, []],
        roles: this.fb.array([])
    });

    constructor(private fb: FormBuilder, private usuarioService: UsuarioService) { }

    @Output() createUpdateOk: EventEmitter<boolean> = new EventEmitter();

    get rolesFormArray() {
        return this.editarUsuarioForm.get("roles") as FormArray;
    }

    ngOnInit(): void {
        this.getUsuarioById();
        this.estadosBloqueo = [
            { label: 'Habilitado', value: false },
            { label: 'Bloqueado', value: true },
        ];
    }

    ngOnDestroy(): void {
        this.modalSuscripcion.unsubscribe();
    }

    guardarUsuario(event: Event) {
        event.preventDefault();
        if (this.isLoading) {
            return;
        }
        if (this.editarUsuarioForm.pristine) {
            return;
        }
        this.isLoading = true;
        // console.log(this.editarUsuarioForm.value);
        this.usuarioService.actualizarUsuario(this.editarUsuarioForm.value).subscribe({
            next: () => {
                this.createUpdateOk.emit(true);
                this.modalVisible = false;
            },
            error: () => { this.isLoading = false; }
        });
    }

    recibirRol(rol: RolDto) {
        if (rol) {
            console.log("recibirrol");
            this.rolesFormArray.clear();
            this.rolesFormArray.push(this.fb.control(rol.id));
            this.rolesFormArray.markAsDirty();  //marcamos el campo select-rol como sucio si se realizo algun cambio
        }
    }

    getUsuarioById() {
        this.modalSuscripcion = this.usuarioService.modalEditarUsuario$.subscribe(id => {
                                    this.usuarioService.getUsuarioById(id).subscribe({
                                        next: (resp) => {
                                            this.cargarDatosForm(resp.result);
                                        },
                                        error: () => { }
                                    });
                                    this.modalVisible = true;
                                });

    }

    cargarDatosForm(usuario: UsuarioByIdDto) {
        this.usuario = usuario;
        this.editarUsuarioForm.reset(usuario);
        this.rolUsuario = usuario.roles[0]; //enviamos el rol al select componente hijo cuando cambie de valor
        this.rolesFormArray.clear();
        if (usuario.roles.length > 0) {
            this.rolesFormArray.push(this.fb.control(usuario.roles[0].id));
        }
    }

    ocultarModalCancelado() {
        this.modalVisible = false;
    }
}
