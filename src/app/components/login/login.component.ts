import { Component, OnInit } from '@angular/core';
import {IonButton, IonContent, IonIcon, IonInput, IonItem, IonList, IonText} from "@ionic/angular/standalone";
import {ReactiveFormsModule, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [IonContent, IonText, IonList, IonItem, IonInput, IonIcon, IonButton, CommonModule, ReactiveFormsModule]
})
export class LoginComponent{
  formulario: FormGroup;
  constructor(private form: FormBuilder, private router: Router) {
    this.formulario = this.form.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    })
  }

  hasErrors(controlName: string, errorName: string): boolean | undefined {
    return this.formulario.get(controlName)?.hasError(errorName) && this.formulario.get(controlName)?.touched
  }

  enviar(): void {
    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      return;
    }
    this.router.navigate(['/tabs/tab1']);
  }

}
