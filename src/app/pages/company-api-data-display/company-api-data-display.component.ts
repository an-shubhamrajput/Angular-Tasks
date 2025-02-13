import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CompanyService } from '../../services/company.service'; 
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-company-api-data-display',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './company-api-data-display.component.html',
  styleUrl: './company-api-data-display.component.css'
})
export class CompanyApiDataDisplayComponent implements OnInit {
  companyData: any[] = [];

  constructor(private router: Router, private companyService: CompanyService) {}

  ngOnInit(): void {
    this.fetchCompanyData();
  }

  fetchCompanyData(): void {
    this.companyService.getCompanies().subscribe({
      next: (data) => {
        this.companyData = data;
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
          alert('Company deleted successfully');
          this.fetchCompanyData(); 
        },
        error: (err) => console.error('Error deleting company:', err),
      });
    }
  }

  clearData(): void {
    const confirmClear = confirm('Are you sure you want to delete all data?');
    if (confirmClear) {
      this.companyData.forEach((company) => {
        this.companyService.deleteCompany(company.id).subscribe();
      });
      this.companyData = [];
    }
  }
}
