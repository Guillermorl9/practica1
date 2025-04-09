import { Injectable, inject } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  User,
  onAuthStateChanged,
  sendPasswordResetEmail
} from '@angular/fire/auth';
import {BehaviorSubject} from 'rxjs';
import { FirebaseService } from '../firebase-service/firebase.service';
import { User as AppUser } from '../../models/User';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private auth: Auth = inject(Auth);
  private firebaseService = inject(FirebaseService);
  private authState = new BehaviorSubject<User | null>(null);
  private appUser = new BehaviorSubject<AppUser | null>(null);
  userData = this.appUser.asObservable();

  constructor() {
    onAuthStateChanged(this.auth, async (user) => {
      this.authState.next(user);
      if (user) {
        const userData = await this.firebaseService.getUserData(user.uid);
        this.appUser.next(userData);
      } else {
        this.appUser.next(null);
      }
    });
  }

  // Get user first name
  getFirstName(): string{
    if(!this.appUser.value?.firstName){
      return '';
    }
    return this.appUser.value?.firstName;
  }

  // Get user uid from Firebase
  getUid(): string {
    if(!this.authState.value?.uid){
      return '';
    }
    return this.authState.value?.uid;
  }

  // Sign up user
  signup(email: string, password: string) {
    return createUserWithEmailAndPassword(this.auth, email, password);
  }

  // Log in user
  login(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  // Log out user
  logout() {
    return signOut(this.auth);
  }

  // Check if user is logged in
  isLoggedIn() {
    return this.authState.asObservable();
  }

  // Send password reset email
  sendPasswordReset(email: string) {
    return sendPasswordResetEmail(this.auth, email);
  }
}
