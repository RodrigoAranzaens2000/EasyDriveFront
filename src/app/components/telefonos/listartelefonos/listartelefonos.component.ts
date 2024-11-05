import { Component, ViewChild } from '@angular/core';
import { Telefonos } from '../../../models/Telefonos';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { TelefonosService } from '../../../services/telefonos.service';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-listartelefonos',
  standalone: true,
  imports: [MatTableModule , MatPaginator],
  templateUrl: './listartelefonos.component.html',
  styleUrl: './listartelefonos.component.css'
})
export class ListartelefonosComponent {
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5' , 'c6', 'c7' , 'c8'];
  @ViewChild(MatPaginator) paginator!: MatPaginator; // Referencia al paginador

  dataSource: MatTableDataSource<Telefonos> = new MatTableDataSource();
  constructor(private tS: TelefonosService) {}
  ngOnInit(): void {
    this.tS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
    this.tS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
  }
}

