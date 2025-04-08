import {Component, inject} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {FirebaseService} from "../../services/firebase-service/firebase.service";
import {CommonModule} from "@angular/common";
import {AuthService} from "../../services/auth/auth.service";
import {operatingError} from "../../services/auth/authErrors";
import {Product} from "../../models/Product";
import {Order} from "../../models/Order";
import {TranslocoModule} from "@ngneat/transloco";
import {IonicModule} from "@ionic/angular";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  imports: [TranslocoModule, CommonModule, ReactiveFormsModule, IonicModule],
  standalone: true,
})
export class RegisterComponent{
  // Services
  private firebaseService: FirebaseService = inject(FirebaseService);
  private authService: AuthService = inject(AuthService);

  // Variables
  showSuccessAlert: boolean = false;
  showErrorAlert: boolean = false;
  alertMessage: string = '';
  formulario: FormGroup;
  constructor(private form: FormBuilder, private router: Router) {
    this.formulario = this.form.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    })
  }

  // Check form errors
  hasErrors(controlName: string, errorName: string): boolean | undefined {
    return this.formulario.get(controlName)?.hasError(errorName) && this.formulario.get(controlName)?.touched
  }

  // Register form: Send form button
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
      const orderList: Array<Order> = [];
      const cartList: Array<Product> = [];
      const favoritesList: Array<Product> = [];

      const userCredential = await this.authService.signup(email, password);
      const uid = userCredential.user?.uid;

      if (uid) {
        await this.firebaseService.saveUserData(uid, { firstName, lastName, email, orderList, cartList, favoritesList });
        console.log("Usuario registrado con éxito");
        this.alertMessage = 'Return to the login screen to log in with the new account.';
        this.showSuccessAlert = true;
      }
    } catch (error) {
      this.alertMessage = operatingError(error);
      this.showErrorAlert = true;
    }
  }

  // Navigate to login compoment
  navigateToLogin = () => {
    this.router.navigate(['/login']);
  };

}
