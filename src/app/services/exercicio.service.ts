import { Injectable } from '@angular/core';
import { Exercicio } from '../models/exercicio';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { LoginService } from './login.service';
import { appSettings } from '../app.config';

@Injectable({
  providedIn: 'root'
})
export class ExercicioService {

   private apiUrl = `${appSettings.apiBaseUrl}/exercicios`;

  constructor(private http: HttpClient, private loginService: LoginService) {}

    listar(): Observable<Exercicio[]>{
      return this.http.get<Exercicio[]>(this.apiUrl,  this.loginService.gerarCabecalhoHTTP());
    }
  
    salvar(exercicio: Exercicio): Observable<Exercicio>{
      if (exercicio.id) {
        return this.http.put<Exercicio>(`${this.apiUrl}/${exercicio.id}`, exercicio,  this.loginService.gerarCabecalhoHTTP());
      } else {
        return this.http.post<Exercicio>(this.apiUrl, exercicio,  this.loginService.gerarCabecalhoHTTP());
      }
    }

    buscarPorId(id: number): Observable<Exercicio> {
      return this.http.get<Exercicio>(`${this.apiUrl}/${id}`, this.loginService.gerarCabecalhoHTTP());
    }
    
    excluir(id: number): Observable<void> {
      return this.http.delete<void>(`${this.apiUrl}/${id}`,  this.loginService.gerarCabecalhoHTTP());
    }
  
}




