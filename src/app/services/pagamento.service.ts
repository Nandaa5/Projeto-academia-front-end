import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pagamento } from '../models/pagamento';
import { Observable } from 'rxjs';
import { LoginService } from './login.service';
import { appSettings } from '../app.config';

@Injectable({
  providedIn: 'root'
})
export class PagamentoService {

   private apiUrl = `${appSettings.apiBaseUrl}/pagamentos`;
  
    constructor(private http: HttpClient, private loginService: LoginService) { }
  
    listar(): Observable<Pagamento[]> {
        return this.http.get<Pagamento[]>(this.apiUrl,  this.loginService.gerarCabecalhoHTTP());
      }
    
      salvar(pagamento: Pagamento): Observable<Pagamento> {
        if (pagamento.id) {
          return this.http.put<Pagamento>(`${this.apiUrl}/${pagamento.id}`, pagamento, this.loginService.gerarCabecalhoHTTP());
        } else {
          return this.http.post<Pagamento>(this.apiUrl, pagamento, this.loginService.gerarCabecalhoHTTP());
        }
      }
    
      buscarPorId(id: number): Observable<Pagamento> {
        return this.http.get<Pagamento>(`${this.apiUrl}/${id}`, this.loginService.gerarCabecalhoHTTP());
      }
    
      excluir(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`, this.loginService.gerarCabecalhoHTTP());
      }

}
