import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { map } from 'rxjs';
import { EstadoBr } from '../shared/models/estado-br';
import { DropdownService } from '../shared/services/dropdown.service';

@Component({
  selector: 'app-data-form',
  templateUrl: './data-form.component.html',
  styleUrls: ['./data-form.component.css']
})
export class DataFormComponent implements OnInit {

  formulario!: FormGroup;
  estados!: EstadoBr[];

  constructor(
    private formBuilder: FormBuilder, 
    private http: HttpClient,
    private dropDownService: DropdownService) { }

  ngOnInit(){    
    this.dropDownService.getEstadosBr()
      .subscribe(dados => {this.estados = dados; console.log(dados);});

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
    if(this.formulario.valid){
      this.http.post('https://httpbin.org/post', JSON.stringify(this.formulario.value))
      .pipe(map(res => res)).subscribe(dados => {
        //console.log(dados)
        // this.formulario.reset();
        //this.resetar();
      },
      (error: any) => alert('erro'));
    }else{
      console.log('formulário inválido');
      this.verificaValidacoesForm(this.formulario);
    }

   
  }

  verificaValidacoesForm(formGroup: FormGroup){
    Object.keys(formGroup.controls).forEach(campo => {
      const controle = formGroup.get(campo);
      controle?.markAsDirty();
      if(controle instanceof FormGroup){
        this.verificaValidacoesForm(controle);
      }
    });
  }

  resetar(){
    this.formulario.reset();
  }

  verificaValidTouched(campo: any){
    return !this.formulario.get(campo)?.valid && (!!this.formulario.get(campo)?.touched || !!this.formulario.get(campo)?.dirty) 
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

    if(cep != null && cep !== ""){
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
