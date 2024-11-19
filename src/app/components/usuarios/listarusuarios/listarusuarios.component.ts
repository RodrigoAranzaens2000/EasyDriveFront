import { Component, ViewChild } from '@angular/core';
import { Usuarios } from '../../../models/Usuarios';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { UsuariosService } from '../../../services/usuario.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-listarusuarios',
  standalone: true,
  imports: [MatTableModule, MatIconModule, RouterModule, MatPaginatorModule ,  FormsModule , CommonModule , MatFormFieldModule , MatInputModule],
  templateUrl: './listarusuarios.component.html',
  styleUrl: './listarusuarios.component.css'
})
export class ListarusuariosComponent {
  dataSource: MatTableDataSource<Usuarios> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6' , 'c7' , 'c8' , 'c9' , 'accion01', 'accion02'];

  @ViewChild(MatPaginator) paginator!: MatPaginator; // Referencia al paginador

  constructor(private uS: UsuariosService) {}

  ngOnInit(): void {
    this.uS.list().subscribe((data) => {
      this.dataSource.data = data;
    });
    this.uS.getList().subscribe((data) => {
      this.dataSource.data = data;
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }
  aplicarFiltro(event: Event) {
    const valorFiltro = (event.target as HTMLInputElement).value;
    this.dataSource.filter = valorFiltro.trim().toLowerCase();
  }
  eliminar(id: number) {
    this.uS.delete(id).subscribe((data) => {
      this.uS.list().subscribe((data) => {
        this.uS.setList(data);
      });
    });
  }
}

