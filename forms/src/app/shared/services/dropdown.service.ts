import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EstadoBr } from '../models/estado-br';

@Injectable({
  providedIn: 'root'
})
export class DropdownService {

  constructor(private http: HttpClient) { }

  getEstadosBr(){
    return this.http.get<EstadoBr[]>('assets/dados/estadosbr.json').pipe();
  }

  getCargos(){
    return [
      { nome: 'Dev', nivel: 'Junior', desc: 'Dev Junior'},
      { nome: 'Dev', nivel: 'Pleno', desc: 'Dev Pleno'},
      { nome: 'Dev', nivel: 'Senior', desc: 'Dev Senior'}
    ]
  }
}
