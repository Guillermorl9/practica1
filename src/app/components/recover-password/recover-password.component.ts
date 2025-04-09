import {Component, inject, OnInit} from '@angular/core';
import {IonicModule} from "@ionic/angular";
import {CommonModule} from "@angular/common";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth/auth.service";
import {TranslocoModule} from "@ngneat/transloco";

@Component({
  selector: 'app-recover-password',
  templateUrl: './recover-password.component.html',
  styleUrls: ['./recover-password.component.scss'],
  imports: [IonicModule, ReactiveFormsModule, CommonModule, TranslocoModule],
})
export class RecoverPasswordComponent  implements OnInit {
  // Services
  private authService: AuthService = inject(AuthService);

  // Variables
  formulario: FormGroup;
  showAlert: boolean = false;
  constructor(private form: FormBuilder, private router: Router) {
    this.formulario = this.form.group({
      email: ['', [Validators.required, Validators.email]],
    })
  }
  ngOnInit() {}

  // Check login form errors
  hasErrors(controlName: string, errorName: string): boolean | undefined {
    return this.formulario.get(controlName)?.hasError(errorName) && this.formulario.get(controlName)?.touched
  }

  send(): void {
    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      return;
    }
    try {
      const email: string = this.formulario.get('email')?.value;
      this.authService.sendPasswordReset(email);
      this.showAlert = true;
    } catch (error) {
      console.error('Error sending password reset email:', error);
    }
  }

  navigateToLogin = () => {
    this.router.navigate(['/login']);
  };
}
