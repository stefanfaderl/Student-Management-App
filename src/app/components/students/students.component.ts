import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { student } from 'src/app/shared/models/Student';

const students: student[] = [
  { studentName: "Hansi", ort: "Behamberg", lernjahr: 2, notizen: "Super" },
  { studentName: "Franz", ort: "Ernsthofen", lernjahr: 1, notizen: "Unpünktlich" },
  { studentName: "Sissi", ort: "Haidershofen", lernjahr: 3, notizen: "Gut" },
];

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss']
})
export class StudentsComponent implements OnInit {
  dataSource = [...students];
  /* defaults for Desktop format */
  cols: number = 2;
  rowHeight: string = '';


  /*     'Hansi Hinterseer',
      'Schüler 2',
      'Episode IV - A New Hope', */
  locations = [
    'Behamberg',
    'Haidershofen',
    'Ernsthofen'
  ];

  learningYear = [
    '1. Lernjahr',
    '2. Lernjahr',
    '3. Lernjahr',
  ]

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.dataSource, event.previousIndex, event.currentIndex);
  }

  showLocation: boolean = true;
  constructor(
    private breakpointObserver: BreakpointObserver,
  ) { }

  ngOnInit(): void {
    this.breakpointObserver.observe([
      Breakpoints.HandsetPortrait,
      Breakpoints.HandsetLandscape,
      Breakpoints.TabletPortrait
    ])
      .subscribe(result => {
        this.cols = 2;
        this.rowHeight = "70px";
        const breakpoints = result.breakpoints;
        if (breakpoints[Breakpoints.HandsetPortrait]) {
          this.cols = 1;
          this.rowHeight = "100px";
        }
        else if (breakpoints[Breakpoints.HandsetLandscape]) {
          this.cols = 1;
          this.rowHeight = "110px";
        }
        else if (breakpoints[Breakpoints.TabletPortrait]) {
          this.cols = 2;
          this.rowHeight = "150px";
        }
      });
  }
}
