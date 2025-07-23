import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastrarFichaComponent } from './cadastrar-ficha.component';

describe('CadastrarFichaComponent', () => {
  let component: CadastrarFichaComponent;
  let fixture: ComponentFixture<CadastrarFichaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CadastrarFichaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CadastrarFichaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
