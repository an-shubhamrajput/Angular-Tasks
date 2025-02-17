import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { FormGroupPageComponent } from './form-group-example/form-group-page/form-group-page.component';
import { FormBuilderPageComponent } from './form-group-example/form-builder-page/form-builder-page.component';

import { DynamicFormComponent } from './form-group-example/dynamic-form/dynamic-form.component';
import { CompanyListDataComponent } from './pages/company-list-data/company-list-data.component';
import { DynamicFormAPIComponent } from './pages/dynamic-form-api/dynamic-form-api.component';

import { CompanyApiDataDisplayComponent } from './pages/company-api-data-display/company-api-data-display.component';
export const routes: Routes = [
    {path:'',redirectTo:'/form-group',pathMatch:'full'},
    { 
        path: 'form-group',
        loadComponent:() => import('./../app/form-group-example/form-group-page/form-group-page.component').then((c) => c.FormGroupPageComponent)
    },
    { 
        path: 'form-builder',
        loadComponent:() => import('./../app/form-group-example/form-builder-page/form-builder-page.component').then((c)=>c.FormBuilderPageComponent)
     },
    {
        path:'dynamic-form', 
        loadComponent:() => import('./../app/form-group-example/dynamic-form/dynamic-form.component').then((c) =>c.DynamicFormComponent)
        // component:DynamicFormComponent
    },
    {
        path:'company-data',
        loadComponent:() => import('./../app/pages/company-list-data/company-list-data.component').then((c)=>c.CompanyListDataComponent)
        // component:CompanyListDataComponent
    },


    // routes for dynmaic form data send through HTTPClient 
    {
        path:'dynamic-api',
        loadComponent:() => import('./../app/pages/dynamic-form-api/dynamic-form-api.component').then((c)=>c.DynamicFormAPIComponent)
    },
    {
        path:'api-companyData',
        loadComponent: () => import('./../app/pages/company-api-data-display/company-api-data-display.component').then((c)=>c.CompanyApiDataDisplayComponent)
       
    },

    {
        path:'**',
        loadComponent:() => import('./../app/pages/not-found/not-found.component').then((c)=> c.NotFoundComponent )
    }

];

