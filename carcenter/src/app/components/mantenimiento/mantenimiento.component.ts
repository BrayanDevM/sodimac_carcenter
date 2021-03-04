import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  FormGroupDirective,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Cliente, ClientesService } from 'src/app/services/clientes.service';
import { EmpleadosService } from 'src/app/services/empleados.service';
import { FacturasService } from 'src/app/services/facturas.service';
import { MantenimientosService } from 'src/app/services/mantenimientos.service';
import { RepuestosService } from 'src/app/services/repuestos.service';
import { SolicitudesService } from 'src/app/services/solicitudes.service';

@Component({
  selector: 'app-mantenimiento',
  templateUrl: './mantenimiento.component.html',
  styleUrls: ['./mantenimiento.component.css'],
})
export class MantenimientoComponent implements OnInit {
  cliente: Cliente;
  solicitudesIncompletas: any[] = [];
  solicitudesCompletas: any[] = [];
  repuestos: any[] = [];
  manteminientos: any[] = [];
  empleados: any[] = [];

  facturaCalculada = false;

  formFactura: FormGroup;
  @ViewChild(FormGroupDirective) formGroupDirective!: FormGroupDirective;

  constructor(
    private fb: FormBuilder,
    private clientes$: ClientesService,
    private solicitudes$: SolicitudesService,
    private repuestos$: RepuestosService,
    private mantenim$: MantenimientosService,
    private empleados$: EmpleadosService,
    private facturas$: FacturasService,
    private _snackBar: MatSnackBar
  ) {
    this.cliente = this.clientes$.cliente;
    this.formFactura = this.fb.group({
      ID_VEHICULO: [null],
      ID_EMPLEADO: [null, Validators.required],
      MANTENIMIENTOS: this.fb.array([
        this.fb.control(null, Validators.required),
      ]),
      REPUESTOS: this.fb.array([this.fb.control(null, Validators.required)]),
      COSTO_TOTAL: [0],
      IVA: [0],
      DESCUENTO: [0],
      TOTAL: [0],
      UTILIDAD: [0],
      ID_TIENDA: [null],
    });
  }

  get mantenimientosForm() {
    return this.formFactura.get('MANTENIMIENTOS') as FormArray;
  }
  get repuestosForm() {
    return this.formFactura.get('REPUESTOS') as FormArray;
  }

  agregarMantenimiento(agregar = true) {
    if (!agregar && this.mantenimientosForm.length === 1) {
      return;
    } else if (agregar && this.mantenimientosForm.length === 9) {
      return;
    }
    agregar
      ? this.mantenimientosForm.push(this.fb.control(null, Validators.required))
      : this.mantenimientosForm.removeAt(this.mantenimientosForm.length - 1);
  }

  agregarRepuesto(agregar = true) {
    if (!agregar && this.repuestosForm.length === 1) {
      return;
    } else if (agregar && this.repuestosForm.length === 9) {
      return;
    }
    agregar
      ? this.repuestosForm.push(this.fb.control(null, Validators.required))
      : this.repuestosForm.removeAt(this.repuestosForm.length - 1);
  }

  ngOnInit(): void {
    this.obtenerSolicitudes();
    this.obtenerRepuestos();
    this.obtenerMantenimientos();
    this.obtenerEmpleados();
  }

  obtenerSolicitudes() {
    this.solicitudes$
      .obtenerSolicitudes(undefined)
      .subscribe((solicitudes: any[]) => {
        // SOLICITUDES INCOMPLETAS
        this.solicitudesIncompletas = solicitudes.filter(
          (solicitud) => solicitud.ESTADO === 'INCOMPLETA'
        );
        // console.log(this.solicitudesIncompletas, 'solicitudes inco');
        // SOLICITUDES COMPLETADAS
        this.solicitudesCompletas = solicitudes.filter(
          (solicitud) => solicitud.ESTADO === 'COMPLETADA'
        );
        //console.log(this.solicitudesCompletas, 'solicitudes comp');
      });
  }

  obtenerRepuestos() {
    this.repuestos$.obtenerRepuestos().subscribe((repuestos: any[]) => {
      // console.log(repuestos, 'repuestos');
      this.repuestos = repuestos;
    });
  }

  obtenerMantenimientos() {
    this.mantenim$
      .obtenerMantenimientos()
      .subscribe((mantenimientos: any[]) => {
        //console.log(mantenimientos, 'this.manteminientos');
        this.manteminientos = mantenimientos;
      });
  }

  obtenerEmpleados() {
    this.empleados$.obtenerEmpleados().subscribe((empleados) => {
      //console.log(empleados, 'empleados');
      this.empleados = empleados;
    });
  }

  calcularFactura() {
    let totalMantenimientos = 0;
    this.formFactura.value.MANTENIMIENTOS.forEach((id: number) => {
      let mantenimiento = this.manteminientos.find(
        (mantenimiento) => mantenimiento.ID_MANTENIMIENTO === id
      );
      totalMantenimientos += mantenimiento.PRECIO;
    });

    let totalRepuestos = 0;
    this.formFactura.value.REPUESTOS.forEach((id: number) => {
      let repuesto = this.repuestos.find(
        (repuesto) => repuesto.ID_REPUESTO === id
      );
      totalRepuestos += repuesto.PRECIO;
    });
    // console.log(costoTotal, 'costo total');
    totalRepuestos > 3000000
      ? (totalMantenimientos = totalMantenimientos / 2)
      : null;

    this.facturaCalculada = true;
    this.formFactura.patchValue({
      DESCUENTO: totalRepuestos > 3000000 ? totalMantenimientos / 2 : 0,
      COSTO_TOTAL: totalRepuestos + totalMantenimientos,
      IVA: (totalRepuestos + totalMantenimientos) * 0.19,
      TOTAL:
        totalRepuestos +
        totalMantenimientos -
        (totalRepuestos > 3000000 ? totalMantenimientos / 2 : 0),
    });
    //console.log(this.formFactura.value, 'form');
  }

  crearFactura(id_vehiculo: number, id_tienda: number, solicitud: any) {
    let formValues = this.formFactura.value;
    const factura: any = {
      ID_VEHICULO: id_vehiculo,
      ID_EMPLEADO: formValues.ID_EMPLEADO,
      TOTAL: formValues.TOTAL,
      UTILIDAD: 0,
      ID_TIENDA: id_tienda,
      ID_SOLICITUD: solicitud.ID_SOLICITUD,
    };
    for (let i in formValues.MANTENIMIENTOS) {
      let indiceMas1 = Number.parseInt(i) + 1;
      // console.log(formValues.MANTENIMIENTOS);
      factura[`MANTENIMIENTO_${indiceMas1}`] = formValues.MANTENIMIENTOS[i];
    }
    for (let i in formValues.REPUESTOS) {
      let indiceMas1 = Number.parseInt(i) + 1;
      // console.log(formValues.REPUESTOS);
      factura[`REPUESTO_${indiceMas1}`] = formValues.REPUESTOS[i];
    }

    console.log(factura, 'factura a guardar');
    this.facturas$.crearFactura(factura).subscribe((resp) => {
      //console.log(resp, 'factura creada');
      solicitud.ESTADO = 'COMPLETADA';
      this.solicitudes$.actualizarSolicitud(solicitud).subscribe((resp) => {
        //console.log(resp, 'solicitud actualizada');
        this.facturaCalculada = false;
        this.formGroupDirective.resetForm();
        this.obtenerSolicitudes();
        this._snackBar.open('Factura creada correctamente', undefined, {
          duration: 4000,
        });
      });
    });
  }
}
