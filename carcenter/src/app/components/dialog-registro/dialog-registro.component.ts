import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Tienda, TiendasService } from 'src/app/services/tiendas.service';

@Component({
  selector: 'app-dialog-registro',
  templateUrl: './dialog-registro.component.html',
  styleUrls: ['./dialog-registro.component.css'],
})
export class DialogRegistroComponent implements OnInit {
  formRegistro: FormGroup;
  tiendas: Tienda[] = [];

  constructor(private fb: FormBuilder, private tiendas$: TiendasService) {
    this.formRegistro = this.fb.group({
      NOMBRE_1: [null, Validators.required],
      NOMBRE_2: [null],
      APELLIDO_1: [null, Validators.required],
      APELLIDO_2: [null],
      TIPO_DOC: [null, Validators.required],
      DOCUMENTO: [null, Validators.required],
      CELULAR: [null, Validators.required],
      DIRECCION: [null, Validators.required],
      CORREO: [null, Validators.required],
      ID_TIENDA: [null, Validators.required],
    });
  }

  obtenerTiendas() {
    this.tiendas$.obtenerTiendas().subscribe((tiendas) => {
      // console.log(tiendas, 'resp tiendas');
      this.tiendas = tiendas;
    });
  }

  ngOnInit(): void {
    this.obtenerTiendas();
  }

  registrar() {
    console.log(this.formRegistro.value);
  }
}
