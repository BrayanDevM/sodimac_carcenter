import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FacturasService {
  facturas: any[] = [];
  REST: string = 'http://localhost:8081/facturas';
  constructor(private http: HttpClient) {}

  obtenerFacturas(id_ciente: number | undefined) {
    if (id_ciente) {
      return this.http.get(this.REST + `?id_cliente=${id_ciente}`).pipe(
        map((resp: any) => {
          return resp.facturas;
        }),
        catchError((err) => {
          return throwError(err);
        })
      );
    } else {
      return this.http.get(this.REST).pipe(
        map((resp: any) => {
          return resp.facturas;
        }),
        catchError((err) => {
          return throwError(err);
        })
      );
    }
  }

  crearFactura(factura: any) {
    return this.http.post(this.REST, factura);
  }
}
