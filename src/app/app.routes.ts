import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { FormGroupPageComponent } from './form-group-example/form-group-page/form-group-page.component';
import { FormBuilderPageComponent } from './form-group-example/form-builder-page/form-builder-page.component';


export const routes: Routes = [
    {path:'',redirectTo:'/form-group',pathMatch:'full'},
    { path: 'form-group', component: FormGroupPageComponent },
    { path: 'form-builder', component: FormBuilderPageComponent },
];

