import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DialogClientesComponent } from 'src/app/components/dialog-clientes/dialog-clientes.component';
import { DialogRegistroComponent } from 'src/app/components/dialog-registro/dialog-registro.component';
import { ClientesService } from 'src/app/services/clientes.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(
    private _dialog: MatDialog,
    private clientes$: ClientesService,
    private _snackbar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  registrar() {
    const dialogRef = this._dialog.open(DialogRegistroComponent, {
      width: '550px',
    });
    dialogRef.afterClosed().subscribe((form) => {
      if (form) {
        this.clientes$.crearCliente(form).subscribe(() => {
          this._snackbar.open('Cliente creado, ya puedes entrar', undefined, {
            duration: 4000,
          });
        });
      }
    });
  }

  entrar() {
    this._dialog.open(DialogClientesComponent, {
      width: '550px',
    });
  }
}
