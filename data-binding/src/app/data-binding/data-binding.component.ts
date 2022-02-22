import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-data-binding',
  templateUrl: './data-binding.component.html',
  styleUrls: ['./data-binding.component.css']
})
export class DataBindingComponent implements OnInit {

  url: string = 'http:luck.com'
  cursoAngular: boolean = true;
  urlImagem = 'https://upload.wikimedia.org/wikipedia/commons/f/f6/Pixel_DJ_Soft_Skull_%26_Headphones_-_Black_BG%3B_800%25_Pixel%3B_400x400.png'

  getValor(){
    return 1;
  }

  getCurtirCurso(){
    return true;
  }

  constructor() { }

  ngOnInit(): void {
  }

}
