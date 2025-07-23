import { Component } from '@angular/core';
import { Pagamento } from '../../models/pagamento';
import { PagamentoService } from '../../services/pagamento.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule, DatePipe, NgFor } from '@angular/common';


@Component({
  selector: 'app-consultar-pagamentos',
  standalone: true,
  imports: [CommonModule, RouterModule, NgFor],
  templateUrl: './consultar-pagamentos.component.html',
  styleUrl: './consultar-pagamentos.component.css'
})
export class ConsultarPagamentosComponent {

  lista: Pagamento[] = [];

  constructor(private service: PagamentoService, private router: Router) {
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
    this.router.navigate(['/editar-pagamento', id]);    
  }
}
