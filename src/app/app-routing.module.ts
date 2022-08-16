import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './components/auth/auth.component';
import { AuthGuard } from './components/auth/auth.guard';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ProfilComponent } from './components/profil/profil.component';
import { AddStudentComponent } from './components/students/add-student/add-student.component';
import { EditStudentComponent } from './components/students/edit-student/edit-student.component';
import { StudentsComponent } from './components/students/students.component';
import { ViewStudentComponent } from './components/students/view-student/view-student.component';
import { ToDosComponent } from './components/to-dos/to-dos.component';
import { StudentResolverService } from './services/student-resolver.service';

const routes: Routes = [
  { path: '', redirectTo: '/students', pathMatch: 'full' },
  { path: 'students', component: StudentsComponent, canActivate: [AuthGuard] },
  { path: 'students/add', component: AddStudentComponent, canActivate: [AuthGuard] },
  { path: 'students/edit/:id', component: EditStudentComponent, resolve: [StudentResolverService], canActivate: [AuthGuard] },
  { path: 'students/view/:id', component: ViewStudentComponent, resolve: [StudentResolverService], canActivate: [AuthGuard] },
  { path: 'to-dos', component: ToDosComponent, canActivate: [AuthGuard] },
  { path: 'my-profile', component: ProfilComponent, canActivate: [AuthGuard] },
  { path: 'auth', component: AuthComponent },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
