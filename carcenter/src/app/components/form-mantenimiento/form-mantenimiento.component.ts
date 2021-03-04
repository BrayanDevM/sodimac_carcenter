import {
  Component,
  OnInit,
  ViewChild,
  Output,
  EventEmitter,
  Input,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormGroupDirective,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ClientesService } from 'src/app/services/clientes.service';
import {
  Solicitud,
  SolicitudesService,
} from 'src/app/services/solicitudes.service';
import { Vehiculo, VehiculosService } from 'src/app/services/vehiculos.service';

@Component({
  selector: 'app-form-mantenimiento',
  templateUrl: './form-mantenimiento.component.html',
  styleUrls: ['./form-mantenimiento.component.css'],
})
export class FormMantenimientoComponent implements OnInit {
  id_cliente: number | undefined;
  solicitudes: any[] = [];
  @Input('vehiculos') vehiculos: Vehiculo[] = [];
  formSolicitud: FormGroup;

  @ViewChild(FormGroupDirective) formGroupDirective!: FormGroupDirective;

  constructor(
    private fb: FormBuilder,
    private cliente$: ClientesService,
    private solicitudes$: SolicitudesService,
    private _snackbar: MatSnackBar
  ) {
    this.id_cliente = this.cliente$.cliente.ID_CLIENTE;
    this.formSolicitud = this.fb.group({
      DESCRIPCION: [null, Validators.required],
      ID_VEHICULO: [null, Validators.required],
    });
  }

  ngOnInit(): void {
    this.obtenerSolicitudes();
  }

  obtenerSolicitudes() {
    this.solicitudes$
      .obtenerSolicitudes(this.id_cliente)
      .subscribe((solicitudes: any[]) => {
        this.solicitudes = solicitudes.filter(
          (solicitud) => solicitud.ID_SOLICITUD > 0
        );
      });
  }

  registrarVehiculo() {
    console.log(this.formSolicitud.value);
    this.solicitudes$
      .crearSolicitud(this.formSolicitud.value)
      .subscribe((resp) => {
        this.obtenerSolicitudes();
        this._snackbar.open('Solicitud registrado', undefined, {
          duration: 4000,
        });
        this.formGroupDirective.resetForm();
      });
  }
}
