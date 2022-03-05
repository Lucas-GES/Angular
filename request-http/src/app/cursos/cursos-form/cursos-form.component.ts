import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap } from 'rxjs';
import { AlertModalService } from 'src/app/shared/alert-modal.service';
import { CursosService } from '../cursos.service';

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
    private service: CursosService,
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

    this.route.params
    .pipe(
      map((params: any) => params['id']),
      switchMap(id => this.service.loadByID(id)),
      // switchMap(cursos => obterAulas)
    )
    .subscribe(curso => this.updateForm(curso));

    // concatMap => ordem da requisição importa
    // mergeMap => ordem não importa
    // exhaustMap => casos de login

    this.form = this.fb.group({
      id: [null],
      nome: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(250)]]
    })

  }

  updateForm(curso: any){
    this.form.patchValue({
      id: curso.id,
      nome: curso.nome
    })
  }

  onSubmit() {
    this.submitted = true;
    if (this.form.valid) {
      console.log('submit')
      this.service.create(this.form.value).subscribe(
        success => {
          this.modal.showAlertSuccess('Criado com sucesso!');
          this.location.back();
        },
        error => this.modal.showAlertDanger('Erro ao criar curso, tente novamente!'),
        () => console.log('request completo')
      );
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
