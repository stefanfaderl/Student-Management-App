import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentService } from 'src/app/services/student.service';
import { DataStorageService } from 'src/app/shared/data-storage.service';
import { LearningYear } from 'src/app/shared/models/LearningYear';
import { Location } from 'src/app/shared/models/Location';
import { Student } from 'src/app/shared/models/Student';


@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.scss']
})
export class AddStudentComponent implements OnInit {
  student!: Student;
  studentName!: string;
  studentForm!: FormGroup;
  selectedFile: any = null;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private studentService: StudentService
  ) { }

  public onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0] ?? null;
  }

  /*   onUpload() {
      const formData = new FormData();
      formData.append('image',this.selectedFile,this.selectedFile.name);
      //this.http.url
    } */

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


  ngOnInit(): void {
    this.studentForm = new FormGroup({ // properties should be the same as the model student
      'studentName': new FormControl(null, Validators.required),
      'studentLocation': new FormControl(null, Validators.required),
      'learningYear': new FormControl(null, Validators.required),
      'studentNotes': new FormControl(null)
    });
  }

  public onSubmit(): void {
    this.studentService.addStudent(this.studentForm.value);
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}
