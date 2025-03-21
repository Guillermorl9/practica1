import { Injectable } from '@angular/core';
import {Firestore, doc, setDoc, getDoc,} from '@angular/fire/firestore';
import { User } from "../../models/User";

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  private readonly USERS_COLLECTION: string = "usuarios";

  constructor(private firestore: Firestore) { }

  async saveUserData(uid: string, userData: Partial<User>): Promise<void> {
    try {
      const userRef = doc(this.firestore, `${this.USERS_COLLECTION}/${uid}`);
      await setDoc(userRef, userData, { merge: true });
    } catch (error) {
      console.error('Error guardando datos del usuario:', error);
      throw error;
    }
  }

  async getUserData(uid: string): Promise<User | null> {
    try {
      const userRef = doc(this.firestore, `${this.USERS_COLLECTION}/${uid}`);
      const docSnap = await getDoc(userRef);

      if (docSnap.exists()) {
        return docSnap.data() as User;
      } else {
        console.error('No se encontró información del usuario');
        return null;
      }
    } catch (error) {
      console.error('Error obteniendo datos del usuario:', error);
      return null;
    }
  }

}
