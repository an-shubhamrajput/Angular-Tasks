import { Component } from '@angular/core';
import { FormBuilder,FormGroup,Validators,FormArray,ReactiveFormsModule,} from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dynamic-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './dynamic-form.component.html',
  styleUrl: './dynamic-form.component.css',
})
export class DynamicFormComponent {
  companyData: FormGroup;
  formsData: any[] = [];
  company:any[] = []
  currentIndex: number | any = null;

  constructor(private fb: FormBuilder, private route: ActivatedRoute) {
    this.companyData = this.fb.group({
      companyName: ['', Validators.required],
      address: this.fb.group({
        country: [''],
        city: [''],
        street: [''],
        zip: [''],
      }),
      units: this.fb.array([]),
      total: [0],
    });
    this.addUnit(),
    this.getparamId();
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

  addUnit(): void {
    this.units.push(this.createUnit());
  }

  removeUnit(index: number): void {
    this.units.removeAt(index);
  }

  calculateTotal(index: number): number {
    const unit = this.units.at(index).value;
    return unit.quantity * unit.unitPrice;
  }

  totalPrice(): number {
    let totalAmount = 0;
    this.units.value.forEach((unit: any) => {
      totalAmount += unit.quantity * unit.unitPrice;
    });
    this.companyData.patchValue({ total: totalAmount });
    return totalAmount;
  }

  // get the company index from param and find out the company data in localstorage through params Index
  getparamId() {
    const id = this.route.snapshot.queryParamMap.get('index');
    console.log('params index', id);

    if (id) {
      this.currentIndex = id;
      this.setCompanyData();
    }
  }

  // daata from localStoragee to input fied controlss
  setCompanyData() {
    const storedData = localStorage.getItem('companyData');
    if (storedData) {
      this.formsData = JSON.parse(storedData);
      if (this.currentIndex !== null && this.formsData[this.currentIndex]) {
        let company = this.formsData[this.currentIndex];
  
        this.companyData.patchValue({
          companyName: company.companyName,
          address: {
            country: company.address.country,
            city: company.address.city,
            street: company.address?.street, // Optional chaining for missing value
            zip: company.address.zip,
          },
          total: company.total,
        });
        this.units.clear();
  
        for (const unit of company.units) {
          this.units.push(
            this.fb.group({
              unitName: [unit.unitName, Validators.required],
              quantity: [unit.quantity, [Validators.required, Validators.min(1)]],
              unitPrice: [unit.unitPrice, [Validators.required, Validators.min(0)]],
            })
          );
        }
        console.log(this.companyData.value);
      }
    }
  
  }

  // onSubmit() {
  //   if (this.companyData.valid) {
  //     alert('Form Submitted Successfully!');
  //     if (this.currentIndex !== null) {
  //       this.formsData[this.currentIndex] = this.companyData.value;
  //     } else {
  //       this.formsData.push(this.companyData.value);
  //     }
  //     localStorage.setItem('companyData', JSON.stringify(this.formsData));
  //     console.log('Updated LocalData:', this.formsData);

  //     this.resetForm();
  //   }
  // }

  onSubmit() {
    if (this.companyData.valid) {
      alert('Form Submitted Successfully!');

      const storedData = localStorage.getItem('companyData');
      let existingData = storedData ? JSON.parse(storedData) : [];

      // check updated data in companyData
      if (this.currentIndex !== null) {
        existingData[this.currentIndex] = this.companyData.value;
      } else {
        existingData.push(this.companyData.value);
      }

      localStorage.setItem('companyData', JSON.stringify(existingData));

      console.log('Updated LocalStorage Data:', existingData);
      this.resetForm();
    }
  }

  resetForm() {
    this.companyData.reset();
    this.units.clear();
    this.addUnit();
  }
}
