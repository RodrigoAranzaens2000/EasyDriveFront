import { Routes } from '@angular/router';
import { ServiciosComponent } from './components/servicios/servicios.component';
import { CreaeditaserviciosComponent } from './components/servicios/creaeditaservicios/creaeditaservicios.component';
import { CentrosmedicosComponent } from './components/centrosmedicos/centrosmedicos.component';
import { CreaeditacentrosComponent } from './components/centrosmedicos/creaeditacentros/creaeditacentros.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { CreaeditausuariosComponent } from './components/usuarios/creaeditausuarios/creaeditausuarios.component';
import { PromediocentrosqueryComponent } from './components/centrosmedicos/promediocentrosquery/promediocentrosquery.component';

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
    }

];
