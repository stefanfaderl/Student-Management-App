import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
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
    this.studentsChanged.next(this.students.slice());
  }

  public getStudents() {
    return this.students.slice(); // return a copie of students array
  }

  public getStudent(name: string) {
    const index = this.students.map(object => object.studentName).indexOf(name); // return index of object with the relevant property
    return this.students[index];
  }

  public addStudent(student: Student) {
    this.students.push(student);
    this.studentsChanged.next(this.students.slice());
  }

  public updateStudent(studentName: string, newStudent: Student) {
    const index = this.students.map(object => object.studentName).indexOf(studentName);
    this.students[index] = newStudent;
    this.studentsChanged.next(this.students.slice());
  }

  public deleteStudent(studentName: string) {
    const index = this.students.map(object => object.studentName).indexOf(studentName);
    this.students.splice(index, 1);
    this.studentsChanged.next(this.students.slice());
  }
}
