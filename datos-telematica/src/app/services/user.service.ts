import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor( private afd: AngularFireDatabase ) { }
  	createUser(user){
  		return this.afd.object( '/users/' + user.uid ).set(user);
  	}
  	getUserById(uid){
  		return this.afd.object( '/users/' + uid);
  	}

}
