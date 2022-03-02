import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { map } from 'rxjs';

@Component({
  selector: 'app-data-form',
  templateUrl: './data-form.component.html',
  styleUrls: ['./data-form.component.css']
})
export class DataFormComponent implements OnInit {

  formulario!: FormGroup;

  constructor(private formBuilder: FormBuilder, private http: HttpClient) { }

  ngOnInit(){

    // this.formulario = new FormGroup({
    //   nome: new FormControl(null),
    //   email: new FormControl(null),
    // });

    this.formulario = this.formBuilder.group({
      nome: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      
      endereco: this.formBuilder.group({
        cep: [null, Validators.required],
        numero: [null, Validators.required],
        complemento: [null],
        rua: [null, Validators.required],
        bairro: [null, Validators.required],
        cidade: [null, Validators.required],
        estado: [null, Validators.required]
      })        
    });

  }

  onSubmit(){
    console.log(this.formulario);

    this.http.post('https://httpbin.org/post', JSON.stringify(this.formulario.value))
    .pipe(map(res => res)).subscribe(dados => {
      console.log(dados)
      // this.formulario.reset();
      this.resetar();
    },
    (error: any) => alert('erro'));
  }

  resetar(){
    this.formulario.reset();
  }

  verificaValidTouched(campo: any){
    return !this.formulario.get(campo)?.valid && !!this.formulario.get(campo)?.touched
  }

  verificaEmailInvalido(){
    let campoEmail = this.formulario.get('email');
    if(campoEmail?.errors){
      return campoEmail.errors['email'] && campoEmail.touched;
    }
  }

  aplicaCssErro(campo:any){
    return { 
      'has-erro': this.verificaValidTouched(campo),
      'has-feedback': this.verificaValidTouched(campo)}
  }

  consultaCEP(){

    let cep = this.formulario.get('endereco.cep')?.value;

    cep = cep.replace(/\D/g, '');

    if(cep != null && cep != ""){
      //Expressão regular para validar o CEP.
      let validacep = /^[0-9]{8}$/;

      //Valida o formato do CEP.
      if(validacep.test(cep)) {

        this.resetaDadosForm();
        
        this.http.get(`//viacep.com.br/ws/${cep}/json/`)
        .pipe(map((dados: any) => dados)).subscribe(dados => this.populaDadosForm(dados))
      }
    }
  }

  populaDadosForm(dados: any){
   
    this.formulario.patchValue({
      endereço: {
        rua: dados.logradouro,
        //cep: dados.cep,        
        complemento: dados.complemento,
        bairro: dados.bairro,
        cidade: dados.localidade,
        estado: dados.uf
      }
    });
  }

  resetaDadosForm(){
    this.formulario.patchValue({
      endereço: {
        rua: null,      
        complemento: null,
        bairro: null,
        cidade: null,
        estado: null
      }
    });
  }

}
