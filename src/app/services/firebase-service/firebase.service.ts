import { Injectable } from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {User} from "../../models/User";

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(private firestore: AngularFirestore) { }

  addUser(user: User): boolean {
    try{
       this.firestore.collection('usuarios').add(user);
       return true;
    } catch (e) {
      console.log('Error adding user: ', e);
      return false;
    }
  }
}
