import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Usuario } from '../../models/usuario';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-consultar-usuarios',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './consultar-usuarios.component.html',
  styleUrl: './consultar-usuarios.component.css'
})
export class ConsultarUsuariosComponent {

  lista: Usuario[] = [];

  constructor(private service: UsuarioService, private router: Router) {
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
      this.router.navigate(['/editar-usuario', id]);    
    }
}
