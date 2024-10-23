import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CentrosMedicos } from '../../../models/CentrosMedicos';
import { CentrosmedicosService } from '../../../services/centrosmedicos.service';

@Component({
  selector: 'app-listarcentrosmedicos',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './listarcentrosmedicos.component.html',
  styleUrl: './listarcentrosmedicos.component.css'
})
export class ListarcentrosmedicosComponent {

  item: any;
  items: CentrosMedicos[] = []
  currentRotation: number = 0;

  constructor(private cS: CentrosmedicosService){}


  ngOnInit(): void {
    this.getAllItems(); // Cargar todos los elementos al iniciar
  }
  getAllItems(): void {
    this.cS.list().subscribe(
      (data) => {
        this.items = data
        console.log('items obtenidos' , this.items)
      },
      (error) => {
        console.error('error al obtener items', error)
      }
    )
    };

}
