import { Injectable } from "@angular/core";

@Injectable()
export class CursosService {

    private cursos: string[] = ['Angular', 'Java', 'HTML'];

    getCursos(){
        return this.cursos;
    }

    addCurso(curso: string){
        this.cursos.push(curso);
    }
}