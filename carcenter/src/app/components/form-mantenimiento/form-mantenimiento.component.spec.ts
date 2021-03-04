import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormMantenimientoComponent } from './form-mantenimiento.component';

describe('FormMantenimientoComponent', () => {
  let component: FormMantenimientoComponent;
  let fixture: ComponentFixture<FormMantenimientoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormMantenimientoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormMantenimientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
