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
    console.log(this.usuario)
  }

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  aplicaCssErro(campo: { valid: any; touched: any; }){
    return { 'is-valid': campo.valid && campo.touched,
            'is-invalid': !campo.valid && campo.touched}
  }

  consultaCEP(cep: any){
    cep = cep.replace(/\D/g, '');

    if(cep != null && cep != ""){
      //Expressão regular para validar o CEP.
      let validacep = /^[0-9]{8}$/;

      //Valida o formato do CEP.
      if(validacep.test(cep)) {
        
        this.http.get(`//viacep.com.br/ws/${cep}/json/`)
        .pipe(map((dados: any) => dados)).subscribe(dados => console.log(dados))
      }
    }
  }

}
