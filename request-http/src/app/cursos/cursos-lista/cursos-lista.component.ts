import { error } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { empty } from 'rxjs';
import { Subject } from 'rxjs';
import { catchError, Observable } from 'rxjs';
import { Curso } from '../curso';
import { CursosService } from '../cursos.service';

@Component({
  selector: 'app-cursos-lista',
  templateUrl: './cursos-lista.component.html',
  styleUrls: ['./cursos-lista.component.css'],
  preserveWhitespaces: true
})
export class CursosListaComponent implements OnInit {

  //cursos!: Curso[];

  cursos$!: Observable<Curso[]>;
  error$ = new Subject<boolean>();

  constructor(private service: CursosService) { }

  ngOnInit(): void {
    //this.service.list().subscribe(dados => this.cursos = dados);
  
    this.onRefresh();

  }

  onRefresh(){
    this.cursos$ = this.service.list()
     .pipe(
      //  map(),
      //  tap(),
      //  switchMap(),
       catchError(error => {
         console.error(error);
         this.error$.next(true);
         return empty();
       })
     );

     this.service.list().subscribe(
       dados => {console.log(dados);
       },
      //  error => console.error(error),
      //  () => console.log('Observable completo')
     );
  }

}
