import { Component, inject, ViewChild } from '@angular/core';
import { Notificaciones } from '../../../models/Notificaciones';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { NotificacionesService } from '../../../services/notificaciones.service';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { EliminarnotificacionComponent } from './eliminarnotificacion/eliminarnotificacion.component';

@Component({
  selector: 'app-listarnotificaciones',
  standalone: true,
  imports: [MatTableModule, MatIconModule, RouterModule, MatPaginatorModule, MatButtonModule, MatDialogModule],
  templateUrl: './listarnotificaciones.component.html',
  styleUrl: './listarnotificaciones.component.css'
})
export class ListarnotificacionesComponent {
  dataSource: MatTableDataSource<Notificaciones> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4' , 'c5' , 'c6', 'accion01'];
  @ViewChild(MatPaginator) paginator!: MatPaginator; // Referencia al paginador

  readonly dialog = inject(MatDialog);

  constructor(private nS: NotificacionesService) {}
  ngOnInit(): void {
    this.nS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
    this.nS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
  }
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  openDialog(id:number) {
    const dialogRef = this.dialog.open(EliminarnotificacionComponent);

    dialogRef.afterClosed().subscribe(result => {
     if(result){
      this.nS.delete(id).subscribe((data) => {
        this.nS.list().subscribe((data) => {
          this.nS.setList(data);
        });
      });
     }
    });
  }

}