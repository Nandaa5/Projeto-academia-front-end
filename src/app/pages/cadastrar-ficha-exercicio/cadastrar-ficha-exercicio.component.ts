import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

import { CommonModule } from '@angular/common';
import { Exercicio } from '../../models/exercicio';
import { Ficha } from '../../models/ficha';
import { FichaExercicio } from '../../models/ficha-exercicio';
import { FichaExercicioService } from '../../services/ficha-exercicio.service';
import { FichaService } from '../../services/ficha.service';
import { ExercicioService } from '../../services/exercicio.service';

@Component({
  selector: 'app-cadastrar-ficha-exercicio',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './cadastrar-ficha-exercicio.component.html',
  styleUrl: './cadastrar-ficha-exercicio.component.css'
})
export class CadastrarFichaExercicioComponent {

  formGroup: FormGroup;
  listaExercicio: Exercicio[] = [];
  listaFicha: Ficha[] = [];
  fichaExercicio!: FichaExercicio;

  constructor(private formBuilder: FormBuilder,
    private fichaExercicioService: FichaExercicioService,
    private route: ActivatedRoute,
    private router: Router,
    private fichaService: FichaService,
    private exercicioService: ExercicioService) {


    this.formGroup = this.formBuilder.group({
      id: [null],
      series: [null, Validators.required],
      repeticoes: [null, Validators.required],
      exercicio: [null, Validators.required],
      ficha: [null, Validators.required],
    });

  }


  ngOnInit(): void {
    this.carregarListaExercicio();
    this.carregarListaFicha();

    let id = Number(this.route.snapshot.paramMap.get('id'));
    this.fichaExercicio = new FichaExercicio();

    if (id) {
      this.fichaExercicioService.buscarPorId(id).subscribe(retorno => {
        this.fichaExercicio = retorno;

        this.formGroup.patchValue({
          series: this.fichaExercicio.series,
          repeticoes: this.fichaExercicio.repeticoes,
          exercicio: this.fichaExercicio.exercicio,
          ficha: this.fichaExercicio.ficha
        });
      });
    }
  }

  
  onSubmit(): void {
    console.log('Dados do formulário:', this.formGroup.value);

    if (this.formGroup.valid) {
      this.fichaExercicio.series = this.formGroup.value.series;
      this.fichaExercicio.repeticoes = this.formGroup.value.repeticoes;
      this.fichaExercicio.exercicio = this.formGroup.value.exercicio;
      this.fichaExercicio.ficha = this.formGroup.value.ficha; 
      this.fichaExercicioService.salvar(this.fichaExercicio).subscribe({
        next: () => {
          alert('Registro salvo com sucesso!');
          this.formGroup.reset();
          this.router.navigate(['/consultar-fichaExercicios']);
        },
        error: () => {
          alert('Erro ao salvar o registro. Tente novamente.');
        }
      });
    }
  }

  carregarListaExercicio(): void {
    this.exercicioService.listar().subscribe({
      next: (retornoJson) => {
        this.listaExercicio = retornoJson;
      },
      error: () => {
        alert('Erro ao carregar a lista.');
      }
    });
  }

  carregarListaFicha(): void {
  this.fichaService.listar().subscribe({
    next: (retornoJson) => {
      this.listaFicha = retornoJson;
    },
    error: () => {
      alert('Erro ao carregar a lista de fichas.');
    }
  });
}



}
