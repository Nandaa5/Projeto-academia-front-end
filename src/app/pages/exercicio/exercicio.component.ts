import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Exercicio } from '../../models/exercicio';
import { ExercicioService } from '../../services/exercicio.service';

@Component({
  selector: 'app-exercicio',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './exercicio.component.html',
  styleUrl: './exercicio.component.css'
})
export class ExercicioComponent {
  lista: Exercicio[] = [];
  objeto!: Exercicio  ;
  modalAberto = false;
  formGroup: FormGroup;

  constructor(private service: ExercicioService, private formBuilder: FormBuilder) {
    this.formGroup = this.formBuilder.group({
      id: [null],
      nome: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.carregarLista();
  }

  carregarLista(): void {
    this.service.listar().subscribe({
      next: (retornoJson) => {
        this.lista = retornoJson;
      },
      error: () => {
        alert('Erro ao carregar a lista.');
      }
    });
  }

  excluir(id: number): void {
    if (confirm('Tem certeza que deseja excluir o registro?')) {
      this.service.excluir(id).subscribe({
        next: () => {
          this.carregarLista();
        },
        error: () => {
          alert('Erro ao excluir o registro. Tente novamente.');
        }
      });
    }
  }

  editar(id: number): void {
    this.service.buscarPorId(id).subscribe({
      next: (retorno) => {
        this.objeto = retorno;
        this.formGroup.patchValue(this.objeto);
        this.abrirModal();
      },
      error: () => {
        alert('Erro ao buscar os dados do registro. Tente novamente.');
      }
    });
  }
  cadastrar() {
    this.objeto = new Exercicio();
    this.abrirModal();
    this.formGroup.reset();
  }

  abrirModal(): void {
    this.modalAberto = true;
  }

  fecharModal(): void {
    this.modalAberto = false;
  }

  onSubmit(): void {
    if (this.formGroup.valid) {
      const formValue = this.formGroup.value;

      this.objeto.id = formValue.id;
      this.objeto.nome = formValue.nome;

      this.service.salvar(this.objeto).subscribe({
        next: () => {
          this.formGroup.reset();
          this.carregarLista();
          this.fecharModal();
        },
        error: () => {
          alert('Erro ao salvar o registro. Tente novamente.');
        }
      });

    }
  }
}


