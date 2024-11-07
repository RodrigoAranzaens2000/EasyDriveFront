import { Component, ViewChild } from '@angular/core';
import { ContadorNotificaciones } from '../../../models/ContadorNotificaciones';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { NotificacionesService } from '../../../services/notificaciones.service';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-contadornotificacionesquery',
  standalone: true,
  imports: [MatTableModule, MatIconModule, RouterModule, MatPaginatorModule],
  templateUrl: './contadornotificacionesquery.component.html',
  styleUrl: './contadornotificacionesquery.component.css'
})
export class ContadornotificacionesqueryComponent {
  dataSource: MatTableDataSource<ContadorNotificaciones> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2'];

  @ViewChild(MatPaginator) paginator!: MatPaginator; // Referencia al paginador

  constructor(private nS: NotificacionesService) {}

  ngOnInit(): void {
    this.nS.getCantidadNotificaciones().subscribe((data) => {
      this.dataSource.data = data;
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }
}