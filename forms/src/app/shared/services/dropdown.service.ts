import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cidade } from '../models/cidade';
import { EstadoBr } from '../models/estado-br';

@Injectable({
  providedIn: 'root'
})
export class DropdownService {

  constructor(private http: HttpClient) { }

  getEstadosBr(){
    return this.http.get<EstadoBr[]>('assets/dados/estadosbr.json').pipe();
  }

  getCidades(idEstado: number){
    return this.http.get<Cidade[]>('assets/dados/cidades.json').pipe();
  }

  getCargos(){
    return [
      { nome: 'Dev', nivel: 'Junior', desc: 'Dev Junior'},
      { nome: 'Dev', nivel: 'Pleno', desc: 'Dev Pleno'},
      { nome: 'Dev', nivel: 'Senior', desc: 'Dev Senior'}
    ]
  }

  getTecnologias(){

    return [
      { nome: 'java', desc: 'Java'},
      { nome: 'php', desc: 'Php'},
      { nome: 'ruby', desc: 'Ruby'},
      { nome: 'angular', desc: 'Angular'}
    ]
  }

  getNewsletter(){
    return [
      { valor: 's', desc: 'Sim'},
      { valor: 'n', desc: 'Não'}
    ]
  }
}
