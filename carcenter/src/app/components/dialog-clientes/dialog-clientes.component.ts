import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Cliente, ClientesService } from 'src/app/services/clientes.service';

@Component({
  selector: 'app-dialog-clientes',
  templateUrl: './dialog-clientes.component.html',
  styleUrls: ['./dialog-clientes.component.css'],
})
export class DialogClientesComponent implements OnInit {
  clientes!: Cliente[];

  constructor(
    private clientes$: ClientesService,
    private dialogRef: MatDialogRef<DialogClientesComponent>
  ) {
    this.clientes$.obtenerClientes().subscribe((clientes: Cliente[]) => {
      this.clientes = clientes;
    });
  }

  ngOnInit(): void {}

  crearSesion(cliente: Cliente) {
    this.clientes$.crearSesion(cliente);
    this.dialogRef.close();
  }
}
