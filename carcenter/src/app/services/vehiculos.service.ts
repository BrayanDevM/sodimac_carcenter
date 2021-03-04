import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class VehiculosService {
  vehiculos: Vehiculo[] = [];
  REST: string = 'http://localhost:8081/vehiculos';

  constructor(private http: HttpClient) {}

  obtenerVehiculos(clienteId: number | undefined) {
    return this.http.get(this.REST + `?cliente_id=${clienteId}`).pipe(
      map((resp: any) => {
        return resp.vehiculos;
      }),
      catchError((err) => {
        return throwError(err);
      })
    );
  }

  crearVehiculo(vehiculo: Vehiculo) {
    return this.http.post(this.REST, vehiculo);
  }
}

export interface Vehiculo {
  ID_VEHICULO?: number;
  MARCA: string;
  MODELO: string;
  MODELO_FECHA: string;
  PLACA: any;
  COLOR: any;
  CREADO_EL: any;
  ID_CLIENTE: any;
}
