import { Component } from '@angular/core';
import { FormBuilder,FormGroup,ReactiveFormsModule,Validators} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormArray } from '@angular/forms';


@Component({
  selector: 'app-dynamic-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './dynamic-form.component.html',
  styleUrl: './dynamic-form.component.css',
})

export class DynamicFormComponent {
  companyData: FormGroup;

  constructor(private fb: FormBuilder) {
    this.companyData = this.fb.group({
      companyName: ['', Validators.required],
      address: this.fb.group({
        country: ['india'],
        city: [''],
        street: [''],
        zip: [''],
      }),
      units: this.fb.array([]),
    });
    this.addunit();
  }

  createUnit(): FormGroup {
    return this.fb.group({
      unitName: ['', Validators.required],
      quantity: [1, [Validators.required, Validators.min(1)]],
      unitPrice: [0, [Validators.required, Validators.min(0)]],
    });
  }

  get units(): FormArray {
    return this.companyData.get('units') as FormArray;
  }

  addunit(): void {
    // const newUnit = this.fb.control('');
    // console.log(this.units)
    this.units.push(this.createUnit());
  }

  addUnit(): void {
    this.units.push(this.createUnit());
  }

  removeUnit(index: number): void {
    this.units.removeAt(index);
  }

  calculateTotal(index: number): void | number {
    const unit = this.units.at(index).value;
    return unit.quantity * unit.unitPrice;
  }

  totalPrice() {
    const data = this.units.value;
    console.log(data);
    let totalAmount = 0;

    for (const val of data) {
      totalAmount += val.quantity * val.unitPrice;
    }

    console.log(totalAmount);
    return totalAmount;
  }

  resetForm() {
    this.companyData.reset();
  }

  onSubmit() {
    if (this.companyData.valid) {
      alert('Form Submitted Successfully!');
      console.log(this.companyData.value);
      this.totalPrice();

      this.resetForm();
    }
  }
}
