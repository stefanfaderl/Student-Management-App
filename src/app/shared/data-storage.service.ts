
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { StudentService } from "../services/student.service";

@Injectable({ providedIn: 'root' })
export class DataStorageService {
  constructor(
    private http: HttpClient,
    private studentService: StudentService
  ) { }
  storeStudents() {
    const student = this.studentService.getStudents();
    this.http.put('https://student-management-app-743b9-default-rtdb.europe-west1.firebasedatabase.app/students.json', student)
      .subscribe(response => {
        console.log(response);
      }) // put request, any data would be overwritten
  }
}

