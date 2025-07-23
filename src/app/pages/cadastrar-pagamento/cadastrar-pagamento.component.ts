import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Pagamento } from '../../models/pagamento';
import { Matricula } from '../../models/matricula';
import { PagamentoService } from '../../services/pagamento.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatriculaService } from '../../services/matricula.service';
import { CommonModule } from '@angular/common';
import { NgxMaskDirective } from 'ngx-mask';

@Component({
  selector: 'app-cadastrar-pagamento',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule,  NgxMaskDirective],
  templateUrl: './cadastrar-pagamento.component.html',
  styleUrl: './cadastrar-pagamento.component.css'
})
export class CadastrarPagamentoComponent implements OnInit {

  formGroup: FormGroup;
  listaMatricula: Matricula[] = [];
  pagamento!: Pagamento;

  constructor(private formBuilder: FormBuilder, private pagamentoService: PagamentoService, private route: ActivatedRoute, private router: Router, private matriculaService: MatriculaService) {

    this.formGroup = this.formBuilder.group({
      id: [null],
      dataVencimento: ['', Validators.required],
      dataPagamento: [null, Validators.required],
      valor: [null, Validators.required],
      matricula: [null, Validators.required]
    });
  }

  ngOnInit(): void {
    this.carregarListaMatricula();

    let id = Number(this.route.snapshot.paramMap.get('id'));
    this.pagamento = new Pagamento();
    if (id) {
      this.pagamentoService.buscarPorId(id).subscribe(retorno => {
        this.pagamento = retorno;
        let matriculaSelecionado = this.listaMatricula.find(temp => temp.id === retorno.matricula!.id);
        this.formGroup.patchValue({
          dataVencimento: this.pagamento.dataVencimento,
          dataPagamento: this.pagamento.dataPagamento,
          valor: this.pagamento.valor,
          matricula: matriculaSelecionado
        });
      });
    }
  }

  onSubmit(): void {
    console.log('Dados do formulário:', this.formGroup.value);

    if (this.formGroup.valid) {
      this.pagamento.dataVencimento = this.formGroup.value.dataVencimento;
      this.pagamento.dataPagamento = this.formGroup.value.dataPagamento;
      this.pagamento.valor = this.formGroup.value.valor;
      this.pagamento.matricula = this.formGroup.value.matricula;
      
      this.pagamentoService.salvar(this.pagamento).subscribe({
        next: () => {
          alert('Registro salvo com sucesso!');
          this.formGroup.reset();
          this.router.navigate(['/consultar-pagamentos']);
        },
        error: () => {
          alert('Erro ao salvar o registro. Tente novamente.');
        }
      });
    }
  }



  carregarListaMatricula(): void {
    this.matriculaService.listar().subscribe({
      next: (retornoJson) => {
        this.listaMatricula = retornoJson;
      },
      error: () => {
        alert('Erro ao carregar a lista.');
      }
    });
  }
  onCancel(): void {
    if (this.formGroup.dirty) {
      if (confirm('Tem certeza que deseja cancelar? As alterações serão perdidas.')) {
        this.router.navigate(['/consultar-pagamentos']);
      }
    } else {
      this.router.navigate(['/consultar-pagamentos']);
    }
  }

}



