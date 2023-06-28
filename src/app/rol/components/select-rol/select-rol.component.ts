import { Component, EventEmitter, Input, Output, OnInit, ViewEncapsulation } from '@angular/core';
import { RolService } from '../../services/rol.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { RolDto } from '../../classes/rolDto';

@Component({
    selector: 'app-select-rol',
    templateUrl: './select-rol.component.html',
    styleUrls: ['./select-rol.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class SelectRolComponent implements OnInit {

    roles: RolDto[] = [];
    campoNoValido: boolean = false;
    formRol: FormGroup = this.fb.group({
        rol: new RolDto(),
    });

    @Input() set rolesInvalidInput(valor: boolean){
        this.campoNoValido = valor;
    }

    @Input() set rolInput(rolRecibido: RolDto) {
        if (rolRecibido && rolRecibido.id.length > 0) {
            this.formRol.reset({
                rol: rolRecibido
            });
        }
    }

    @Output() rolOutput: EventEmitter<RolDto> = new EventEmitter<RolDto>();

    constructor(private rolService: RolService, private fb: FormBuilder) {}

    ngOnInit(): void {
        this.getRoles();
    }

    getRoles() {
        this.rolService.getAllRolesSelectCache$.subscribe({
            next: (resp) => {
               this.roles = resp;
            }
        });
    }

    onDropdownChange(event: { originalEvent: PointerEvent, value: RolDto }) {
        const rol = event.value;
        this.rolOutput.emit(rol);
        this.campoNoValido = false;
    }

}
