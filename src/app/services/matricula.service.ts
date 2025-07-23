import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Matricula } from '../models/matricula';
import { Observable } from 'rxjs';
import { LoginService } from './login.service';
import { appSettings } from '../app.config';

@Injectable({
  providedIn: 'root'
})

export class MatriculaService {

 
  private apiUrl = `${appSettings.apiBaseUrl}/matriculas`;

  constructor(private http: HttpClient, private loginService: LoginService) { }

  listar(): Observable<Matricula[]> {
      return this.http.get<Matricula[]>(this.apiUrl,  this.loginService.gerarCabecalhoHTTP());
    }
  
    salvar(matricula: Matricula): Observable<Matricula> {
      if (matricula.id) {
        return this.http.put<Matricula>(`${this.apiUrl}/${matricula.id}`, matricula,  this.loginService.gerarCabecalhoHTTP());
      } else {
        return this.http.post<Matricula>(this.apiUrl, matricula, this.loginService.gerarCabecalhoHTTP());
      }
    }
  
    buscarPorId(id: number): Observable<Matricula> {
      return this.http.get<Matricula>(`${this.apiUrl}/${id}`, this.loginService.gerarCabecalhoHTTP());
    }
  
    excluir(id: number): Observable<void> {
      return this.http.delete<void>(`${this.apiUrl}/${id}`, this.loginService.gerarCabecalhoHTTP());
    }
}
