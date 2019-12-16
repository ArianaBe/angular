import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
 

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private afa: AngularFireAuth) { }
  loginWithemail(email: string, password: string) {
  	return this.afa.auth.signInWithEmailAndPassword(email, password);
  }
  registerWithEmail(email: string, password: string) {
  	return this.afa.auth.createUserWithEmailAndPassword(email, password);
  }
  getStatus() {
  	return this.afa.authState;
  }
  logout() {
  	return this.afa.auth.signOut();
  }
  sendEmailVerification() {
  	return this.afa.auth.currentUser.sendEmailVerification();
  }
}
