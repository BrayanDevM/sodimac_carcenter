import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ClientesService } from 'src/app/services/clientes.service';
import { VehiculosService } from 'src/app/services/vehiculos.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private cliente$: ClientesService,
    private vehiculos$: VehiculosService,
    private _snackbar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  cerrarSesion() {
    this.cliente$.cerrarSesion();
  }
}
