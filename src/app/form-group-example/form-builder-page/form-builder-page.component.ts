import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
  AbstractControl,
  FormBuilder,
} from '@angular/forms';

@Component({
  selector: 'app-form-builder-page',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './form-builder-page.component.html',
  styleUrls: ['./form-builder-page.component.css'],
})
export class FormBuilderPageComponent {
  formGroupData: FormGroup;

  constructor(private fb: FormBuilder) {
    this.formGroupData = this.fb.group({
        fullName: ['', Validators.required],
        username: ['', [Validators.required, Validators.minLength(6)]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(8)]],
        confirmPassword: ['', Validators.required],
        acceptTerms: [false, Validators.requiredTrue],
      },{ validators: this.passwordMatchValidator }
    );
  }

  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }

  resetForm() {
    this.formGroupData.reset();
  }

  onSubmit() {
    if (this.formGroupData.valid) {
      alert('Form Submitted Successfully!');
      console.log(this.formGroupData.value);
      console.log(this.formGroupData)
      this.formGroupData.reset();
    }
  }
}
