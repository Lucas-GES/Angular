import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
//import { AlunosModule } from './alunos/alunos.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AlunosGuard } from './guard/alunos.guard';
import { AuthGuard } from './guard/auth.guard';
import { CursosGuard } from './guard/cursos.guard';
//import { CursosModule } from './cursos/cursos.module';
import { HomeComponent } from './home/home.component';
import { AuthService } from './login/auth.service';
import { LoginComponent } from './login/login.component';
import { PaginaNaoEncontradaComponent } from './pagina-nao-encontrada/pagina-nao-encontrada.component';
//import { AlunosComponent } from './alunos/alunos.component';
// import { CursosComponent } from './cursos/cursos.component';
// import { CursoDetalheComponent } from './cursos/curso-detalhe/curso-detalhe.component';
// import { CursosService } from './cursos/cursos.service';
// import { CursoNaoEncontradoComponent } from './cursos/curso-nao-encontrado/curso-nao-encontrado.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    PaginaNaoEncontradaComponent,
    // AlunosComponent,
    // CursosComponent,
    // CursoDetalheComponent,
    // CursoNaoEncontradoComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    //CursosModule,
    //AlunosModule,
    AppRoutingModule
  ],
  providers: [AuthService, AuthGuard, CursosGuard, AlunosGuard],
  // providers: [CursosService],
  bootstrap: [AppComponent]
})
export class AppModule { }
