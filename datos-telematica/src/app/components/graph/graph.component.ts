import { Component, OnInit } from '@angular/core';
import * as CanvasJS from '../../../assets/js/canvasjs.min.js';
import * as $ from 'jquery';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css']
})
export class GraphComponent implements OnInit {
  dataPoints: object[] = [];
  dpsLength = 0;
  chart: any;
  constructor() { }

  ngOnInit() {

	  this.chart = new CanvasJS.Chart("chartContainer",{
      exportEnabled: true,
      title:{
        text:""
      },
      data: [{
        type: "spline",
        dataPoints : this.dataPoints,
      }]
    });
    let data = $.getJSON("https://canvasjs.com/services/data/datapoints.php?xstart=1&ystart=25&length=20&type=json&callback=?");
    data.then(
      (a:[])=>{
      a.forEach(par => {
        this.dataPoints.push({
          x: par[0],
          y: parseInt(par[1])
        });
      });
      this.dpsLength = this.dataPoints.length;
      this.chart.render();
      this.updateChart();
    });
    

  }
   updateChart() {  
   let data = $.getJSON("https://canvasjs.com/services/data/datapoints.php?xstart=" + (this.dpsLength + 1) + "&ystart=" + (this.dataPoints[this.dataPoints.length - 1]) + "&length=1&type=json&callback=?");
    data.then(
      (a:[])=>{
        a.forEach(par =>{
          this.dataPoints.push({
            x: parseInt(par[0]),
            y: parseInt(par[1])
          })
        })
        this.dpsLength++;
      });
      
      if (this.dataPoints.length >  20 ) {
            this.dataPoints.shift();        
          }
      this.chart.render();
      setTimeout(() => {
        this.updateChart()
      }, 1000);
  }
}
