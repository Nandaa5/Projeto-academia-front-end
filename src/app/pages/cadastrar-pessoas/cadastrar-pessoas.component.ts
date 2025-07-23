import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { PessoasService } from '../../services/pessoas.service';
import { NgxMaskDirective } from 'ngx-mask';


@Component({
  selector: 'app-cadastrar-pessoas',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NgxMaskDirective],
  templateUrl: './cadastrar-pessoas.component.html',
  styleUrl: './cadastrar-pessoas.component.css'
})
export class CadastrarPessoasComponent {

  
  formulario: FormGroup;
  


  constructor(
    private fb: FormBuilder,
    private pessoasService: PessoasService,
    private route: ActivatedRoute,
    private router: Router
  
  ){
    this.formulario = this.fb.group({
       id: [''], // campo opcional para identificar edição
       nome: ['', Validators.required],
       cpf: ['', Validators.required],       
       endereco: ['', Validators.required],       
       telefone: ['', Validators.required],
       
    });
}
  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.pessoasService.buscarPorId(id).subscribe(pessoas => {
        this.formulario.patchValue(pessoas);
      });
    }
  }

    onSubmit(): void {
    if (this.formulario.valid) {
      this.pessoasService.salvar(this.formulario.value).subscribe(() => {
        alert('Funcionário cadastrado com sucesso!');
        this.formulario.reset();
        this.router.navigate(['/consultar-pessoas']);
      });
    }
  }
   onCancel(): void {
    if (this.formulario.dirty) {
        if (confirm('Deseja realmente cancelar? As alterações serão perdidas.')) {
            this.navigateToConsultar();
        }
    } else {
        this.navigateToConsultar();
    }
}

private navigateToConsultar(): void {
    this.router.navigate(['/consultar-pessoas'])
        .then(success => {
            if (!success) {
                console.error('Falha na navegação para consultar-pessoas');
                // Fallback caso a navegação programática falhe
                window.location.href = '/consultar-pessoas';
            }
        })
        .catch(err => {
            console.error('Erro na navegação:', err);
            window.location.href = '/consultar-pessoas';
        });
}
}

