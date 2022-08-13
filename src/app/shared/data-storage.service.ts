
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, map, mergeMap, tap } from "rxjs/operators";
import { StudentService } from "../services/student.service";
import { Student } from "./models/Student";

@Injectable({ providedIn: 'root' })

export class DataStorageService {

  constructor(
    private http: HttpClient,
    private studentService: StudentService
  ) { }

  public createAndStoreStudent(studentData: Student) {
    return this.http.post<{ name: string }>('https://student-management-app-743b9-default-rtdb.europe-west1.firebasedatabase.app/students.json', studentData)
      .pipe(
        mergeMap(() => this.fetchStudents()
        ));
    // post request for one student, put request for all students, any previous students data would be overwritten
  }

  public fetchStudents() {
    return this.http
      .get<{ [key: string]: Student }>('https://student-management-app-743b9-default-rtdb.europe-west1.firebasedatabase.app/students.json')
      .pipe(
        map(responseData => {
          const studentsArray: Student[] = [];
          for (const key in responseData) {
            if (responseData.hasOwnProperty(key)) {
              studentsArray.push({ ...responseData[key], id: key });
            }
          }
          return studentsArray;
        }),
        tap(students => {
          this.studentService.setStudents(students)
        }),
        catchError(this.studentService.handleError));
  }

  public deleteStudent(id: string) {
    return this.http
      .delete<{ [key: string]: Student }>(`https://student-management-app-743b9-default-rtdb.europe-west1.firebasedatabase.app/students/${id}.json`)
      .pipe(
        catchError(this.studentService.handleError));
  }
}
