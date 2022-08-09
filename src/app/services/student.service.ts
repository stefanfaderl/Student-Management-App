import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Student } from '../shared/models/Student';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  studentsChanged = new Subject<Student[]>();

  private students: Student[] = [
    new Student(
      'Hansi',
      2,
      'Behamberg',
      'Super'
    ),
    new Student(
      'Franz',
      3,
      'Haidershofen',
      'Unpünktlich'
    ),
    new Student(
      'Sissi',
      3,
      'Haidershofen',
      'Gut'
    ),
    new Student(
      'Bert',
      4,
      'Behamberg',
      'Super'
    ),
    new Student(
      'Marie',
      1,
      'Ernsthofen',
      'Super'
    )
  ];

  constructor() { }

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
    console.log(this.students);
  }

  public updateStudent(studentName: string, newStudent: Student) {
    const index = this.students.map(object => object.studentName).indexOf(studentName);
    this.students[index] = newStudent;
    this.studentsChanged.next(this.students.slice());
    console.log(this.students);
  }

  public deleteStudent(studentName: string) {
    const index = this.students.map(object => object.studentName).indexOf(studentName);
    this.students.splice(index, 1);
    this.studentsChanged.next(this.students.slice());
  }
}
