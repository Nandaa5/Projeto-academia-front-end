import { Injectable } from '@angular/core';
import { LoginService } from './login.service';
import { HttpClient } from '@angular/common/http';
import { FichaExercicio } from '../models/ficha-exercicio';
import { appSettings } from '../app.config';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FichaExercicioService {

  
   private apiUrl = `${appSettings.apiBaseUrl}/fichaExercicios`;
  
    constructor(private http: HttpClient, private loginService: LoginService) { }
  
    listar(): Observable<FichaExercicio[]> {
        return this.http.get<FichaExercicio[]>(this.apiUrl,  this.loginService.gerarCabecalhoHTTP());
      }
    
      salvar(fichaExercicio: FichaExercicio): Observable<FichaExercicio> {
        if (fichaExercicio.id) {
          return this.http.put<FichaExercicio>(`${this.apiUrl}/${fichaExercicio.id}`, fichaExercicio,  this.loginService.gerarCabecalhoHTTP());
        } else {
          return this.http.post<FichaExercicio>(this.apiUrl, fichaExercicio, this.loginService.gerarCabecalhoHTTP());
        }
      }
    
      buscarPorId(id: number): Observable<FichaExercicio> {
        return this.http.get<FichaExercicio>(`${this.apiUrl}/${id}`, this.loginService.gerarCabecalhoHTTP());
      }
    
      excluir(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`, this.loginService.gerarCabecalhoHTTP());
      }
}
