import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  private baseUrl = 'http://localhost/php-rest-api/index.php';
  private addCompanyUrl = 'http://localhost/php-rest-api/api/company/create.php'
  private deleteCompanyUrl = 'http://localhost/php-rest-api/api/company/delete.php'
  private getCompanyIdUrl ='http://localhost/php-rest-api/api/company/read.php'
  private getAllCompanyUrl = 'http://localhost/php-rest-api/api/company/read.php'
  private updateCompanyUrl = 'http://localhost/php-rest-api/index.php'

  constructor(private http: HttpClient) {}

  getCompanies(): Observable<any> {
    return this.http.get(`${this.getAllCompanyUrl}`);
  }

  getCompanyById(id: number): Observable<any> {
    return this.http.get(`${this.getCompanyIdUrl}?id=${id}`);
  }

  addCompany(companyData: any): Observable<any> {
    return this.http.post(`${this.addCompanyUrl}`, companyData);
  }

  updateCompany(id: number, companyData: any): Observable<any> {
    return this.http.put(`${this.updateCompanyUrl}?id=${id}`, companyData);
  }

  deleteCompany(id: number): Observable<any> {
    return this.http.delete(`${this.deleteCompanyUrl}?id=${id}`);
  }
}


// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import Company from '../model/Company.Interfcae';
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

//   getCompanies(): Observable<Company> {
//     return this.http.get<Company>(`${this.getAllCompanyUrl}`);
//   }

//   getCompanyById(id: number): Observable<Company> {
//     return this.http.get<Company>(`${this.getCompanyIdUrl}?id=${id}`);
//   }

//   addCompany(companyData: Company): Observable<Company> {
//     return this.http.post<Company>(`${this.addCompanyUrl}`, companyData);
//   }

//   updateCompany(id: number, companyData:Company ): Observable<Company> {
//     return this.http.put<Company>(`${this.updateCompanyUrl}?id=${id}`, companyData);
//   }

//   deleteCompany(id: number): Observable<void> {
//     return this.http.delete<void>(`${this.deleteCompanyUrl}?id=${id}`);
//   }
// }
