import { NgModule } from '@angular/core';

// Material components
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatMenuModule } from '@angular/material/menu';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatRadioModule } from '@angular/material/radio';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTableModule } from '@angular/material/table';
import { MatRippleModule } from '@angular/material/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';

const componentes = [
  MatRippleModule,
  MatButtonModule,
  MatDialogModule,
  MatInputModule,
  MatSelectModule,
  MatMenuModule,
  MatCheckboxModule,
  MatIconModule,
  MatFormFieldModule,
  MatSidenavModule,
  MatRadioModule,
  MatSnackBarModule,
  MatTabsModule,
  MatSlideToggleModule,
  MatTableModule,
  MatToolbarModule,
  MatExpansionModule,
  MatDividerModule,
  MatListModule,
];

@NgModule({
  declarations: [],
  imports: [...componentes],
  exports: [...componentes],
})
export class AppMaterialModule {}
