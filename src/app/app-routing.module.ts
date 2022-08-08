import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ProfilComponent } from './components/profil/profil.component';
import { AddStudentComponent } from './components/students/add-student/add-student.component';
import { EditStudentComponent } from './components/students/edit-student/edit-student.component';
import { StudentsComponent } from './components/students/students.component';
import { ViewStudentComponent } from './components/students/view-student/view-student.component';
import { ToDosComponent } from './components/to-dos/to-dos.component';

const routes: Routes = [
  { path: '', redirectTo: 'students', pathMatch: 'full' },
  { path: 'students', component: StudentsComponent },
  { path: 'students/add', component: AddStudentComponent },
  { path: 'students/edit/:studentName', component: EditStudentComponent },
  { path: 'students/view/:name', component: ViewStudentComponent },
  { path: 'to-dos', component: ToDosComponent },
  { path: 'my-profile', component: ProfilComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
