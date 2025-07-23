import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultarPagamentosComponent } from './consultar-pagamentos.component';

describe('ConsultarPagamentosComponent', () => {
  let component: ConsultarPagamentosComponent;
  let fixture: ComponentFixture<ConsultarPagamentosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsultarPagamentosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConsultarPagamentosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
