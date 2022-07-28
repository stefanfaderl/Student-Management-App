import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { student } from 'src/app/shared/models/Student';

const students: student[] = [
  { studentName: "Hansi", studentLocation: "Behamberg", learningYear: 2, studentNotes: "Super" },
  { studentName: "Franz", studentLocation: "Ernsthofen", learningYear: 1, studentNotes: "Unpünktlich" },
  { studentName: "Sissi", studentLocation: "Haidershofen", learningYear: 3, studentNotes: "Gut" },
  { studentName: "Bert", studentLocation: "Behamberg", learningYear: 4, studentNotes: "Super" },
  { studentName: "Marie", studentLocation: "Behamberg", learningYear: 2, studentNotes: "Super" },
];

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss']
})
export class StudentsComponent implements OnInit {
  dataSource = [...students];
  filteredStudents: string = '';

  /* defaults for Handset breakpoint */
  cols: number = 1;
  rowHeight: string = '';

  locations = [
    'Behamberg', 'Haidershofen', 'Ernsthofen'
  ];

  learningYear = [
    1, 2, 3, 4, 5, 6, 7, 8
  ];

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.dataSource, event.previousIndex, event.currentIndex);
  }

  showLocation: boolean = true;

  constructor(
    private breakpointObserver: BreakpointObserver,
  ) { }

  ngOnInit(): void {
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
}
