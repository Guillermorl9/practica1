import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection } from '@angular/fire/firestore';
import { User } from "../../models/User";

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(private firestore: Firestore) { }

  addUser(user: User): boolean {
    try {
      const usersRef = collection(this.firestore, 'usuarios');
      addDoc(usersRef, user);
      return true;
    } catch (e) {
      console.log('Error adding user: ', e);
      return false;
    }
  }
}
