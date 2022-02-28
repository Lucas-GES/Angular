import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
//import { AlunoFormComponent } from "../alunos/aluno-form/aluno-form.component";
import { FormCanDeactivate } from "./form-candeactivate";

@Injectable()
export class AlunosDeactivateGuard implements CanDeactivate<FormCanDeactivate>{
    
    canDeactivate(
        component: FormCanDeactivate,
        currentRoute: ActivatedRouteSnapshot, 
        currentState: RouterStateSnapshot
        ): boolean | Observable<boolean> | Promise<boolean> {
        
            
            //return component.podeMudarRota();

            return component.podeDesativar();

    }

}