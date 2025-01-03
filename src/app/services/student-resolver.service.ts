import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { DataStorageService } from '../shared/data-storage.service';
import { Student } from '../shared/models/Student';
import { StudentService } from './student.service';

@Injectable({
  providedIn: 'root'
})

export class StudentResolverService {

  constructor(
    private dataStorageService: DataStorageService,
    private studentService: StudentService
  ) { }

  /*
  fetch students method, whenever this route gets loaded
  resolve subscribes automatically once the data is there
  */
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) {
    const students = this.studentService.getStudents();
    if (students.length === 0) {
      return this.dataStorageService.fetchStudents();
    } else {
      return students;
    }
  }
}
