import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Planos } from '../models/planos';
import { LoginService } from './login.service';
import { appSettings } from '../app.config';

@Injectable({
  providedIn: 'root'
})
export class PlanosService {

   private apiUrl = `${appSettings.apiBaseUrl}/planos`;

  constructor(private http: HttpClient, private loginService: LoginService) { }

      listar(): Observable<Planos[]>{
      return this.http.get<Planos[]>(this.apiUrl,  this.loginService.gerarCabecalhoHTTP());
    }
  
    salvar(planos: Planos): Observable<Planos>{
      if (planos.id) {
        return this.http.put<Planos>(`${this.apiUrl}/${planos.id}`, planos, this.loginService.gerarCabecalhoHTTP());
      } else {
        return this.http.post<Planos>(this.apiUrl, planos, this.loginService.gerarCabecalhoHTTP());
      }
    }

    buscarPorId(id: number): Observable<Planos> {
      return this.http.get<Planos>(`${this.apiUrl}/${id}`, this.loginService.gerarCabecalhoHTTP());
    }
    
    excluir(id: number): Observable<void> {
      return this.http.delete<void>(`${this.apiUrl}/${id}`, this.loginService.gerarCabecalhoHTTP());
    }

}






