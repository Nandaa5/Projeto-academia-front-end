import { Injectable } from '@angular/core';
import { Pessoa } from '../models/pessoas';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { LoginService } from './login.service';
import { appSettings } from '../app.config';

@Injectable({
  providedIn: 'root'
})
export class PessoasService {

  private apiUrl = `${appSettings.apiBaseUrl}/pessoas`;

  constructor(private http: HttpClient, private loginService: LoginService) { }

  listar(): Observable<Pessoa[]> {
    return this.http.get<Pessoa[]>(this.apiUrl, this.loginService.gerarCabecalhoHTTP());
  }

  salvar(pessoa: Pessoa): Observable<Pessoa> {
    if (pessoa.id) {
      return this.http.put<Pessoa>(`${this.apiUrl}/${pessoa.id}`, pessoa, this.loginService.gerarCabecalhoHTTP());
    } else {
      return this.http.post<Pessoa>(this.apiUrl, pessoa, this.loginService.gerarCabecalhoHTTP());
    }
  }

  buscarPorId(id: number): Observable<Pessoa> {
    return this.http.get<Pessoa>(`${this.apiUrl}/${id}`, this.loginService.gerarCabecalhoHTTP());
  }

  excluir(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, this.loginService.gerarCabecalhoHTTP());
  }

}