import { Component, OnInit } from '@angular/core';
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
import {ReactiveFormsModule, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth/auth.service";
import {operatingError} from "../../services/auth/authErrors";
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [IonContent, IonAlert, IonText, IonList, IonItem, IonInput, IonIcon, IonButton, CommonModule, ReactiveFormsModule, IonTitle]
})
export class LoginComponent{
  formulario: FormGroup;
  showErrorAlert: boolean = false;
  showSuccessAlert: boolean = false;
  alertMessage: string = '';
  constructor(private form: FormBuilder, private authService: AuthService, private router: Router) {
    this.formulario = this.form.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    })
  }

  hasErrors(controlName: string, errorName: string): boolean | undefined {
    return this.formulario.get(controlName)?.hasError(errorName) && this.formulario.get(controlName)?.touched
  }

  async loginUser(): Promise<void> {
    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      return;
    }
    try{
      const email: string = this.formulario.get('email')?.value;
      const password: string = this.formulario.get('password')?.value;
      const userCredential = await this.authService.login(email, password);
      const uid: string = userCredential.user?.uid;
      if (uid) {
            this.alertMessage = 'Welcome!';
            this.showSuccessAlert = true;
      }
  } catch (error) {
      this.alertMessage = operatingError(error);
      this.showErrorAlert = true;
    }
  }

  navigateToHome = () => {
    this.router.navigate(['/tabs/tab1']);
  }

}
