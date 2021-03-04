import { Component, OnInit, ViewChild } from '@angular/core';
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
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css'],
})
export class ClienteComponent implements OnInit {
  id_cliente: number | undefined;
  vehiculos: Vehiculo[] = [];
  formVehiculo: FormGroup;

  @ViewChild(FormGroupDirective) formGroupDirective!: FormGroupDirective;

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

  ngOnInit(): void {
    this.obtenerVehiculos();
  }

  obtenerVehiculos() {
    this.vehiculos$
      .obtenerVehiculos(this.id_cliente)
      .subscribe((vehiculos: Vehiculo[]) => {
        this.vehiculos = vehiculos;
      });
  }

  registrarVehiculo() {
    console.log(this.formVehiculo.value);
    this.vehiculos$.crearVehiculo(this.formVehiculo.value).subscribe((resp) => {
      this._snackbar.open('Vehiculo registrado', undefined, {
        duration: 4000,
      });
      this.formGroupDirective.resetForm();
    });
  }

  cerrarSesion() {
    this.cliente$.cerrarSesion();
  }
}
