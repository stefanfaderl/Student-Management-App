import { Component, OnDestroy, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { Student } from 'src/app/shared/models/Student';
import { StudentService } from 'src/app/services/student.service';
import { Subscription } from 'rxjs';
import { DataStorageService } from 'src/app/shared/data-storage.service';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss']
})

export class StudentsComponent implements OnInit, OnDestroy {

  subscription!: Subscription;
  students: Student[] = [];
  showLocation: boolean = true;
  isFetching: boolean = false;
  error: any;

  /* defaults for Handset breakpoint */
  cols: number = 1;
  rowHeight: string = '';

  locations = [
    'Behamberg',
    'Haidershofen',
    'Ernsthofen'
  ];

  learningYear = [
    1, 2, 3, 4,
    5, 6, 7, 8
  ];

  constructor(
    private breakpointObserver: BreakpointObserver,
    private studentService: StudentService,
    private dataStorage: DataStorageService
  ) { }

  ngOnInit(): void {

    this.onFetchStudents();

    this.subscription = this.studentService.studentsChanged
      .subscribe(
        (students: Student[]) => {
          this.students = students;
        }
      );

    this.students = this.studentService.getStudents(); // get copy students from array students

    this.breakpointObserver.observe([
      Breakpoints.XSmall, // (max-width: 599.98px)
      Breakpoints.Small, // (min-width: 600px) and (max-width: 959.98px)
      Breakpoints.Medium, // (min-width: 960px) and (max-width: 1279.98px)
    ])
      .subscribe(result => {
        this.cols = 2;
        this.rowHeight = "90px";
        const breakpoints = result.breakpoints;
        if (breakpoints[Breakpoints.XSmall]) {
          this.cols = 1;
          this.rowHeight = "100px";
        }
        else if (breakpoints[Breakpoints.Small]) {
          this.cols = 1;
          this.rowHeight = "120px";
        }
        else if (breakpoints[Breakpoints.Medium]) {
          this.cols = 2;
          this.rowHeight = "70px";
        }
      });
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.students, event.previousIndex, event.currentIndex);
  }

  public onDeleteStudent(studentName: string, id: any) {
    if (confirm(
      `Bist du dir sicher das du ${studentName} löschen willst?`
    )) {
      this.dataStorage.deleteStudent(id);
    }
  }

  public onFetchStudents() {
    this.isFetching = true;
    this.dataStorage.fetchStudents()
      .subscribe(students => {
        this.isFetching = false;
        this.students = students;
      }, errorMessage => {
        this.isFetching = false;
        this.error = errorMessage;
      });
  }

  public onHandleError() {
    this.error = null;
  }

  ngOnDestroy(): void { // don't cause any memory leaks
    this.subscription.unsubscribe();
  }
}
