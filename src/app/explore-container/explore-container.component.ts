import { Component, Input } from '@angular/core';
import {ReactiveFormsModule, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {IonicModule} from "@ionic/angular";
import {NgIf} from "@angular/common";


@Component({
  selector: 'app-explore-container',
  templateUrl: './explore-container.component.html',
  styleUrls: ['./explore-container.component.scss'],
  imports: [ReactiveFormsModule, IonicModule, NgIf]
})
export class ExploreContainerComponent {
  formulario: FormGroup;
  private phonePattern: RegExp = /^[0-9]{9}$/;
  showAlert: boolean = false;

  constructor(private form: FormBuilder) {
    this.formulario = this.form.group({
      nombre: ['', [Validators.required]],
      apellidos: ['', [Validators.required]],
      telefono: ['', [Validators.required, Validators.pattern(this.phonePattern)]],
      email: ['', [Validators.required, Validators.email]],
    })
  }

  hasErrors(controlName: string, errorName: string): boolean | undefined {
    return this.formulario.get(controlName)?.hasError(errorName) && this.formulario.get(controlName)?.touched
  }

  enviar(): void {
    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      console.log("El formulario contiene errores. Corrige los campos para continuar.");
      return;
    }
    console.log(`Nombre: ${this.formulario.value['nombre']}`);
    console.log(`Apellidos: ${this.formulario.value['apellidos']}`);
    console.log(`Teléfono: ${this.formulario.value['telefono']}`);
    console.log(`Email: ${this.formulario.value['email']}`);
    this.showAlert = true;
  }
}
