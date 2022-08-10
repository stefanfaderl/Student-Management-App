
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, tap } from "rxjs/operators";
import { StudentService } from "../services/student.service";
import { Student } from "./models/Student";

@Injectable({ providedIn: 'root' })

export class DataStorageService {

  constructor(
    private http: HttpClient,
    private studentService: StudentService
  ) { }

  public storeStudents() {
    const students = this.studentService.getStudents();
    this.http
      .put(
        'https://student-management-app-743b9-default-rtdb.europe-west1.firebasedatabase.app/students.json',
        students
      )
      .subscribe(response => {
      }) // post request for one student, put request for all students, any previous students data would be overwritten
  }

  public fetchStudents() {
    return this.http
      .get<Student[]>('https://student-management-app-743b9-default-rtdb.europe-west1.firebasedatabase.app/students.json')
      .pipe(
        tap(students => {
          this.studentService.setStudents(students);
        })
      );
  }
}

