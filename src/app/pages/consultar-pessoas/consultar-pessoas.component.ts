import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Pessoa } from '../../models/pessoas';
import { PessoasService } from '../../services/pessoas.service';

@Component({
  selector: 'app-consultar-pessoas',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './consultar-pessoas.component.html',
  styleUrl: './consultar-pessoas.component.css'
})
export class ConsultarPessoasComponent {

  lista: Pessoa[] = [];

  constructor(private service: PessoasService, private router: Router){ }

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
    this.router.navigate(['/cadastrar-pessoas', id]);    
  }

}


