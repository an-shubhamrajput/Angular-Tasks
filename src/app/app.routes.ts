import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { FormGroupPageComponent } from './form-group-example/form-group-page/form-group-page.component';
import { FormBuilderPageComponent } from './form-group-example/form-builder-page/form-builder-page.component';

import { DynamicFormComponent } from './form-group-example/dynamic-form/dynamic-form.component';
export const routes: Routes = [
    {path:'',redirectTo:'/form-group',pathMatch:'full'},
    { path: 'form-group', component: FormGroupPageComponent },
    { path: 'form-builder', component: FormBuilderPageComponent },
    {path:'dynamic-form', component:DynamicFormComponent}
];

