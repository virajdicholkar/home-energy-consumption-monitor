import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, Routes } from '@angular/router';
import { DevicesComponent } from './devices/devices.component';
import { DeviceFormComponent } from './device-form/device-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'list',
    pathMatch: 'full'
  },
  {
    path: 'list',
    component: DevicesComponent
  },
  {
    path: 'add',
    component: DeviceFormComponent
  }
]

@NgModule({
  declarations: [
    DevicesComponent,
    DeviceFormComponent,
    
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule
  ]
})
export class DevicesModule { }
