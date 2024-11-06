import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { PromedioEscuelas } from '../../../models/PromedioEscuelas';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { EscuelasService } from '../../../services/escuelas.service';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-promedioescuelasquery',
  standalone: true,
  imports: [MatTableModule, MatIconModule, RouterModule, MatPaginatorModule],
  templateUrl: './promedioescuelasquery.component.html',
  styleUrl: './promedioescuelasquery.component.css'
})
export class PromedioescuelasqueryComponent {
  dataSource: MatTableDataSource<PromedioEscuelas> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2'];

  @ViewChild(MatPaginator) paginator!: MatPaginator; // Referencia al paginador

  constructor(private eS: EscuelasService) {}

  ngOnInit(): void {
    this.eS.getConsultasPromedio().subscribe((data) => {
      this.dataSource.data = data;
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }
}
