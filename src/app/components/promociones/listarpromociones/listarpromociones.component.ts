import { Component, ViewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { Promocion } from '../../../models/Promocion';
import { PromocionesService } from '../../../services/promociones.service';

@Component({
  selector: 'app-listarpromociones',
  standalone: true,
  imports: [MatTableModule, MatIconModule, RouterModule, MatPaginatorModule],
  templateUrl: './listarpromociones.component.html',
  styleUrl: './listarpromociones.component.css'
})
export class ListarpromocionesComponent {
  dataSource: MatTableDataSource<Promocion> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'accion01', 'accion02'];

  @ViewChild(MatPaginator) paginator!: MatPaginator; // Referencia al paginador

  constructor(private pS: PromocionesService) {}

  ngOnInit(): void {
    this.pS.list().subscribe((data) => {
      this.dataSource.data = data;
    });
    this.pS.getList().subscribe((data) => {
      this.dataSource.data = data;
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  eliminar(id: number) {
    this.pS.delete(id).subscribe((data) => {
      this.pS.list().subscribe((data) => {
        this.pS.setList(data);
      });
    });
  }
}
