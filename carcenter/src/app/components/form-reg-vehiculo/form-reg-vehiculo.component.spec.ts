import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormRegVehiculoComponent } from './form-reg-vehiculo.component';

describe('FormRegVehiculoComponent', () => {
  let component: FormRegVehiculoComponent;
  let fixture: ComponentFixture<FormRegVehiculoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormRegVehiculoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormRegVehiculoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
