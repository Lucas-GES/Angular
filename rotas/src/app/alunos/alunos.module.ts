import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";

import { AlunosComponent } from "./alunos.component";
import { AlunoFormComponent } from './aluno-form/aluno-form.component';
import { AlunoDetalheComponent } from './aluno-detalhe/aluno-detalhe.component';
import { AlunosRoutingModule } from "./alunos.routing.module";
import { AlunosService } from "./alunos.service";
import { AlunosDeactivateGuard } from "../guard/alunos-deactivate.guard";
import { AlunoDetalheResolver } from "./guard/aluno-detalhe.resolver";


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        AlunosRoutingModule
    ],
    exports: [],
    declarations: [
        AlunosComponent,
         AlunoFormComponent,
          AlunoDetalheComponent],
    providers: [AlunosService, AlunosDeactivateGuard, AlunoDetalheResolver]
})

export class AlunosModule {}