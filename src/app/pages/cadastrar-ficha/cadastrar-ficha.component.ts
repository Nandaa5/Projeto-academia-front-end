import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Ficha } from '../../models/ficha';
import { FichaService } from '../../services/ficha.service';
import { PessoasService } from '../../services/pessoas.service';
import { Pessoa } from '../../models/pessoas';


@Component({
  selector: 'app-cadastrar-ficha',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './cadastrar-ficha.component.html',
  styleUrl: './cadastrar-ficha.component.css'
})
export class CadastrarFichaComponent {

  formGroup: FormGroup;
  listaPessoas: Pessoa[] = [];
  ficha!: Ficha;

  constructor(private formBuilder: FormBuilder,
    private fichaService: FichaService,
    private route: ActivatedRoute,
    private router: Router,
    private pessoasService: PessoasService) {

    this.formGroup = this.formBuilder.group({
      id: [null],
      data: [null, Validators.required],
      descricao: ['', Validators.required],
      situacao: [null, Validators.required],
      pessoa: [null, Validators.required],
    });

  }

  ngOnInit(): void {
    this.carregarListaPessoas();

    let id = Number(this.route.snapshot.paramMap.get('id'));
    this.ficha = new Ficha();

    if (id) {
      this.fichaService.buscarPorId(id).subscribe(retorno => {
        this.ficha = retorno;

        this.formGroup.patchValue({
          data: this.ficha.data,
          descricao: this.ficha.descricao,
          situacao: this.ficha.situacao,
          pessoa: this.ficha.pessoa
        });
      });
    }
  }

  onSubmit(): void {
    console.log('Dados do formulário:', this.formGroup.value);

    if (this.formGroup.valid) {
      this.ficha.data = this.formGroup.value.data;
      this.ficha.descricao = this.formGroup.value.descricao;
      this.ficha.situacao = this.formGroup.value.situacao;
      this.ficha.pessoa = this.formGroup.value.pessoa;
      this.fichaService.salvar(this.ficha).subscribe({
        next: () => {
          alert('Registro salvo com sucesso!');
          this.formGroup.reset();
          this.router.navigate(['/consultar-fichas']);
        },
        error: () => {
          alert('Erro ao salvar o registro. Tente novamente.');
        }
      });
    }
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
