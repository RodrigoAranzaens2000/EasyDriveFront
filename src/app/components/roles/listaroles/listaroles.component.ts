import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Roles } from '../../../models/Roles';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { RolesService } from '../../../services/roles.service';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-listaroles',
  standalone: true,
  imports: [MatTableModule, MatIconModule, RouterModule, MatPaginatorModule],
  templateUrl: './listaroles.component.html',
  styleUrl: './listaroles.component.css'
})
export class ListarolesComponent implements OnInit, AfterViewInit{
  dataSource: MatTableDataSource<Roles> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'accion01'];
  @ViewChild(MatPaginator) paginator!: MatPaginator; // Referencia al paginador

  constructor(private rS: RolesService) {}
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