import { Component, OnInit } from '@angular/core';
import { MatriculaService } from '../../services/matricula.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule, DatePipe, NgFor } from '@angular/common';


@Component({
  selector: 'app-consultar-matriculas',
  standalone: true,
  imports: [CommonModule, RouterModule,NgFor],
  templateUrl: './consultar-matriculas.component.html',
  styleUrls: ['./consultar-matriculas.component.css']
})
export class ConsultarMatriculasComponent implements OnInit {
  lista: any[] = [];

  constructor(
    private service: MatriculaService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.carregarMatriculas();
  }

  carregarMatriculas(): void {
    this.service.listar().subscribe({
      next: (matriculas) => {
        this.lista = matriculas;
      },
      error: (err) => {
        console.error('Erro ao carregar matrículas:', err);
        alert('Erro ao carregar matrículas. Verifique o console.');
      }
    });
  }

  editar(id: number): void {
    this.router.navigate(['/editar-matricula', id]);
  }

  excluir(id: number): void {
    if (confirm('Tem certeza que deseja excluir esta matrícula?')) {
      this.service.excluir(id).subscribe({
        next: () => {
          this.carregarMatriculas();
          alert('Matrícula excluída com sucesso!');
        },
        error: (err) => {
          console.error('Erro ao excluir matrícula:', err);
          alert('Erro ao excluir matrícula. Verifique o console.');
        }
      });
    }
  }
}