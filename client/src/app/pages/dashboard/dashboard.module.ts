import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefaultComponent } from './default/default.component';
import { RouterModule, Routes } from '@angular/router';
import { DevicesComponent } from './devices/devices.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'default',
    pathMatch: 'full'
  },
  {
    path: 'default',
    component: DefaultComponent
  },
  {
    path: 'devices',
    component: DevicesComponent
  }
]

@NgModule({
  declarations: [DefaultComponent, DevicesComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class DashboardModule { }
