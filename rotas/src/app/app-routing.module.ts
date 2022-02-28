import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlunosGuard } from './guard/alunos.guard';
import { AuthGuard } from './guard/auth.guard';
import { CursosGuard } from './guard/cursos.guard';

//import { CursoDetalheComponent } from './cursos/curso-detalhe/curso-detalhe.component';
//import { CursoNaoEncontradoComponent } from './cursos/curso-nao-encontrado/curso-nao-encontrado.component';
//import { CursosComponent } from './cursos/cursos.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: 'cursos', 
    loadChildren: () => import('./cursos/cursos.module').then(m => m.CursosModule),
    canActivate: [AuthGuard],
    canActivateChild: [CursosGuard],
    canLoad: [AuthGuard]  
  },
  { path: 'alunos',
    loadChildren: () => import('./alunos/alunos.module').then(m => m.AlunosModule),
    canActivate: [AuthGuard],
    canLoad: [AuthGuard]
    //canActivateChild: [AlunosGuard]
  },
  //{ path: 'cursos', component: CursosComponent},
  //{ path: 'curso/:id', component: CursoDetalheComponent},
  { path: 'login', component: LoginComponent},
  //{ path: 'naoEncontrado', component: CursoNaoEncontradoComponent},
  { path: '', component: HomeComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  declarations:[]
})
export class AppRoutingModule { }
