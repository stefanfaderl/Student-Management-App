import { Component, Input, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { Student } from 'src/app/shared/models/Student';
import { StudentService } from 'src/app/services/student.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss'],
  providers: [StudentService] // all child components of students will share the same instance of this service
})

export class StudentsComponent implements OnInit {

  constructor(
    private breakpointObserver: BreakpointObserver,
    private studentService: StudentService
  ) { }

  filteredStudents: string = '';
  students: Student[] = [];
  subscribtion: Subscription = new Subscription;
  showLocation: boolean = true;

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

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.students, event.previousIndex, event.currentIndex);
  }

  ngOnInit(): void {
    this.subscribtion = this.studentService.studentsChanged.subscribe(
      (students: Student[]) => {
        this.students = students;
      }
    )
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

  ngOnDestroy() {
    this.subscribtion.unsubscribe();
  }
}
