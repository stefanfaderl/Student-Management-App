import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { StudentService } from 'src/app/services/student.service';
import { LearningYear } from 'src/app/shared/models/LearningYear';
import { Student } from 'src/app/shared/models/Student';
import { Location } from 'src/app/shared/models/Location';
import { DataStorageService } from 'src/app/shared/data-storage.service';

@Component({
    selector: 'app-edit-student',
    templateUrl: './edit-student.component.html',
    styleUrls: ['./edit-student.component.scss'],
    standalone: false
})
export class EditStudentComponent implements OnInit {

  student!: Student;
  id!: string;
  studentForm!: FormGroup;
  selectedFile: any = null;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private studentService: StudentService,
    private dataStorage: DataStorageService
  ) { }

  ngOnInit(): void {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = params['id'];
          this.student = this.studentService.getStudent(this.id);
          this.initForm();
        }
      )
  }

  private initForm() {
    let studentName: string = '';
    let studentLocation: string = '';
    let learningYear: number;
    let studentNotes: string | undefined;

    const student = this.studentService.getStudent(this.id); //this.studentName
    studentName = student.studentName;
    studentLocation = student.studentLocation;
    learningYear = student.learningYear;
    studentNotes = student.studentNotes;

    this.studentForm = new FormGroup({ // properties should be the same as the model student
      'studentName': new FormControl(studentName, Validators.required),
      'studentLocation': new FormControl(studentLocation, Validators.required),
      'learningYear': new FormControl(learningYear, Validators.required),
      'studentNotes': new FormControl(studentNotes)
    });
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
    let newStudent = new Student( // also order should be the same as in the class
      this.studentForm.value['studentName'],
      this.studentForm.value['studentLocation'],
      this.studentForm.value['learningYear'],
      this.studentForm.value['studentNotes']
    );
    this.dataStorage.updateStudent(this.id, newStudent);
    this.router.navigate(['../../'], { relativeTo: this.route });
  }
}
