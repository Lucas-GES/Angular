import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';

@Component({
  selector: 'app-template-form',
  templateUrl: './template-form.component.html',
  styleUrls: ['./template-form.component.css']
})
export class TemplateFormComponent implements OnInit {

  usuario: any = {
    nome: null,
    email: null
  }

  onSubmit(form: any){
    console.log(form);
    //console.log(this.usuario)

    this.http.post('https://httpbin.org/post', JSON.stringify(form.value))
    .pipe(map(res => res)).subscribe(dados => {
      console.log(dados)
      form.form.reset();
    });
  }

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  verificaValidTouched(campo: any){
    return !campo.valid && campo.touched;
  }

  aplicaCssErro(campo:any){
    return { 'has-erro': this.verificaValidTouched(campo),
            'has-feedback': this.verificaValidTouched(campo)}
  }

  consultaCEP(cep: any, form: any){
    cep = cep.replace(/\D/g, '');

    if(cep != null && cep != ""){
      //Expressão regular para validar o CEP.
      let validacep = /^[0-9]{8}$/;

      //Valida o formato do CEP.
      if(validacep.test(cep)) {

        this.resetaDadosForm(form);
        
        this.http.get(`//viacep.com.br/ws/${cep}/json/`)
        .pipe(map((dados: any) => dados)).subscribe(dados => this.populaDadosForm(dados, form))
      }
    }
  }

  populaDadosForm(dados: any, formulario: any){
    // formulario.setValue({
    //   name: formulario.value.name,
    //   email: formulario.value.email,
    //   endereço: {
    //     rua: dados.logradouro,
    //     cep: dados.cep,
    //     numero: '',
    //     complemento: dados.complemento,
    //     bairro: dados.bairro,
    //     cidade: dados.localidade,
    //     estado: dados.uf
    //   }
    // });

    formulario.form.patchValue({
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

  resetaDadosForm(formulario: { form: { patchValue: (arg0: { endereço: { rua: null; complemento: null; bairro: null; cidade: null; estado: null; }; }) => void; }; }){
    formulario.form.patchValue({
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
