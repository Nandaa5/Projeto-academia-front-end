import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Usuario } from '../../models/usuario';
import { UsuarioService } from '../../services/usuario.service';
import { PessoasService } from '../../services/pessoas.service';
import { Pessoa } from '../../models/pessoas';

@Component({
  selector: 'app-cadastrar-usuario',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './cadastrar-usuario.component.html',
  styleUrl: './cadastrar-usuario.component.css'
})
export class CadastrarUsuarioComponent {

  formGroup: FormGroup;
  listaPessoa: Pessoa[] = [];
  usuario!: Usuario;


  constructor(private formBuilder: FormBuilder,
    private usuarioService: UsuarioService,
    private route: ActivatedRoute,
    private router: Router,
    private pessoaService: PessoasService) {

    this.formGroup = this.formBuilder.group({
      id: [null],
      login: ['', Validators.required],
      senha: [null, Validators.required],
      tipo: [null, Validators.required],
      pessoa: [null, Validators.required]
    });
  }

  ngOnInit(): void {
    this.carregarListaPessoas();

    let id = Number(this.route.snapshot.paramMap.get('id'));
    this.usuario = new Usuario();
    if (id) {
      this.usuarioService.buscarPorId(id).subscribe(retorno => {
        this.usuario = retorno;
        let pessoaSelecionado = this.listaPessoa.find(temp => temp.id === retorno.pessoa!.id);
        this.formGroup.patchValue({
          login: this.usuario.login,
          senha: this.usuario.senha,
          tipo: this.usuario.tipo,
          pessoa: pessoaSelecionado
        });
      });
    }
  }

  onSubmit(): void {
    console.log('Dados do formulário:', this.formGroup.value);

    if (this.formGroup.valid) {
      this.usuario.login = this.formGroup.value.login;
      this.usuario.senha = this.formGroup.value.senha;
      this.usuario.tipo = this.formGroup.value.tipo;
      this.usuario.pessoa = this.formGroup.value.pessoa;

      this.usuarioService.salvar(this.usuario).subscribe({
        next: () => {
          alert('Registro salvo com sucesso!');
          this.formGroup.reset();
          this.router.navigate(['/consultar-usuario']);
        },
        error: () => {
          alert('Erro ao salvar o registro. Tente novamente.');
        }
      });
    }
  }

  carregarListaPessoas(): void {
    this.pessoaService.listar().subscribe({
      next: (retornoJson) => {
        this.listaPessoa = retornoJson;
      },
      error: () => {
        alert('Erro ao carregar a lista.');
      }
    });
  }

  onCancel(): void {
    if (this.formGroup.dirty) {
      if (confirm('Tem certeza que deseja cancelar? As alterações serão perdidas.')) {
        this.router.navigate(['/consultar-usuarios']);
      }
    } else {
      this.router.navigate(['/consultar-usuarios']);
    }
  }

}



