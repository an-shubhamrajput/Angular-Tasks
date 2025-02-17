// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class CompanyService {
//   private baseUrl = 'http://localhost/php-rest-api/index.php';
//   private addCompanyUrl = 'http://localhost/php-rest-api/api/company/create.php'
//   private deleteCompanyUrl = 'http://localhost/php-rest-api/api/company/delete.php'
//   private getCompanyIdUrl ='http://localhost/php-rest-api/api/company/read.php'
//   private getAllCompanyUrl = 'http://localhost/php-rest-api/api/company/read.php'
//   private updateCompanyUrl = 'http://localhost/php-rest-api/index.php'

//   constructor(private http: HttpClient) {}

//   getCompanies(): Observable<any> {
//     return this.http.get(`${this.getAllCompanyUrl}`);
//   }

//   getCompanyById(id: number): Observable<any> {
//     return this.http.get(`${this.getCompanyIdUrl}?id=${id}`);
//   }

//   addCompany(companyData: any): Observable<any> {
//     return this.http.post(`${this.addCompanyUrl}`, companyData);
//   }

//   updateCompany(id: number, companyData: any): Observable<any> {
//     return this.http.put(`${this.updateCompanyUrl}?id=${id}`, companyData);
//   }

//   deleteCompany(id: number): Observable<any> {
//     return this.http.delete(`${this.deleteCompanyUrl}?id=${id}`);
//   }
// }

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import Company from '../model/Company.Interfcae';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  constructor(private http: HttpClient) {}

  getCompanies(): Observable<Company[]> {
    return this.http.get<Company[]>(environment.getAllCompanyUrl);
  }

  getCompanyById(id: number): Observable<Company> {
    return this.http.get<Company>(`${environment.getCompanyIdUrl}?id=${id}`);
  }

  addCompany(companyData: Company): Observable<Company> {
    return this.http.post<Company>(environment.addCompanyUrl, companyData);
  }

  updateCompany(id: number, companyData: Company): Observable<Company> {
    return this.http.put<Company>(`${environment.updateCompanyUrl}?id=${id}`, companyData);
  }

  deleteCompany(id: number): Observable<void> {
    return this.http.delete<void>(`${environment.deleteCompanyUrl}?id=${id}`);
  }
}
