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
  dataSensor1(){
    return this.angularFireDatabase.object('/Temperatura/');
  }
  dataSensor2(){
    return this.angularFireDatabase.object('/Metal/');
  }
  sensorForId(id){
    return this.angularFireDatabase.object('/sensores/' + id);
  }
}
