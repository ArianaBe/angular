import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { SensorService } from '../../services/sensor.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

	user: any; 
  sensors: any;

  constructor(private authService: AuthenticationService,
  			  private router: Router,
  			  private userService: UserService,
          private sensorService: SensorService) { }

  ngOnInit() {
    this.listsensor();
  	this.authService.getStatus().subscribe(
  		(user) => {
  			console.log(user.uid);
  			this.userService.getUserById(user.uid).valueChanges().subscribe(
  				(data) => {
  					this.user = data;
  					console.log(this.user);
  				}, (error) =>{
  					console.log(error);
  				});
  		})
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
  listsensor(){
    this.sensorService.listSensor().valueChanges().subscribe(
      (data) => {
        this.sensors = data;
        console.log(this.sensors);
          }, (error) =>{
            console.log(error);
      });
  }
}

