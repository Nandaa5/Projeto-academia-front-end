import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ExercicioComponent } from './pages/exercicio/exercicio.component';
import { CadastrarPessoasComponent } from './pages/cadastrar-pessoas/cadastrar-pessoas.component';
import { ConsultarPessoasComponent } from './pages/consultar-pessoas/consultar-pessoas.component';
import { PlanosComponent } from './pages/planos/planos.component';
import { ConsultarMatriculasComponent } from './pages/consultar-matriculas/consultar-matriculas.component';
import { CadastrarMatriculaComponent } from './pages/cadastrar-matricula/cadastrar-matricula.component';
import { ConsultarPagamentosComponent } from './pages/consultar-pagamentos/consultar-pagamentos.component';
import { CadastrarPagamentoComponent } from './pages/cadastrar-pagamento/cadastrar-pagamento.component';
import { ConsultarUsuariosComponent } from './pages/consultar-usuarios/consultar-usuarios.component';
import { CadastrarUsuarioComponent } from './pages/cadastrar-usuario/cadastrar-usuario.component';
import { LoginComponent } from './pages/login/login.component';
import { ConsultarFichaExerciciosComponent } from './pages/consultar-ficha-exercicios/consultar-ficha-exercicios.component';
import { CadastrarFichaComponent } from './pages/cadastrar-ficha/cadastrar-ficha.component';
import { ConsultarFichasComponent } from './pages/consultar-fichas/consultar-fichas.component';
import { CadastrarFichaExercicioComponent } from './pages/cadastrar-ficha-exercicio/cadastrar-ficha-exercicio.component';

export const routes: Routes = [
    {path: '', component: LoginComponent},
    {path: 'home', component: HomeComponent},
    {path: 'exercicio', component:ExercicioComponent},
    {path:'cadastrar-pessoas', component: CadastrarPessoasComponent},
    {path:'consultar-pessoas', component: ConsultarPessoasComponent},
    {path: 'cadastrar-pessoas/:id', component: CadastrarPessoasComponent },
    {path: 'planos', component: PlanosComponent },
    {path: 'cadastrar-matricula', component: CadastrarMatriculaComponent},
    {path: 'consultar-matriculas', component: ConsultarMatriculasComponent },
    {path: 'editar-matricula/:id', component: CadastrarMatriculaComponent },
    {path: 'consultar-pagamentos', component: ConsultarPagamentosComponent},
    {path: 'cadastrar-pagamento', component: CadastrarPagamentoComponent},
    {path: 'editar-pagamento/:id', component: CadastrarPagamentoComponent },
    {path: 'consultar-usuarios', component: ConsultarUsuariosComponent},
    {path: 'cadastrar-usuario', component: CadastrarUsuarioComponent},
    {path: 'editar-usuario/:id', component: CadastrarUsuarioComponent},
    {path: 'consultar-fichaExercicios', component: ConsultarFichaExerciciosComponent},
    {path: 'cadastrar-fichaExercicio', component: CadastrarFichaExercicioComponent},
    {path: 'editar-fichaExercicio/:id', component: CadastrarFichaExercicioComponent},
    {path: 'consultar-fichas', component: ConsultarFichasComponent},
    {path: 'cadastrar-ficha', component: CadastrarFichaComponent},
    {path: 'editar-ficha/:id', component: CadastrarFichaComponent},
    
    
    

];
