import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';

export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss']
})
export class StudentsComponent implements OnInit {
  /* defaults for Desktop format */
  cols: number = 2;
  rowHeight: string = '';

  students = [
    'Hansi Hinterseer',
    'Schüler 2',
    'Episode IV - A New Hope',
  ];

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.students, event.previousIndex, event.currentIndex);
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
        this.rowHeight = "100px";
        const breakpoints = result.breakpoints;
        if (breakpoints[Breakpoints.HandsetPortrait]) {
          this.cols = 1;
          this.rowHeight = "150px";
        }
        else if (breakpoints[Breakpoints.HandsetLandscape]) {
          this.cols = 1;
          this.rowHeight = "150px";
        }
        else if (breakpoints[Breakpoints.TabletPortrait]) {
          this.cols = 2;
          this.rowHeight = "150px";
        }
      });
  }
}
