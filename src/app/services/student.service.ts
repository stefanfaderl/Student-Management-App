import { Injectable } from '@angular/core';
import { Student } from '../shared/models/Student';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
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
    return this.students.slice();
  }

  public createStudent() {
  }
}
