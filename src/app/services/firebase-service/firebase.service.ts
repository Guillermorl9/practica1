import {inject, Injectable} from '@angular/core';
import {Firestore, doc, setDoc, getDoc,} from '@angular/fire/firestore';
import { User } from "../../models/User";
import {Order} from "../../models/Order";
import {Product} from "../../models/Product";

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  // Services
  private firestore: Firestore = inject(Firestore)
  // Constants
  private readonly USERS_COLLECTION: string = "usuarios";

  constructor() { }

  // Save user data in Firestore
  async saveUserData(uid: string, userData: Partial<User>): Promise<void> {
    try {
      const userRef = doc(this.firestore, `${this.USERS_COLLECTION}/${uid}`);
      await setDoc(userRef, userData, { merge: true });
    } catch (error) {
      console.error('Error saving user data:', error);
      throw error;
    }
  }

  // Get user data from Firestore
  async getUserData(uid: string): Promise<User | null> {
    try {
      const userRef = doc(this.firestore, `${this.USERS_COLLECTION}/${uid}`);
      const docSnap = await getDoc(userRef);

      if (docSnap.exists()) {
        return docSnap.data() as User;
      } else {
        console.error('No user information found');
        return null;
      }
    } catch (error) {
      console.error('Error getting user data:', error);
      return null;
    }
  }

  // Update user name in Firestore
  async updateUserName(uid: string, nuevoNombre: string): Promise<void> {
    try {
      const userRef = doc(this.firestore, `${this.USERS_COLLECTION}/${uid}`);
      await setDoc(userRef, { firstName: nuevoNombre }, { merge: true });
    } catch (error) {
      console.error('Error updating user name:', error);
      throw error;
    }
  }

  // Update user email in Firestore
  async updateOrdersList(uid: string, orderList: Array<Order>){
    try{
      const userRef = doc(this.firestore, `${this.USERS_COLLECTION}/${uid}`);
      await setDoc(userRef, {orderList: orderList}, {merge: true});
    }catch (error) {
      console.error('Error updating order list:', error);
      throw error;
    }
  }

  // Update user cart list in Firestore
  async updateCartList(uid: string, cartList: Array<Product>){
    try{
      const userRef = doc(this.firestore, `${this.USERS_COLLECTION}/${uid}`);
      await setDoc(userRef, {cartList: cartList}, {merge: true});
    }catch (error) {
      console.error('Error updating cart list', error)
    }
  }

  // Empty user cart list in Firestore
  async emptyCartList(uid: string){
    try{
      const userRef = doc(this.firestore, `${this.USERS_COLLECTION}/${uid}`);
      await setDoc(userRef, {cartList: []}, {merge: true});
    }catch (error) {
      console.error('Error emptying cart list', error)
    }
  }

  // Update user favorites list in Firestore
  async updateFavoritesList(uid: string, favoritesList: Array<Product>){
    try{
      const userRef = doc(this.firestore, `${this.USERS_COLLECTION}/${uid}`);
      await setDoc(userRef, {favoritesList: favoritesList}, {merge: true});
    } catch (error) {
      console.error('Error updating favorites list', error);
    }
  }

}
