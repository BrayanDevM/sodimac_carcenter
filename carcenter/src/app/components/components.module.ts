import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppMaterialModule } from '../app-material.module';

// components
import { DialogRegistroComponent } from './dialog-registro/dialog-registro.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DialogClientesComponent } from './dialog-clientes/dialog-clientes.component';
import { RouterModule } from '@angular/router';
import { FormRegVehiculoComponent } from './form-reg-vehiculo/form-reg-vehiculo.component';
import { FormMantenimientoComponent } from './form-mantenimiento/form-mantenimiento.component';
import { MantenimientoComponent } from './mantenimiento/mantenimiento.component';
import { FacturasComponent } from './facturas/facturas.component';

const componentes = [
  DialogRegistroComponent,
  DialogClientesComponent,
  FormRegVehiculoComponent,
  FormMantenimientoComponent,
  MantenimientoComponent,
  FacturasComponent,
];

@NgModule({
  declarations: [...componentes],
  imports: [CommonModule, AppMaterialModule, ReactiveFormsModule, RouterModule],
  exports: [...componentes],
})
export class ComponentsModule {}
