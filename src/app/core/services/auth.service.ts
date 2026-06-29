import { Injectable } from '@angular/core';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  User,
   onAuthStateChanged
} from 'firebase/auth';
import { FirebaseService } from './firebase.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private firebase: FirebaseService) {}

  register(email: string, password: string) {
    return createUserWithEmailAndPassword(
      this.firebase.auth,
      email,
      password
    );
  }

  login(email: string, password: string) {
    return signInWithEmailAndPassword(
      this.firebase.auth,
      email,
      password
    );
  }

  logout() {
    return signOut(this.firebase.auth);
  }

  getCurrentUser(): User | null {
    return this.firebase.auth.currentUser;
  }
  getCurrentUserAsync(): Promise<User | null> {

  return new Promise((resolve) => {

    const unsubscribe = onAuthStateChanged(this.firebase.auth, (user) => {

      unsubscribe();

      resolve(user);

    });

  });

}
}