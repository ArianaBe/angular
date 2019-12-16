import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

	operation = 'login';
	inputName1 = '';
	inputLastname1 ='';
	inputEmail1 ='';
	inputPassword1 ='';

  constructor(private authService: AuthenticationService, 
  			  private userService: UserService,
  			  private router: Router) { }

  ngOnInit() {
  	
  }
  login(){
  	console.log(this.inputEmail1);
  	this.authService.loginWithemail(this.inputEmail1, this.inputPassword1).then(
  		(data) => {
  			this.router.navigate(['components/home']);
  	}).catch(
  		(error) => {
  		console.log(error);
  	});
  }
  register() {
  	this.authService.registerWithEmail(this.inputEmail1, this.inputPassword1).then(
  		(data) => {
  			const user ={
  				uid: data.user.uid,
  				name: this.inputName1,
  				lastname: this.inputLastname1,
  				email: this.inputEmail1
  			};
  			this.userService.createUser(user).then(
  				(data)=> {
  					alert('usuario registrado')
  				}).catch(
  					(error) => {
  						console.log(error);
  					});
	}).catch(
		(error) => {
			console.log(error);
	});
  }
}
