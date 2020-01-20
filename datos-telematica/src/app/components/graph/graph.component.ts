import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import * as CanvasJS from '../../../assets/js/canvasjs.min.js';
import * as $ from 'jquery';

import { UserService } from '../../services/user.service';
import { AuthenticationService } from '../../services/authentication.service';
import { SensorService } from '../../services/sensor.service';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css']
})
export class GraphComponent implements OnInit {
  user: any; 
  dataPoints: object[] = [];
  measures = [];
  dpsLength = 0;
  chart: any;
  sensorId = ''
  sensor = {};

  constructor(
    private  activatedRoute: ActivatedRoute,
    private authService: AuthenticationService,
    private userService: UserService,
    private sensorService: SensorService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.sensorId = this.activatedRoute.snapshot.params['id'];
    this.authService.getStatus().subscribe(
  		(user) => {
  			this.userService.getUserById(user.uid).valueChanges().subscribe(
  				(data) => {
  					this.user = data;
  				}, (error) =>{
  					console.log(error);
  				});
      });
      this.sensorService.sensorForId(this.sensorId).valueChanges().subscribe(
        (data) => {
          this.sensor = data;
      }, (error) => {
        console.log(error);
      });
      switch(this.sensorId){
        case 'sensor01':
          this.showTemp();
        break;
        case 'sensor02':
          this.showMetal();
        break;
      }
  }
  showTemp(){
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
    this.sensorService.dataSensor1().valueChanges().subscribe(
      data => {
        this.dataPoints.push({
          x: this.dataPoints.length,
          y: data['valor']
        });
        this.dpsLength = this.dataPoints.length;
        this.chart.render();
    });
  }
  showMetal(){
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
    this.sensorService.dataSensor2().valueChanges().subscribe(
      data => {
        this.dataPoints.push({
          x: this.dataPoints.length,
          y: data['valor']
        });
        this.dpsLength = this.dataPoints.length;
        this.chart.render();
    });
  }
  logout(){
  	this.authService.logout().then(
  		(data) => {
  			this.router.navigate(['components/login']);
  		}).catch(
  		(error) => {
  			console.log(error);
  		});
  }
}
