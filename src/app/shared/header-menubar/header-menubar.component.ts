import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { AuthService } from '../../auth/services/auth.service';
import { CS } from '../classes/CS';
import { UsuarioDto } from '../../usuario/classes/usuarioDto';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserHasRole } from '../services/user-has-role.service';

@Component({
    selector: 'app-header-menubar',
    templateUrl: './header-menubar.component.html',
    styleUrls: ['./header-menubar.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class HeaderMenubarComponent implements OnInit, OnDestroy {

    public menuHeader: MenuItem[] = [];
    public isUserLoggedIn: boolean = false;
    private subscription!: Subscription;

    constructor(
        private _authService: AuthService,
        private _userHasRole: UserHasRole
    ) {}

    ngOnInit(): void {
        this.subscription = this._authService.isLoggedIn$.subscribe( (isLoggedIn) => {
            this.isUserLoggedIn = isLoggedIn;
        });

        this.menuHeader = [
            {
                label: `Usuarios/${this.isUserLoggedIn}`, icon: 'pi pi-fw pi-users', routerLink: 'usuarios',
                visible: this._userHasRole.userHasRole(["ADMIN"])
            },
            {
                label: 'Roles', routerLink: 'roles',
                visible: this._userHasRole.userHasRole(["ADMIN"])
            },
            { label: 'Iniciar Sesion', visible: !this.isUserLoggedIn, routerLink: 'login' },
            { label: 'Soporte', icon: 'pi pi-fw pi-envelope' },
            { label: 'Configuración', icon: 'pi pi-fw pi-cog', routerLink: 'cuenta' },
            {
                styleClass: 'estilo-dropdown alinear-derecha',
                icon: 'pi pi-fw pi-user',
                items: [
                    { label: this.usuario.userName, disabled: true },
                    { label: 'panel de control del creador' },
                    {
                        label: 'Cerrar Sesion', icon: 'pi pi-fw pi-sign-out',
                        visible: this.isUserLoggedIn, command: () => this.logOut(),
                    }
                ]
            }
        ];
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }
    
    get usuario(): UsuarioDto {
        return { ...this._authService.usuario };
    }

    private get rolSuperAdminRolAdmin(): string[] {
        return [CS.SUPERADMIN, CS.ADMIN];
    }

    private get rolAdmin(): string[] {
        return [CS.ADMIN];
    }

    private get rolSuperAdmin(): string[] {
        return [CS.SUPERADMIN];
    }

    

    logOut() {
        this._authService.logOut();
    }

}
