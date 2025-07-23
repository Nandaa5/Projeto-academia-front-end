import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule, DatePipe, NgFor } from '@angular/common';
import { FichaExercicioService } from '../../services/ficha-exercicio.service';

@Component({
  selector: 'app-consultar-ficha-exercicios',
  standalone: true,
  imports: [CommonModule, RouterModule, NgFor],
  templateUrl: './consultar-ficha-exercicios.component.html',
  styleUrl: './consultar-ficha-exercicios.component.css'
})
export class ConsultarFichaExerciciosComponent implements OnInit {

  lista: any[] = [];
  constructor(
    private service: FichaExercicioService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.carregarFichasExercicios();
  }

  carregarFichasExercicios(): void {
    this.service.listar().subscribe({
      next: (fichasExercicios) => {
        this.lista = fichasExercicios;
      },
      error: (err) => {
        console.error('Erro ao carregar fichasExercicios:', err);
        alert('Erro ao carregar fichasExercicios. Verifique o console.');
      }
    });
  }
  editar(id: number): void {
    this.router.navigate(['/editar-fichaExercicio', id]);
  }
  
  excluir(id: number): void {
    if (confirm('Tem certeza que deseja excluir esta fichasExercicios?')) {
      this.service.excluir(id).subscribe({
        next: () => {
          this.carregarFichasExercicios();
          alert('fichasExercicios excluída com sucesso!');
        },
        error: (err) => {
          console.error('Erro ao excluir fichasExercicios:', err);
          alert('Erro ao excluir fichasExercicios. Verifique o console.');
        }
      });
    }
  }


}
