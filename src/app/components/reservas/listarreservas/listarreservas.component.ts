import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Reservas } from '../../../models/Reservas';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { ReservasService } from '../../../services/reservas.service';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-listarreservas',
  standalone: true,
  imports: [MatTableModule, MatIconModule, RouterModule, MatPaginatorModule],
  templateUrl: './listarreservas.component.html',
  styleUrl: './listarreservas.component.css'
})
export class ListarreservasComponent {
  dataSource: MatTableDataSource<Reservas> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4' , 'c5' , 'c6' , 'c7', 'c8','c9' ,  'accion01'];
  @ViewChild(MatPaginator) paginator!: MatPaginator; // Referencia al paginador

  constructor(private rS: ReservasService) {}
  ngOnInit(): void {
    this.rS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
    this.rS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
  }
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

}