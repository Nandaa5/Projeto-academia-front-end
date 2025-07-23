import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultarFichaExerciciosComponent } from './consultar-ficha-exercicios.component';

describe('ConsultarFichaExerciciosComponent', () => {
  let component: ConsultarFichaExerciciosComponent;
  let fixture: ComponentFixture<ConsultarFichaExerciciosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsultarFichaExerciciosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConsultarFichaExerciciosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
