import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { AlunosDeactivateGuard } from "../guard/alunos-deactivate.guard";
import { AlunosGuard } from "../guard/alunos.guard";
import { AlunoDetalheComponent } from "./aluno-detalhe/aluno-detalhe.component";
import { AlunoFormComponent } from "./aluno-form/aluno-form.component";
import { AlunosComponent } from "./alunos.component";
import { AlunoDetalheResolver } from "./guard/aluno-detalhe.resolver";

const alunosRoutes = [
    { path: '', component: AlunosComponent, 
    canActivateChild: [AlunosGuard],
    children : [
        { path: 'novo', component: AlunoFormComponent},
        { path: ':id', component: AlunoDetalheComponent,
            resolve: { aluno : AlunoDetalheResolver }
        },
        { path: ':id/editar', component: AlunoFormComponent,
            canDeactivate: [AlunosDeactivateGuard]
        }, 
    ]},   
];

@NgModule({
    imports: [RouterModule.forChild(alunosRoutes)],
    exports: [RouterModule]
})

export class AlunosRoutingModule {}