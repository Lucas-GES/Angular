import { error } from '@angular/compiler/src/util';
import { ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef, BsModalService, ModalContainerComponent } from 'ngx-bootstrap/modal';
import { EMPTY } from 'rxjs';
import { empty, switchMap, take } from 'rxjs';
import { Subject } from 'rxjs';
import { catchError, Observable } from 'rxjs';
import { AlertModalService } from 'src/app/shared/alert-modal.service';
import { AlertModalComponent } from 'src/app/shared/alert-modal/alert-modal.component';
import { Curso } from '../curso';
import { Cursos2Service } from '../cursos2.service';

@Component({
  selector: 'app-cursos-lista',
  templateUrl: './cursos-lista.component.html',
  styleUrls: ['./cursos-lista.component.css'],
  preserveWhitespaces: true
})
export class CursosListaComponent implements OnInit {

  //cursos!: Curso[];

  //cursos!: Curso[];
  deleteModalRef!: BsModalRef;
  @ViewChild('deleteModal') deleteModal: any;

  cursos$!: Observable<Curso[]>;
  error$ = new Subject<boolean>();

  cursoSelecionado!: Curso;

  //bsModalRef!: BsModalRef;

  constructor(private service: Cursos2Service,
    private modalService: BsModalService,
    private alertService: AlertModalService,
    private modal: AlertModalService,
    private router: Router,
    private route: ActivatedRoute) { }

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

    //  this.service.list().subscribe(
    //    dados => {console.log(dados);
    //    },
    //    error => console.error(error),
    //    () => console.log('Observable completo')
    //  );
  }

  handleError(){
    this.alertService.showAlertDanger('Erro ao carregar cursos. Tente novamente mais tarde.');
    // this.bsModalRef = this.modalService.show(AlertModalComponent);
    // this.bsModalRef.content.type = 'danger';
    // this.bsModalRef.content.message = 'Erro ao carregar cursos. Tente novamente mais tarde.';
  }

  onEdit(id: any){
    this.router.navigate(['editar', id], { relativeTo: this.route});
  }

  onDelete(curso: any){
    this.cursoSelecionado = curso;
    //this.deleteModalRef = this.modalService.show(this.deleteModal, { class: 'modal-sm' });

    const result$ = this.alertService.showConfirm('Confirmacao', `Tem certeza que deseja remover ${ this.cursoSelecionado.nome }?`);
    result$.asObservable().pipe(
      take(1),
      switchMap(result => result ? this.service.remove(curso.id) : EMPTY)
    ).subscribe(
      success => {this.modal.showAlertSuccess(`Curso ${ this.cursoSelecionado.nome } removido com sucesso.`),
        this.onRefresh();
      },
      error => {
        this.alertService.showAlertDanger(`Erro ao remover curso ${ this.cursoSelecionado.nome } Tente novamente mais tarde.`);
      }
    );
  }

  onConfirmDelete(){
    this.service.remove(this.cursoSelecionado.id).subscribe(
      success => {this.modal.showAlertSuccess(`Curso ${ this.cursoSelecionado.nome } removido com sucesso.`),
        this.onRefresh();
        this.deleteModalRef.hide()
      },
      error => {
        this.alertService.showAlertDanger(`Erro ao remover curso ${ this.cursoSelecionado.nome } Tente novamente mais tarde.`);
        this.deleteModalRef.hide()
      }
    );
  }

  onDeclineDelete(){
    this.deleteModalRef.hide();
  }

}
//json-server --watch db.json