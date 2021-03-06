import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { empty } from 'rxjs';
import { EMPTY } from 'rxjs';
import { distinctUntilChanged, map, Observable, switchMap, tap } from 'rxjs';
import { BaseFormComponent } from '../shared/base-form/base-form.component';
import { FormValidations } from '../shared/form-validations';
import { Cidade } from '../shared/models/cidade';
import { EstadoBr } from '../shared/models/estado-br';
import { ConsultaCepService } from '../shared/services/consulta-cep.service';
import { DropdownService } from '../shared/services/dropdown.service';
import { VerificaEmailService } from './services/verifica-email.service';

@Component({
  selector: 'app-data-form',
  templateUrl: './data-form.component.html',
  styleUrls: ['./data-form.component.css']
})
export class DataFormComponent extends BaseFormComponent implements OnInit {
  
  //formulario!: FormGroup;
  // estados!: EstadoBr[];
  estados!: EstadoBr[];
  cidades!: Cidade[];
  //estados!: Observable<EstadoBr[]>;
  cargos!: any[];
  tecnologias!: any[];
  newsletterOp!: any[];

  frameworks = ['Angular', 'React', 'Vue', 'Sencha'];

  constructor(
    private formBuilder: FormBuilder, 
    private http: HttpClient,
    private dropDownService: DropdownService,
    private cepService: ConsultaCepService,
    private verificaEmailService: VerificaEmailService) { 
      super();
    }

  override ngOnInit(){ 
    
    //this.verificaEmailService.verificaEmail('').subscribe();

    //this.estados = this.dropDownService.getEstadosBr();
    this.dropDownService.getEstadosBr()
      .subscribe(dados => this.estados = dados);

    this.cargos = this.dropDownService.getCargos();
    this.tecnologias = this.dropDownService.getTecnologias();
    this.newsletterOp = this.dropDownService.getNewsletter();
    // this.dropDownService.getEstadosBr().subscribe(dados => {
    //     this.estados = dados;
    //      console.log(dados);
    //     });

    // this.formulario = new FormGroup({
    //   nome: new FormControl(null),
    //   email: new FormControl(null),
    // });

    this.formulario = this.formBuilder.group({
      nome: [null, [Validators.required, Validators.minLength(3)]],
      email: [null, [Validators.required, Validators.email], [this.validarEmail.bind(this)]],
      confirmarEmail: [null, [Validators.required, FormValidations.equalsTo('email')]],
      
      endereco: this.formBuilder.group({
        cep: [null, [Validators.required, FormValidations.cepValidator]],
        numero: [null, Validators.required],
        complemento: [null],
        rua: [null, Validators.required],
        bairro: [null, Validators.required],
        cidade: [null, Validators.required],
        estado: [null, Validators.required]
      }),
      
      cargo: [null],
      tecnologias: [null],
      newsletter: ['s'],
      termos: [null, Validators.pattern('true')],
      frameworks: this.buildFrameworks()
    });

    this.formulario.get('endereco.cep')?.statusChanges
    .pipe(
      distinctUntilChanged(),
      tap(value => console.log('valor CEP: ', value)),
      switchMap(status => status === 'VALID' ?
        this.cepService.consultaCEP(this.formulario.get('endereco.cep')?.value)
        : EMPTY)
      ).subscribe(dados => dados ? this.populaDadosForm(dados) : {});
    
    
    
    this.formulario.get('endereco.estado')?.valueChanges
      .pipe(
        tap(estado => console.log('Novo estado: ', estado)),
        map(estado = this.estados.filter(e => e.sigla === estado)),
        map(estados => estados && estados.length > 0 ? estados[0].id : EMPTY),
        switchMap((estadoId) => this.dropDownService.getCidades(estadoId)),
        tap(console.log)
      )
      .subscribe((cidades: Cidade[]) => this.cidades = cidades);

    //this.dropDownService.getCidades(8).subscribe();
  }

  buildFrameworks(){
    const values = this.frameworks.map(v => new FormControl(false));
    return this.formBuilder.array(values, FormValidations.requiredMinCheckbox(1));
  }


  getFrameworksControls(){
    return this.formulario.get('frameworks')?
    (<FormArray>this.formulario.get('frameworks')).controls : null;
  }

  submit() {
    console.log(this.formulario);

    let valueSubmit = Object.assign({}, this.formulario.value);

    valueSubmit = Object.assign(valueSubmit, {
      frameworks: valueSubmit.frameworks.
        map((v: any, i: number) => v ? this.frameworks[i] : null)
        .filter((v: any) => v !== null)
    });

    console.log(valueSubmit);

    this.http.post('https://httpbin.org/post', JSON.stringify({}))
      .subscribe(dados => {
        console.log(dados);
        // next: (res) => console.log(res),
        // error: (e) => alert('erro'),
        // complete: () => this.formulario.reset()
      },
      (error: any) => alert('erro')  
    );
      
    
  }

  consultaCEP(){

    const cep = this.formulario.get('endereco.cep')?.value;

    if(cep != null && cep !== ''){
      this.cepService.consultaCEP(cep).
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
      endere??o: {
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

  setarTecnologia(){
    this.formulario.get('tecnologias')?.setValue(['java', 'php', 'angular']);
  }

  validarEmail(formControl: FormControl){
    return this.verificaEmailService.verificaEmail(formControl.value)
    .pipe(map(emailExiste => emailExiste ? { emailInvalido: true } : null));
  }

}

