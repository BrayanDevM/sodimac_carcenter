import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RepuestosService {
  repuestos: any[] = [];
  REST: string = 'http://localhost:8081/repuestos';

  constructor(private http: HttpClient) {}

  obtenerRepuestos() {
    return this.http.get(this.REST).pipe(
      map((resp: any) => {
        return resp.repuestos;
      }),
      catchError((err) => {
        return throwError(err);
      })
    );
  }
}
