import { Component, OnInit, ViewChild } from '@angular/core';
import { CentrosmedicosService } from '../../../services/centrosmedicos.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { PromedioCentrosMedicos } from '../../../models/PromedioCentrosMedicos';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-promediocentrosquery',
  standalone: true,
  imports: [MatTableModule, MatIconModule, RouterModule, MatPaginatorModule],
  templateUrl: './promediocentrosquery.component.html',
  styleUrl: './promediocentrosquery.component.css'
})
export class PromediocentrosqueryComponent implements OnInit {
  dataSource: MatTableDataSource<PromedioCentrosMedicos> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2'];

  @ViewChild(MatPaginator) paginator!: MatPaginator; // Referencia al paginador

  constructor(private cS: CentrosmedicosService) {}

  ngOnInit(): void {
    this.cS.getConsultasPromedio().subscribe((data) => {
      this.dataSource.data = data;
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }
}
