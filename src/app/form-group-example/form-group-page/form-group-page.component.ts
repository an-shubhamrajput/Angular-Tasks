import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, Validators, AbstractControl, ValidationErrors} from '@angular/forms';
@Component({
  selector: 'app-form-group-page',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './form-group-page.component.html',
  styleUrls: ['./form-group-page.component.css'],
})

export class FormGroupPageComponent {  
formGroupData = new FormGroup({
        fullName: new FormControl('', Validators.required),
        username: new FormControl('', [Validators.required, Validators.minLength(6)]),
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required, Validators.minLength(8)]),
        confirmPassword: new FormControl('', Validators.required),
        acceptTerms: new FormControl(false, Validators.requiredTrue),
      },{ validators: this.passwordMatchValidator })
  
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
      console.log(this.formGroupData);
      this.formGroupData.reset();
    }
  }
}
