import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap } from 'rxjs';
import { AlertModalService } from 'src/app/shared/alert-modal.service';
import { Cursos2Service } from '../cursos2.service';

@Component({
  selector: 'app-cursos-form',
  templateUrl: './cursos-form.component.html',
  styleUrls: ['./cursos-form.component.css']
})
export class CursosFormComponent implements OnInit {

  form!: FormGroup;
  submitted: boolean = false;

  constructor(
    private fb: FormBuilder,
    private service: Cursos2Service,
    private modal: AlertModalService,
    private location: Location,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {

    // this.route.params.subscribe(
    //   (params: any) => {
    //     const id = params['id'];
    //     console.log(id);
    //     const curso$ = this.service.loadByID(id);
    //     curso$.subscribe(curso => {
    //       this.updateForm(curso);
    //     })
    //   }
    // )

    // this.route.params
    // .pipe(
    //   map((params: any) => params['id']),
    //   switchMap(id => this.service.loadByID(id)),
    //   // switchMap(cursos => obterAulas)
    // )
    // .subscribe(curso => this.updateForm(curso));

    // concatMap => ordem da requisição importa
    // mergeMap => ordem não importa
    // exhaustMap => casos de login

    const curso = this.route.snapshot.data['curso'];

    this.form = this.fb.group({
      id: [curso.id],
      nome: [curso.nome, [Validators.required, Validators.minLength(3), Validators.maxLength(250)]]
    });

  }

  // updateForm(curso: any){
  //   this.form.patchValue({
  //     id: curso.id,
  //     nome: curso.nome
  //   })
  // }

  onSubmit() {
    this.submitted = true;
    if (this.form.valid) {
      console.log('submit');

      let msgSuccess = 'Curso criado com sucesso!';
      let msgError = 'Erro ao criar curso, tente novamente!'
      if(this.form.value.id){
        msgSuccess = 'Curso atualizado com sucesso!';
        msgError = 'Erro ao atualizar curso, tente novamente!'
      }

      this.service.save(this.form.value).subscribe(
        success => {
          this.modal.showAlertSuccess(msgSuccess);
          this.location.back();
        },
        error => {this.modal.showAlertDanger(msgError)}
      );

      // if(this.form.value.id){
      //   //update
      //   this.service.update(this.form.value).subscribe(
      //     success => {
      //       this.modal.showAlertSuccess('Curso atualizado com sucesso!');
      //       this.location.back();
      //     },
      //     error => this.modal.showAlertDanger('Erro ao atualizar curso, tente novamente!'),
      //     () => console.log('request completo')
      //   );
      // }else{
      //   this.service.create(this.form.value).subscribe(
      //     success => {
      //       this.modal.showAlertSuccess('Criado com sucesso!');
      //       this.location.back();
      //     },
      //     error => this.modal.showAlertDanger('Erro ao criar curso, tente novamente!'),
      //     () => console.log('request completo')
      //   );
      // }
      
    }
  }

  hasError(field: string) {
    return this.form!.get(field)?.errors
  }

  onCancel() {
    this.submitted = false;
    this.form.reset();
  }

}
