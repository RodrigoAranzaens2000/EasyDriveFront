import { Component } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';


@Component({
  selector: 'app-eliminarnotificacion',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
  templateUrl: './eliminarnotificacion.component.html',
  styleUrl: './eliminarnotificacion.component.css'
})
export class EliminarnotificacionComponent {

}
