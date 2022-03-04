import { error } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService, ModalContainerComponent } from 'ngx-bootstrap/modal';
import { empty } from 'rxjs';
import { Subject } from 'rxjs';
import { catchError, Observable } from 'rxjs';
import { AlertModalService } from 'src/app/shared/alert-modal.service';
import { AlertModalComponent } from 'src/app/shared/alert-modal/alert-modal.component';
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
  //bsModalRef!: BsModalRef;

  constructor(private service: CursosService,
    // private modalService: BsModalService
    private alertService: AlertModalService) { }

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
         //this.error$.next(true);
         this.handleError();
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

  handleError(){
    this.alertService.showAlertDanger('Erro ao carregar cursos. Tente novamente mais tarde.');
    // this.bsModalRef = this.modalService.show(AlertModalComponent);
    // this.bsModalRef.content.type = 'danger';
    // this.bsModalRef.content.message = 'Erro ao carregar cursos. Tente novamente mais tarde.';
  }

}
