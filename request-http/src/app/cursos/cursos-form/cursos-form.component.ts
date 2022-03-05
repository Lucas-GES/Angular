import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

  constructor(private fb: FormBuilder, 
    private service: CursosService,
    private modal: AlertModalService,
    private location: Location) { }

  ngOnInit(): void {

    this.form = this.fb.group({
      nome: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(250)]]
    })

  }

  onSubmit(){
    this.submitted = true;
    if(this.form.valid){
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

  hasError(field: string){
    return this.form!.get(field)?.errors
  }

  onCancel(){
    this.submitted = false;
    this.form.reset();
  }

}
