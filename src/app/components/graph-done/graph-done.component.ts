import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-graph-done',
  templateUrl: './graph-done.component.html',
  styles: []
})
export class GraphDoneComponent implements OnInit {

  @Input('chartLabels') doughnutChartLabels: string[] = [];
  @Input('chartData') doughnutChartData: number[] = [];
  @Input('chartType') doughnutChartType: string = '';

  constructor() { }

  ngOnInit() {
  }

}
