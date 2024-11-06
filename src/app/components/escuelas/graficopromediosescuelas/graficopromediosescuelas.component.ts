import { Component } from '@angular/core';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { EscuelasService } from '../../../services/escuelas.service';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-graficopromediosescuelas',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './graficopromediosescuelas.component.html',
  styleUrl: './graficopromediosescuelas.component.css'
})
export class GraficopromediosescuelasComponent {
  barChartOptions:ChartOptions={
    responsive:true
  }
  barChartLabels:string[]=[]
  barChartType:ChartType='pie'
  barChartLegend=true
  barChartData:ChartDataset[]=[]

  constructor(private eS:EscuelasService){}
  ngOnInit(): void {
    this.eS.getConsultasPromedio().subscribe((data)=>{
      this.barChartLabels=data.map(item=>item.nombreEscuela)
      this.barChartData =
      [{
        data:data.map(item=>item.promedioCalificacion),
        backgroundColor:['#ee3007','#f08e79','#e98215'],
        borderColor:'#e94215',
        borderWidth:1
      }]
    });
  }
}
