import { Component } from '@angular/core';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { NotificacionesService } from '../../../services/notificaciones.service';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-graficacontadorquery',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './graficacontadorquery.component.html',
  styleUrl: './graficacontadorquery.component.css'
})
export class GraficacontadorqueryComponent {
  barChartOptions:ChartOptions={
    responsive:true
  }
  barChartLabels:string[]=[]
  barChartType:ChartType='doughnut'
  barChartLegend=true
  barChartData:ChartDataset[]=[]

  constructor(private nS:NotificacionesService){}
  ngOnInit(): void {
    this.nS.getCantidadNotificaciones().subscribe((data)=>{
      this.barChartLabels=data.map(item=>item.nombreusuario)
      this.barChartData =
      [{
        data:data.map(item=>item.cantnotificacion),
        backgroundColor:['#ee3007','#f08e79','#e98215'],
        borderColor:'#e94215',
        borderWidth:1
      }]
    });
  }
}
