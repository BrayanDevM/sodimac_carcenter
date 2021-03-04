import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SolicitudesService {
  solicitud: Solicitud[] = [];
  REST: string = 'http://localhost:8081/solicitudes';

  constructor(private http: HttpClient) {}

  obtenerSolicitudes(clienteId: number | undefined) {
    if (clienteId) {
      return this.http.get(this.REST + `?cliente_id=${clienteId}`).pipe(
        map((resp: any) => {
          return resp.solicitudes;
        }),
        catchError((err) => {
          return throwError(err);
        })
      );
    } else {
      return this.http.get(this.REST).pipe(
        map((resp: any) => {
          return resp.solicitudes;
        }),
        catchError((err) => {
          return throwError(err);
        })
      );
    }
  }

  crearSolicitud(solicitud: Solicitud) {
    return this.http.post(this.REST, solicitud);
  }

  actualizarSolicitud(solicitud: any) {
    console.log(solicitud, 'solicitud a actualizar');
    return this.http.put(this.REST + `/${solicitud.ID_SOLICITUD}`, solicitud);
  }
}

export interface Solicitud {
  ID_SOLICITUD?: number;
  DESCRIPCION: string;
  ID_VEHICULO: string;
  ESTADO: string;
  CREADO_EL: any;
}
