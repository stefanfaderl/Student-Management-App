import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { StudentService } from 'src/app/services/student.service';
import { LearningYear } from 'src/app/shared/models/LearningYear';
import { Student } from 'src/app/shared/models/Student';
import { Location } from 'src/app/shared/models/Location';

@Component({
  selector: 'app-edit-student',
  templateUrl: './edit-student.component.html',
  styleUrls: ['./edit-student.component.scss']
})
export class EditStudentComponent implements OnInit {
  student!: Student;
  studentName!: string;
  studentForm!: FormGroup;
  selectedFile: any = null;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private studentService: StudentService,
  ) { }

  ngOnInit(): void {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.studentName = params['name'];
          this.student = this.studentService.getStudent(this.studentName);
          this.initForm();
        }
      )
  }

  private initForm() {
    let studentName: string = '';
    let city: string = '';
    let year: number;
    let notes: string | undefined;

    const student = this.studentService.getStudent(this.studentName);
    studentName = student.studentName;
    city = student.studentLocation;
    year = student.learningYear;
    notes = student.studentNotes;

    this.studentForm = new FormGroup({
      'name': new FormControl(studentName, Validators.required),
      'city': new FormControl(city, Validators.required),
      'year': new FormControl(year, Validators.required),
      'notes': new FormControl(notes)
    })
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0] ?? null;
  }

  learningYear: LearningYear[] = [
    { learningYear: 1 },
    { learningYear: 2 },
    { learningYear: 3 },
    { learningYear: 4 },
    { learningYear: 5 },
    { learningYear: 6 },
    { learningYear: 7 },
    { learningYear: 8 },
    { learningYear: 9 },
    { learningYear: 10 },
  ];

  locations: Location[] = [
    { 'cityName': 'Haidershofen' },
    { 'cityName': 'Behamberg' },
    { 'cityName': 'Ernsthofen' },
  ]

  onSubmit(): void {
    const newStudent = new Student(
      this.studentForm.value['name'],
      this.studentForm.value['year'],
      this.studentForm.value['city'],
      this.studentForm.value['notes']
    );
    /* console.log(this.studentForm); */
    this.studentService.updateStudent(this.studentName, newStudent)
    this.router.navigate(['../../'], { relativeTo: this.route });
  }
}
