import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Pages
import { PagesComponent } from './pages.component';
import { AdminComponent } from './admin/admin.component';
import { PagesRoutingModule } from './pages-routing.module';
import { AppMaterialModule } from '../app-material.module';
import { ComponentsModule } from '../components/components.module';

@NgModule({
  declarations: [PagesComponent, AdminComponent],
  imports: [
    CommonModule,
    PagesRoutingModule,
    AppMaterialModule,
    ComponentsModule,
  ],
})
export class PagesModule {}
