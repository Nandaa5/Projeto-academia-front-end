import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule, DatePipe, NgFor } from '@angular/common';
import { Ficha } from '../../models/ficha';
import { FichaService } from '../../services/ficha.service';


@Component({
  selector: 'app-consultar-fichas',
  standalone: true,
  imports: [CommonModule, RouterModule, NgFor],
  templateUrl: './consultar-fichas.component.html',
  styleUrl: './consultar-fichas.component.css'
})
export class ConsultarFichasComponent {

  lista: Ficha[] = [];

   constructor(private service: FichaService, private router: Router) {
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
    this.router.navigate(['/editar-ficha', id]);    
  }
}


