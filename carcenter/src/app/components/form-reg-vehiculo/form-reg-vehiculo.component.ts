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
import { Vehiculo, VehiculosService } from 'src/app/services/vehiculos.service';

@Component({
  selector: 'app-form-reg-vehiculo',
  templateUrl: './form-reg-vehiculo.component.html',
  styleUrls: ['./form-reg-vehiculo.component.css'],
})
export class FormRegVehiculoComponent implements OnInit {
  id_cliente: number | undefined;
  @Input('vehiculos') vehiculos: Vehiculo[] = [];
  formVehiculo: FormGroup;

  @ViewChild(FormGroupDirective) formGroupDirective!: FormGroupDirective;
  @Output() vehiculoRegistrado: EventEmitter<boolean> = new EventEmitter();

  constructor(
    private fb: FormBuilder,
    private cliente$: ClientesService,
    private vehiculos$: VehiculosService,
    private _snackbar: MatSnackBar
  ) {
    this.id_cliente = this.cliente$.cliente.ID_CLIENTE;
    this.formVehiculo = this.fb.group({
      MARCA: [null, Validators.required],
      MODELO: [null, Validators.required],
      MODELO_FECHA: [null, Validators.required],
      PLACA: [null, Validators.required],
      COLOR: [null, Validators.required],
      ID_CLIENTE: this.id_cliente,
    });
  }

  ngOnInit(): void {}

  registrarVehiculo() {
    console.log(this.formVehiculo.value);
    this.vehiculos$.crearVehiculo(this.formVehiculo.value).subscribe((resp) => {
      this.vehiculoRegistrado.emit(true);
      this._snackbar.open('Vehiculo registrado', undefined, {
        duration: 4000,
      });
      this.formGroupDirective.resetForm();
    });
  }
}
