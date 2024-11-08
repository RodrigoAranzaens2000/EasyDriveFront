import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Pagos } from '../../../models/Pagos';
import { PagosService } from '../../../services/pagos.service';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-listarpagos',
  standalone: true,
  imports: [MatTableModule,MatPaginatorModule],
  templateUrl: './listarpagos.component.html',
  styleUrl: './listarpagos.component.css'
})
export class ListarpagosComponent implements OnInit{
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  dataSource: MatTableDataSource<Pagos> = new MatTableDataSource();
  
  constructor(private pS: PagosService) {}
  ngOnInit(): void {
    this.pS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
    this.pS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
  }
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }
}
