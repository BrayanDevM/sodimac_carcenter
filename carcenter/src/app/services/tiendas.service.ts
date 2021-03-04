import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TiendasService {
  tiendas: Tienda[] = [];
  REST: string = 'http://localhost:8081/tiendas';

  constructor(private http: HttpClient) {}

  obtenerTiendas() {
    return this.http.get(this.REST).pipe(
      map((resp: any) => {
        return resp.tiendas;
      }),
      catchError((err) => {
        return throwError(err);
      })
    );
  }
}

export interface Tienda {
  ID_TIENDA?: number;
  NOMBRE: string;
  DIRECCION: string;
  ESTADO: string;
  CREADO_EL: any;
}
