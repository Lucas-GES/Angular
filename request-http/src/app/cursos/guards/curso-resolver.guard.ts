import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Resolve, RouterStateSnapshot, UrlTree } from '@angular/router';
import { of } from 'rxjs';
import { Observable } from 'rxjs';
import { Curso } from '../curso';
import { CursosService } from '../cursos.service';

@Injectable({
  providedIn: 'root'
})
export class CursoResolverGuard implements Resolve<Curso> {
  
  constructor(private service : CursosService){}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Curso | Observable<Curso> | Promise<Curso> | Observable<any>{
    
    if(route.params && route.params['id']){
      return this.service.loadByID(route.params['id']);
    }

    return of({
      id: null,
      nome: null
    });    
  }  
}
