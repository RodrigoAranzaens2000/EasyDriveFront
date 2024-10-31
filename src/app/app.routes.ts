import { Routes } from '@angular/router';
import { ServiciosComponent } from './components/servicios/servicios.component';
import { CreaeditaserviciosComponent } from './components/servicios/creaeditaservicios/creaeditaservicios.component';
import { CentrosmedicosComponent } from './components/centrosmedicos/centrosmedicos.component';
import { CreaeditacentrosComponent } from './components/centrosmedicos/creaeditacentros/creaeditacentros.component';

export const routes: Routes = [
    {
        path : 'servicios',
        component: ServiciosComponent,
        children:[
            {
                path: 'nuevo',
                component: CreaeditaserviciosComponent,
            },
            {
                path: 'ediciones/:id',
                component : CreaeditaserviciosComponent,
            },
        ],
    },
    {
        path : 'centrosmedicos',
        component: CentrosmedicosComponent,
        children:[
            {
                path: 'nuevo',
                component: CreaeditacentrosComponent,
            },
            {
                path: 'ediciones/:id',
                component : CreaeditacentrosComponent,
            },
        ],
    }

];
