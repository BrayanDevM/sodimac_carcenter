import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ClientesService {
  clientes: Cliente[] = [];
  cliente!: Cliente;
  REST: string = 'http://localhost:8081/clientes';

  constructor(private http: HttpClient, private router: Router) {
    this.obtenerSesion();
  }

  obtenerClientes() {
    return this.http.get(this.REST).pipe(
      map((resp: any) => {
        return resp.clientes;
      }),
      catchError((err) => {
        return throwError(err);
      })
    );
  }

  obtenerCliente(documento: string) {
    return this.http.get(this.REST + `/${documento}`).pipe(
      map((resp: any) => {
        return resp.cliente;
      }),
      catchError((err) => {
        return throwError(err);
      })
    );
  }

  crearCliente(cliente: Cliente) {
    return this.http.post(this.REST, cliente).pipe(
      map((resp: any) => {
        return resp;
      }),
      catchError((err) => {
        return throwError(err);
      })
    );
  }

  crearSesion(cliente: Cliente) {
    this.cliente = cliente;
    sessionStorage.setItem('cliente', JSON.stringify(this.cliente));
    this.router.navigate(['/cliente']);
  }

  obtenerSesion() {
    if (sessionStorage.getItem('cliente')) {
      this.cliente = JSON.parse(sessionStorage.getItem('cliente') + '');
    }
  }

  cerrarSesion() {
    sessionStorage.removeItem('cliente');
    this.router.navigate(['/']);
  }
}

export interface Cliente {
  ID_CLIENTE?: number;
  NOMBRE_1: string;
  NOMBRE_2: string;
  APELLIDO_1: string;
  APELLIDO_2: string;
  TIPO_DOC: string;
  DOCUMENTO: string;
  CELULAR: string;
  DIRECCION: string;
  CORREO: string;
  ESTADO: string;
  CREADO_EL: any;
  ID_TIENDA: any;
}
