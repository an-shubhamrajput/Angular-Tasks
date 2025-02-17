import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CompanyService } from '../../services/company.service'; 
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-company-api-data-display',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './company-api-data-display.component.html',
  styleUrl: './company-api-data-display.component.css'
})
export class CompanyApiDataDisplayComponent implements OnInit {
  companyData: any[] = [];

  constructor(private router: Router, private companyService: CompanyService,  private toastr: ToastrService) {}

  ngOnInit(): void {
    this.fetchCompanyData();
  }

  fetchCompanyData(): void {
    this.companyService.getCompanies().subscribe({
      next: (data) => {
        this.companyData = data;
        this.toastr.success('Company data loaded Successfully', 'data fetched');

        console.log('Fetched Company Data:', this.companyData);
      },
      error: (err) => console.error('Error fetching data:', err),
    });
  }

  getCompanyDataIndex(id: number): void {
    this.router.navigate(['/dynamic-api'], { queryParams: { id: id } });
  }
  

  deleteCompanyData(id: number): void {
    const confirmDelete = confirm('Are you sure you want to delete this company?');
    if (confirmDelete) {
      this.companyService.deleteCompany(id).subscribe({
        next: () => {
          this.toastr.success('Company data deleted Successfully', 'Delete Successfully');
          this.fetchCompanyData(); 
        },
        error: (err) =>{
          this.toastr.error(err.message, 'error while deleting');
        } 
      });
    }
  }

  clearData(): void {
    const confirmClear = confirm('Are you sure you want to delete all data?');
    if (confirmClear) {
      this.companyData.forEach((company) => {
        
        this.companyService.deleteCompany(company.id).subscribe(()=>{
          this.toastr.success('all Company data deleted', 'all Data Deleted Successfully');
        },
        err=>{
          this.toastr.error(err.message);

        });
        
      });
      
      this.companyData = [];
    }
  }
}
