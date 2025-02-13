import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CompanyService } from '../../services/company.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dynamic-form-api',
  standalone: true,
  imports: [ReactiveFormsModule,RouterLink, CommonModule],
  templateUrl: './dynamic-form-api.component.html',
  styleUrls: ['./dynamic-form-api.component.css']
})
export class DynamicFormAPIComponent implements OnInit {
  companyData!: FormGroup;
  companyId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private companyService: CompanyService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.companyData = this.fb.group({
      companyName: ['', Validators.required],
      address: this.fb.group({
        country: [''],
        city: [''],
        street: [''],
        zip: ['']
      }),
      units: this.fb.array([]),
      total: [0]
    });
    this.addUnit()
  }
  

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params['id']) {
        this.companyId = +params['id'];
        this.fetchCompanyData();
      }
    });
  }
  

  get units(): FormArray {
    return this.companyData.get('units') as FormArray;
  }

  addUnit(): void {
    this.units.push(this.fb.group({
      unitName: ['', Validators.required],
      quantity: [1, [Validators.required, Validators.min(1)]],
      unitPrice: [0, [Validators.required, Validators.min(1)]]
    }));
  }

  removeUnit(index: number): void {
    this.units.removeAt(index);
    this.updateTotalPrice();
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

  updateTotalPrice(): void {
    this.companyData.get('total')?.setValue(this.totalPrice());
  }

  fetchCompanyData(): void {
    if (this.companyId !== null) {
      this.companyService.getCompanyById(this.companyId).subscribe((company: any) => {
        console.log('Fetched Company Data:', company);
  
        if (!company) {
          console.error('Company not found!');
          return;
        }
  
        this.companyData.patchValue({
          companyName: company.companyName
           || '',
          address: {
            country: company.address?.country || '',
            city: company.address?.city || '',
            street: company.address?.street || '',
            zip: company.address?.zip || ''
          },
          total: company.total || 0
        });
  
        this.units.clear();
        if (Array.isArray(company.units)) {
          company.units.forEach((unit: any) => {
            this.units.push(this.fb.group({
              unitName: [unit.unit_name || '', Validators.required],
              quantity: [unit.quantity || 1, [Validators.required, Validators.min(1)]],
              unitPrice: [unit.unit_price || 0, [Validators.required, Validators.min(1)]]
            }));
          });
        }
      }, error => {
        console.error('Error fetching company data:', error);
      });
    }
  }
  
  
  onSubmit(): void {
    if (this.companyData.invalid) {
      return;
    }
    const formData = this.companyData.getRawValue();

    if (this.companyId !== null) {
      this.companyService.updateCompany(this.companyId, formData).subscribe(response => {
        alert('Company Updated Successfully');
        console.log('Company Updated:', response);
        this.router.navigate(['/api-companyData']); 
      });
    } else {
      console.log(formData)
      this.companyService.addCompany(formData).subscribe(response => {
        alert('Company Added Successfully');
        console.log('Company Added:', response)
        this.companyData.reset()
      });
    }
  }
}
