import { Component, OnInit } from '@angular/core';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { CentrosmedicosService } from '../../../services/centrosmedicos.service';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-graficopromedios',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './graficopromedios.component.html',
  styleUrl: './graficopromedios.component.css'
})
export class GraficopromediosComponent implements OnInit {
  barChartOptions:ChartOptions={
    responsive:true
  }
  barChartLabels:string[]=[]
  barChartType:ChartType='pie'
  barChartLegend=true
  barChartData:ChartDataset[]=[]

  constructor(private cS:CentrosmedicosService){}
  ngOnInit(): void {
    this.cS.getConsultasPromedio().subscribe((data)=>{
      this.barChartLabels=data.map(item=>item.nombrecentro)
      this.barChartData =
      [{
        data:data.map(item=>item.avgreseinas),
        backgroundColor:['#ee3007','#f08e79','#e98215'],
        borderColor:'#e94215',
        borderWidth:1
      }]
    });
  }
}
