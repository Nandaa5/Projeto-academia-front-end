import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatriculaService } from '../../services/matricula.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

import { CommonModule } from '@angular/common';


import { Planos } from '../../models/planos';
import { Matricula } from '../../models/matricula';
import { PlanosService } from '../../services/planos.service';
import { Pessoa } from '../../models/pessoas';
import { PessoasService } from '../../services/pessoas.service';

@Component({
  selector: 'app-cadastrar-matricula',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './cadastrar-matricula.component.html',
  styleUrl: './cadastrar-matricula.component.css'
})
export class CadastrarMatriculaComponent implements OnInit   {


  formGroup: FormGroup;
  listaPlanos: Planos[] = [];
  listaPessoas: Pessoa[] = [];
  matricula!: Matricula;

  constructor(private formBuilder: FormBuilder, private matriculaService: MatriculaService, private route: ActivatedRoute, private router: Router, private planosService: PlanosService, private pessoasService: PessoasService ) {

    this.formGroup = this.formBuilder.group({
      id: [null],
      numero: ['', Validators.required],
      data: [null, Validators.required],
      situacao: [null, Validators.required],
      plano: [null, Validators.required],    
      pessoa: [null, Validators.required],   
    });

  }

  ngOnInit(): void {
  this.carregarListaTipo();
  this.carregarListaPessoas();

  let id = Number(this.route.snapshot.paramMap.get('id'));
  this.matricula = new Matricula();

  if (id) {
    this.matriculaService.buscarPorId(id).subscribe(retorno => {
      this.matricula = retorno;

      this.formGroup.patchValue({
        numero: this.matricula.numero,
        data: this.matricula.data,
        situacao: this.matricula.situacao,
        plano: this.matricula.plano,
        pessoa: this.matricula.pessoa
      });
    });
  }
}


  onSubmit(): void {
    console.log('Dados do formulário:', this.formGroup.value);

    if (this.formGroup.valid) {
      this.matricula.numero = this.formGroup.value.numero;
      this.matricula.data = this.formGroup.value.data;
      this.matricula.situacao = this.formGroup.value.situacao;
      this.matricula.plano = this.formGroup.value.plano;
      this.matricula.pessoa = this.formGroup.value.pessoa; 
      this.matriculaService.salvar(this.matricula).subscribe({
        next: () => {
          alert('Registro salvo com sucesso!');
          this.formGroup.reset();
          this.router.navigate(['/consultar-matriculas']);
        },
        error: () => {
          alert('Erro ao salvar o registro. Tente novamente.');
        }
      });
    }
  }

  carregarListaTipo(): void {
    this.planosService.listar().subscribe({
      next: (retornoJson) => {
        this.listaPlanos = retornoJson;
      },
      error: () => {
        alert('Erro ao carregar a lista.');
      }
    });
  }

carregarListaPessoas(): void {
  this.pessoasService.listar().subscribe({
    next: (retornoJson) => {
      this.listaPessoas = retornoJson;
    },
    error: () => {
      alert('Erro ao carregar a lista de pessoas.');
    }
  });
}


}
