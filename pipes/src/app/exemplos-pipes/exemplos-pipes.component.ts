import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-exemplos-pipes',
  templateUrl: './exemplos-pipes.component.html',
  styleUrls: ['./exemplos-pipes.component.css']
})
export class ExemplosPipesComponent implements OnInit {

  livro: any = {
    titulo: 'Java: como programar',
    rating:  4.94536,
    numeroPaginas: 556,
    preco: 295.20,
    dataLancamento: new Date(2016, 6, 19),
    url: 'https://www.amazon.com.br/Java-como-programar-Paul-Deitel-ebook/dp/B01IPIN4WO/ref=sr_1_2?crid=3JHTOBZEWYLH0&keywords=java&qid=1645723115&s=books&sprefix=Java%2Cstripbooks%2C232&sr=1-2'
  };

  livros: string[] = ['Angular', 'Java'];

  filtro: string = '';

  addCurso(valor: string){
    this.livros.push(valor);
  }

  obterCurso(){

    if(this.livros.length === 0 || this.filtro === undefined || this.filtro.trim() === ''){
      return this.livros;
    }

    return this.livros.filter((v: string) => {
      if(v.toLowerCase().indexOf(this.filtro.toLowerCase()) >= 0){
        return true;
      }
      return false;
    });
  }

  constructor() { }

  ngOnInit(): void {
  }

}
