import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Direcciones } from '../../../models/Direcciones';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { DireccionesService } from '../../../services/direcciones.service';


@Component({
  selector: 'app-listardirecciones',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule],
  templateUrl: './listardirecciones.component.html',
  styleUrl: './listardirecciones.component.css'
})
export class ListardireccionesComponent {
  dataSource: MatTableDataSource<Direcciones> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4' , 'c5' , 'c6' , 'c7' , 'c8', 'c9' , 'c10' , 'c11'];
  @ViewChild(MatPaginator) paginator!: MatPaginator; // Referencia al paginador

  constructor(private dS: DireccionesService) {}
  ngOnInit(): void {
    this.dS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
    this.dS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
  }
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

}
