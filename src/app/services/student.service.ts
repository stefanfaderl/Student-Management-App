import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, throwError } from 'rxjs';
import { Student } from '../shared/models/Student';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private students: Student[] = [];
  studentsChanged = new Subject<Student[]>();

  /*   private students: Student[] = [
      new Student(
        'Hansi',
        'Behamberg',
        2,
        'Super'
      ),
      new Student(
        'Franz',
        'Haidershofen',
        3,
        'Unpünktlich'
      ),
      new Student(
        'Sissi',
        'Haidershofen',
        3,
        'Gut'
      ),
      new Student(
        'Bert',
        'Behamberg',
        4,
        'Super'
      ),
      new Student(
        'Marie',
        'Ernsthofen',
        1,
        'Super'
      )
    ]; */

  constructor() { }

  public setStudents(students: Student[]) { // overwrite students
    this.students = students;
    this.studentsChanged.next(this.students);
  }

  public getStudents() {
    return this.students.slice(); // return a copie of students array
  }

  public getStudent(name: string) {
    const index = this.students.map(object => object.studentName).indexOf(name); // return index of object with the relevant property
    return this.students[index];
  }

  public updateStudent(studentName: string, newStudent: Student) {
    const index = this.students.map(object => object.studentName).indexOf(studentName);
    this.students[index] = newStudent;
    this.studentsChanged.next(this.students.slice());
  }

  public handleError(error: HttpErrorResponse) {
    let errorMessage: string = '';

    if (error.error instanceof ErrorEvent) {
      // client Error
      errorMessage = `CLIENT ERROR: ${error.name} ${error.status} ${error.statusText}`
    } else {
      // server Error
      errorMessage = `SERVER ERROR: ${error.name} ${error.status} ${error.statusText}`;
    }
    return throwError(errorMessage);
  }
}
