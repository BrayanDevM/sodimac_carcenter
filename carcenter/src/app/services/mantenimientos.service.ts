import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MantenimientosService {
  mantenimientos: any[] = [];
  REST: string = 'http://localhost:8081/mantenimientos';
  constructor(private http: HttpClient) {}

  obtenerMantenimientos() {
    return this.http.get(this.REST).pipe(
      map((resp: any) => {
        return resp.mantenimientos;
      }),
      catchError((err) => {
        return throwError(err);
      })
    );
  }
}
