import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, map, mergeMap, tap } from "rxjs/operators";
import { AuthService } from "../components/auth/auth.service";
import { StudentService } from "../services/student.service";
import { Student } from "./models/Student";

@Injectable({ providedIn: 'root' })

export class DataStorageService {

  constructor(
    private http: HttpClient,
    private studentService: StudentService,
    private authService: AuthService
  ) { }

  public createAndStoreStudent(studentData: Student) {
    const currentUserId = this.authService.getUserId();

    this.http.post<{ name: string }>(`https://student-management-app-743b9-default-rtdb.europe-west1.firebasedatabase.app/students/${currentUserId}.json`, studentData)
      .pipe(
        mergeMap(() => this.fetchStudents()),
        catchError(this.studentService.handleError))
      .subscribe(); //add usernode in db with studentdata as child
  }

  public fetchStudents() {
    const currentUserId = this.authService.getUserId();

    return this.http
      .get<{ [key: string]: Student }>(
        `https://student-management-app-743b9-default-rtdb.europe-west1.firebasedatabase.app/students/${currentUserId}.json`
      )
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
        catchError(this.studentService.handleError)
      );
  }

  public updateStudent(id: string, newStudent: Student) {
    const currentUserId = this.authService.getUserId();
    this.http
      .put<{ name: string }>(`https://student-management-app-743b9-default-rtdb.europe-west1.firebasedatabase.app/students/${currentUserId}/${id}.json`, newStudent)
      .pipe(
        mergeMap(() => this.fetchStudents()),
        catchError(this.studentService.handleError))
      .subscribe();
  }

  public deleteStudent(id: string) {
    const currentUserId = this.authService.getUserId();
    this.http
      .delete(`https://student-management-app-743b9-default-rtdb.europe-west1.firebasedatabase.app/students/${currentUserId}/${id}.json`)
      .pipe(
        mergeMap(() => this.fetchStudents()),
        catchError(this.studentService.handleError))
      .subscribe();
  }
}
