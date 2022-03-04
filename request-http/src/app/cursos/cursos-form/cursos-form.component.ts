import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-cursos-form',
  templateUrl: './cursos-form.component.html',
  styleUrls: ['./cursos-form.component.css']
})
export class CursosFormComponent implements OnInit {

  form!: FormGroup;
  submitted: boolean = false; 

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {

    this.form = this.fb.group({
      nome: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(250)]]
    })

  }

  onSubmit(){
    this.submitted = true;
    if(this.form.valid){
      console.log('submit')
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
