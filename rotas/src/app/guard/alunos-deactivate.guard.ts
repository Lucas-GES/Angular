import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { AlunoFormComponent } from "../alunos/aluno-form/aluno-form.component";

@Injectable()
export class AlunosDeactivateGuard implements CanDeactivate<AlunoFormComponent>{
    
    canDeactivate(
        component: AlunoFormComponent,
        currentRoute: ActivatedRouteSnapshot, 
        currentState: RouterStateSnapshot
        ): boolean | Observable<boolean> | Promise<boolean> {
        
            
            return component.podeMudarRota();

    }

}