import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ServiciosService } from '../../../services/servicios.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator'; // Importado MatPaginator y MatPaginatorModule
import { Servicios } from '../../../models/Servicios';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-listarservicios',
  standalone: true,
  imports: [MatTableModule, MatIconModule, RouterModule, MatPaginatorModule], // Agregado MatPaginatorModule aquí
  templateUrl: './listarservicios.component.html',
  styleUrls: ['./listarservicios.component.css'] 
})
export class ListarserviciosComponent implements OnInit, AfterViewInit {
  dataSource: MatTableDataSource<Servicios> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5', 'accion01', 'accion02'];

  @ViewChild(MatPaginator) paginator!: MatPaginator; // Referencia al paginador

  constructor(private sS: ServiciosService) {}

  ngOnInit(): void {
    this.sS.list().subscribe((data) => {
      this.dataSource.data = data;
    });
    this.sS.getList().subscribe((data) => {
      this.dataSource.data = data;
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  eliminar(id: number) {
    this.sS.delete(id).subscribe((data) => {
      this.sS.list().subscribe((data) => {
        this.sS.setList(data);
      });
    });
  }
}
