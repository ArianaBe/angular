import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';


@Injectable({
  providedIn: 'root'
})
export class SensorService {

  constructor(private angularFireDatabase: AngularFireDatabase) { }
  listSensor(){
  	return this.angularFireDatabase.list( '/sensores/' );
  }

}
