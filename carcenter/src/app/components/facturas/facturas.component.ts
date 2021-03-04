import { Component, OnInit } from '@angular/core';
import { ClientesService } from 'src/app/services/clientes.service';
import { FacturasService } from 'src/app/services/facturas.service';

@Component({
  selector: 'app-facturas',
  templateUrl: './facturas.component.html',
  styleUrls: ['./facturas.component.css'],
})
export class FacturasComponent implements OnInit {
  id_cliente: number | undefined;
  facturas: any[] = [];

  constructor(
    private cliente$: ClientesService,
    private facturas$: FacturasService
  ) {
    this.id_cliente = this.cliente$.cliente.ID_CLIENTE;
  }

  ngOnInit(): void {
    this.obtenerFacturas();
  }

  obtenerFacturas() {
    this.facturas$
      .obtenerFacturas(this.id_cliente)
      .subscribe((facturas: any[]) => {
        //console.log(facturas, 'facturas');
        this.facturas = facturas.filter((factura) => factura.ID_FACTURA);
      });
  }
}
