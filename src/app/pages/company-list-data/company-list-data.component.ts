import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
@Component({
  selector: 'app-company-list-data',
  standalone:true,
  imports: [CommonModule,RouterLink],
  templateUrl: './company-list-data.component.html',
  styleUrl: './company-list-data.component.css'
})
export class CompanyListDataComponent implements OnInit {
  companyData: any = []

  constructor(private router:Router){}

 

  ngOnInit(): void {
      const localData = localStorage.getItem('companyData')
      if(localData){
        this.companyData = JSON.parse(localData)
        console.log(this.companyData)
      }
      
  }

  getCompanyDataIndex(index: number):any{
    let dataindex = this.companyData[index]
    console.log(dataindex)

    this.router.navigate(['/dynamic-form'], { queryParams: { index: index } });

  }


  deleteCompanyData(i:number):void{
    alert('are surre to deleye')
    
    // if(localData){
    //   this.companyData = JSON.parse(localData)
    //   console.log(this.companyData)

    //   S
    // }

    
  }

  clearData():void{
    let deleteData = confirm('are you sure to delete all data?')
    if(deleteData){
      localStorage.removeItem('companyData')
      this.companyData
      return;
    }
  
  }

}
