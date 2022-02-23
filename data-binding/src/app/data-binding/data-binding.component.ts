import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-data-binding',
  templateUrl: './data-binding.component.html',
  //styleUrls: ['./data-binding.component.css']
  styles: [    `
    .highlight{
      background-color: yellow;
      font-weight: bold;
  }
    `
  ]
})
export class DataBindingComponent implements OnInit {

  url: string = 'http:luck.com'
  cursoAngular: boolean = true;
  urlImagem = 'https://upload.wikimedia.org/wikipedia/commons/f/f6/Pixel_DJ_Soft_Skull_%26_Headphones_-_Black_BG%3B_800%25_Pixel%3B_400x400.png'

  valorAtual: string = '';
  valorSalvo = '';

  isMouseOver: boolean = false;

  

  getValor(){
    return 1;
  }

  getCurtirCurso(){
    return true;
  }

  botaoClicado(){
    alert('Botao Clicado');
  }

  onKeyUp(evento: KeyboardEvent){
    this.valorAtual = (<HTMLInputElement>evento.target).value
  }

  salvarValor(valor: any){
    this.valorSalvo = valor;
  }

  onMouseOverOut(){
    this.isMouseOver = !this.isMouseOver;
  }

  constructor() { }

  ngOnInit(): void {
  }

}
