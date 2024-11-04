import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { Escuelas } from '../../../models/Escuelas';
import { EscuelasService } from '../../../services/escuelas.service';

@Component({
  selector: 'app-listarescuelas',
  standalone: true,
  imports: [MatTableModule, MatIconModule, RouterModule, MatPaginatorModule],
  templateUrl: './listarescuelas.component.html',
  styleUrl: './listarescuelas.component.css'
})
export class ListarescuelasComponent implements OnInit, AfterViewInit {
  dataSource: MatTableDataSource<Escuelas> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'accion01', 'accion02'];
  @ViewChild(MatPaginator) paginator!: MatPaginator; // Referencia al paginador

  constructor(private eS: EscuelasService) {}
  ngOnInit(): void {
    this.eS.list().subscribe((data) => {
      this.dataSource.data = data;
    });
    this.eS.getList().subscribe((data) => {
      this.dataSource.data = data;
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  eliminar(id: number) {
    this.eS.delete(id).subscribe((data) => {
      this.eS.list().subscribe((data) => {
        this.eS.setList(data);
      });
    });
  }
}