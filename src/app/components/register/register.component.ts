import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {FirebaseService} from "../../services/firebase-service/firebase.service";
import {
  IonAlert,
  IonButton,
  IonContent,
  IonIcon,
  IonInput,
  IonItem,
  IonList,
  IonText,
  IonTitle
} from "@ionic/angular/standalone";
import {CommonModule} from "@angular/common";
import {AuthService} from "../../services/auth/auth.service";
import {operatingError} from "../../services/auth/authErrors";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  imports: [IonContent, IonAlert, IonText, IonList, IonItem, IonInput, IonButton, CommonModule, ReactiveFormsModule, IonTitle],
  standalone: true,
})
export class RegisterComponent{
  showSuccessAlert:boolean = false;
  showErrorAlert:boolean = false;
  alertMessage: string = '';
  formulario: FormGroup;
  constructor(
    private form: FormBuilder,
    private router: Router,
    private firebaseService: FirebaseService,
    private authService: AuthService,)
  {
    this.formulario = this.form.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    })
  }

  hasErrors(controlName: string, errorName: string): boolean | undefined {
    return this.formulario.get(controlName)?.hasError(errorName) && this.formulario.get(controlName)?.touched
  }

  async registerUser(): Promise<void> {
    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      return;
    }
    try {
      const firstName: string = this.formulario.get('firstName')?.value;
      const lastName: string = this.formulario.get('lastName')?.value;
      const email: string = this.formulario.get('email')?.value;
      const password: string = this.formulario.get('password')?.value;

      const userCredential = await this.authService.signup(email, password);
      const uid = userCredential.user?.uid;

      if (uid) {
        await this.firebaseService.saveUserData(uid, { firstName, lastName, email });
        console.log("Usuario registrado con éxito");
        this.alertMessage = 'Return to the login screen to log in with the new account.';
        this.showSuccessAlert = true;
      }
    } catch (error) {
      this.alertMessage = operatingError(error);
      this.showErrorAlert = true;
    }
  }

  navigateToLogin = () => {
    this.router.navigate(['/login']);
  };

}
