import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { map, Observable } from 'rxjs';
import { EstadoBr } from '../shared/models/estado-br';
import { ConsultaCepService } from '../shared/services/consulta-cep.service';
import { DropdownService } from '../shared/services/dropdown.service';

@Component({
  selector: 'app-data-form',
  templateUrl: './data-form.component.html',
  styleUrls: ['./data-form.component.css']
})
export class DataFormComponent implements OnInit {

  formulario!: FormGroup;
  // estados!: EstadoBr[];
  // estados!: EstadoBr[];
  estados!: Observable<EstadoBr[]>;
  cargos!: any[];

  constructor(
    private formBuilder: FormBuilder, 
    private http: HttpClient,
    private dropDownService: DropdownService,
    private cepService: ConsultaCepService) { }

  ngOnInit(){    

    this.estados = this.dropDownService.getEstadosBr();

    this.cargos = this.dropDownService.getCargos();
    // this.dropDownService.getEstadosBr().subscribe(dados => {
    //     this.estados = dados;
    //      console.log(dados);
    //     });

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
      }),
      
      cargo: [null]
    });


  }

  onSubmit(){
    console.log(this.formulario);
    if(this.formulario.valid){
      this.http.post('https://httpbin.org/post', JSON.stringify(this.formulario.value))
      .subscribe(dados => {
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

    if(cep != null && cep !== ''){
      this.cepService.consultaCEP(cep)?.
      subscribe(dados => this.populaDadosForm(dados));
    }

  }

  populaDadosForm(dados: any){
   
    this.formulario.patchValue({
      endereco: {
        cep: dados.cep,
        rua: dados.logradouro,                
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

  setarCargo(){
    const cargo = { nome: 'Dev', nivel: 'Pleno', desc: 'Dev Pleno'};
    this.formulario.get('cargo')?.setValue(cargo);
  }

  compararCargos(obj1: { nome: any; nivel: any; }, obj2: { nome: any; nivel: any; }){
    return obj1 && obj2 ? (obj1.nome === obj2.nome && obj1.nivel === obj2.nivel) : obj1 === obj2;
  }

}
