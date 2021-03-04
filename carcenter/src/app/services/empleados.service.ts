import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmpleadosService {
  empleados: any[] = [];
  REST: string = 'http://localhost:8081/empleados';

  constructor(private http: HttpClient) {}

  obtenerEmpleados() {
    return this.http.get(this.REST).pipe(
      map((resp: any) => {
        return resp.empleados;
      }),
      catchError((err) => {
        return throwError(err);
      })
    );
  }
}
