import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultarMatriculasComponent } from './consultar-matriculas.component';

describe('ConsultarMatriculasComponent', () => {
  let component: ConsultarMatriculasComponent;
  let fixture: ComponentFixture<ConsultarMatriculasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsultarMatriculasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConsultarMatriculasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
