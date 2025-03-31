import { Component } from '@angular/core';
import {ReactiveFormsModule, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {IonicModule} from "@ionic/angular";
import {NgIf} from "@angular/common";
import {mail, call, person, people} from 'ionicons/icons';
import {addIcons} from "ionicons";
import {TranslocoModule} from "@ngneat/transloco";


@Component({
  selector: 'app-explore-container',
  templateUrl: './explore-container.component.html',
  styleUrls: ['./explore-container.component.scss'],
  imports: [ReactiveFormsModule, TranslocoModule, IonicModule, NgIf]
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
    addIcons({mail, call, person, people})
  }

  hasErrors(controlName: string, errorName: string): boolean | undefined {
    return this.formulario.get(controlName)?.hasError(errorName) && this.formulario.get(controlName)?.touched
  }

  enviar(): void {
    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      return;
    }
    this.showAlert = true;
  }
}
