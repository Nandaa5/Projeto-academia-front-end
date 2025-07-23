import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastrarFichaExercicioComponent } from './cadastrar-ficha-exercicio.component';

describe('CadastrarFichaExercicioComponent', () => {
  let component: CadastrarFichaExercicioComponent;
  let fixture: ComponentFixture<CadastrarFichaExercicioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CadastrarFichaExercicioComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CadastrarFichaExercicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
