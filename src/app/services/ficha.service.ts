import { Injectable } from '@angular/core';
import { LoginService } from './login.service';
import { HttpClient } from '@angular/common/http';
import { appSettings } from '../app.config';
import { Ficha } from '../models/ficha';
import { Observable } from 'rxjs';
import { Pessoa } from '../models/pessoas';

@Injectable({
  providedIn: 'root'
})
export class FichaService {


    private apiUrl = `${appSettings.apiBaseUrl}/fichas`;
   
    constructor(private http: HttpClient, private loginService: LoginService) { }
  
    listar(): Observable<Ficha[]> {
      return this.http.get<Ficha[]>(this.apiUrl, this.loginService.gerarCabecalhoHTTP());
    }
  
    salvar(ficha: Ficha): Observable<Ficha> {
      if (ficha.id) {
        return this.http.put<Ficha>(`${this.apiUrl}/${ficha.id}`, ficha,  this.loginService.gerarCabecalhoHTTP());
      } else {
        return this.http.post<Ficha>(this.apiUrl, ficha,  this.loginService.gerarCabecalhoHTTP());
      }
    }
  
    buscarPorId(id: number): Observable<Ficha> {
      return this.http.get<Ficha>(`${this.apiUrl}/${id}`,  this.loginService.gerarCabecalhoHTTP());
    }
  
    excluir(id: number): Observable<void> {
      return this.http.delete<void>(`${this.apiUrl}/${id}`,  this.loginService.gerarCabecalhoHTTP());
    }
    
    listarPessoa(idFicha: number): Observable<Pessoa[]> {
    const url = `${this.apiUrl}/${idFicha}/pessoas`;
    return this.http.get<Pessoa[]>(url, this.loginService.gerarCabecalhoHTTP());
  }
  
}
  
    

