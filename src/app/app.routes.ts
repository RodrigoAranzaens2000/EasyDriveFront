import { Routes } from '@angular/router';
import { ServiciosComponent } from './components/servicios/servicios.component';
import { CreaeditaserviciosComponent } from './components/servicios/creaeditaservicios/creaeditaservicios.component';
import { CentrosmedicosComponent } from './components/centrosmedicos/centrosmedicos.component';
import { CreaeditacentrosComponent } from './components/centrosmedicos/creaeditacentros/creaeditacentros.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { CreaeditausuariosComponent } from './components/usuarios/creaeditausuarios/creaeditausuarios.component';
import { PromediocentrosqueryComponent } from './components/centrosmedicos/promediocentrosquery/promediocentrosquery.component';
import { EscuelasComponent } from './components/escuelas/escuelas.component';
import { CreaeditaescuelasComponent } from './components/escuelas/creaeditaescuelas/creaeditaescuelas.component';
import { PromocionesComponent } from './components/promociones/promociones.component';
import { CreaeditapromocionesComponent } from './components/promociones/creaeditapromociones/creaeditapromociones.component';
import { NotificacionesComponent } from './components/notificaciones/notificaciones.component';
import { CreaeditanotificacionesComponent } from './components/notificaciones/creaeditanotificaciones/creaeditanotificaciones.component';
import { DireccionesComponent } from './components/direcciones/direcciones.component';
import { CreaeditadireccionesComponent } from './components/direcciones/creaeditadirecciones/creaeditadirecciones.component';
import { TelefonosComponent } from './components/telefonos/telefonos.component';
import { CreaeditatelefonosComponent } from './components/telefonos/creaeditatelefonos/creaeditatelefonos.component';

export const routes: Routes = [
    {
        path: 'servicios',
        component: ServiciosComponent,
        children: [
            {
                path: 'nuevo',
                component: CreaeditaserviciosComponent,
            },
            {
                path: 'ediciones/:id',
                component: CreaeditaserviciosComponent,
            },
        ],
    },
    {
        path: 'centrosmedicos',
        component: CentrosmedicosComponent,
        children: [
            {
                path: 'nuevo',
                component: CreaeditacentrosComponent,
            },
            {
                path: 'ediciones/:id',
                component: CreaeditacentrosComponent,
            },
            {   
                path: 'queries', 
                component: PromediocentrosqueryComponent ,
            }
        ],
    },
    
    {
        path: 'usuarios',
        component: UsuariosComponent,
        children: [
            {
                path: 'nuevo',
                component: CreaeditausuariosComponent,
            },
            {
                path: 'ediciones/:id',
                component: CreaeditausuariosComponent,
            },
        ],
    },
    {
        path: 'escuelas',
        component: EscuelasComponent,
        children: [
            {
                path: 'nuevo',
                component: CreaeditaescuelasComponent,
            },
            {
                path: 'ediciones/:id',
                component: CreaeditaescuelasComponent,
            },
        ],
    },
    {
        path: 'promociones',
        component: PromocionesComponent,
        children: [
            {
                path: 'nuevo',
                component: CreaeditapromocionesComponent,
            },
            {
                path: 'ediciones/:id',
                component: CreaeditapromocionesComponent,
            },
        ],
    },
    {
        path: 'notificaciones',
        component: NotificacionesComponent,
        children: [
            {
                path: 'nuevo',
                component: CreaeditanotificacionesComponent,
            },
            {
                path: 'ediciones/:id',
                component: CreaeditanotificacionesComponent,
            },
        ],
    },
    {
        path: 'direcciones',
        component: DireccionesComponent,
        children: [
            {
                path: 'nuevo',
                component: CreaeditadireccionesComponent,
            },
            {
                path: 'ediciones/:id',
                component: CreaeditadireccionesComponent,
            },
        ],
    },
    
    {
        path: 'telefonos',
        component: TelefonosComponent,
        children: [
            {
                path: 'nuevo',
                component: CreaeditatelefonosComponent,
            },
            {
                path: 'ediciones/:id',
                component: CreaeditatelefonosComponent,
            },
        ],
    }

];
