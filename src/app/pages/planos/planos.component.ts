import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PlanosService } from '../../services/planos.service';
import { Planos } from '../../models/planos';
import { NgxMaskDirective } from 'ngx-mask';


@Component({
  selector: 'app-planos',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NgxMaskDirective],
  templateUrl: './planos.component.html',
  styleUrl: './planos.component.css'
})
export class PlanosComponent {
   lista: Planos[] = [];
    objeto!: Planos  ;
    modalAberto = false;
    formGroup: FormGroup;


    constructor(private service: PlanosService, private formBuilder: FormBuilder) {
      this.formGroup = this.formBuilder.group({
        id: [null],
        descricao: ['', Validators.required],
        parcelas: [null, Validators.required],
        valor: [null, Validators.required],
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
      this.objeto = new Planos();
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
        this.objeto.descricao = formValue.descricao;
        this.objeto.parcelas = formValue.parcelas;
        this.objeto.valor= formValue.valor;

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
