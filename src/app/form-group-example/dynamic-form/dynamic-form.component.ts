import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dynamic-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './dynamic-form.component.html',
  styleUrl: './dynamic-form.component.css'
})
export class DynamicFormComponent {
  companyData: FormGroup;

  constructor(private fb: FormBuilder) {
    this.companyData = this.fb.group({
      companyName: ['', Validators.required],
      address: this.fb.group({
        country: [''],
        city: [''],
        zip: ['']
      }),
    });
  }

  resetForm() {
    this.companyData.reset();
  }

  onSubmit() {
    if (this.companyData.valid) {
      alert('Form Submitted Successfully!');
      console.log(this.companyData.value);
    }
  }
}
