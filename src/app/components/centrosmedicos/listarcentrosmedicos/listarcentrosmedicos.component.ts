
import { CentrosMedicos } from '../../../models/CentrosMedicos';
import { CentrosmedicosService } from '../../../services/centrosmedicos.service';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-listarcentrosmedicos',
  standalone: true,
  imports: [MatTableModule, MatIconModule, RouterModule, MatPaginatorModule],
  templateUrl: './listarcentrosmedicos.component.html',
  styleUrl: './listarcentrosmedicos.component.css'
})
export class ListarcentrosmedicosComponent implements OnInit, AfterViewInit  {
  dataSource: MatTableDataSource<CentrosMedicos> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5' , 'c6', 'accion01', 'accion02'];

  @ViewChild(MatPaginator) paginator!: MatPaginator; // Referencia al paginador

  constructor(private cS: CentrosmedicosService) {}

  ngOnInit(): void {
    this.cS.list().subscribe((data) => {
      this.dataSource.data = data;
    });
    this.cS.getList().subscribe((data) => {
      this.dataSource.data = data;
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  eliminar(id: number) {
    this.cS.delete(id).subscribe((data) => {
      this.cS.list().subscribe((data) => {
        this.cS.setList(data);
      });
    });
  }
}
