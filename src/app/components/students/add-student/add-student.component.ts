import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { StudentService } from 'src/app/services/student.service';
import { DataStorageService } from 'src/app/shared/data-storage.service';
import { LearningYear } from 'src/app/shared/models/LearningYear';
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
    private route: ActivatedRoute,
    private studentService: StudentService,
    private dataStorageService: DataStorageService
  ) { }

  onFileSelected(event: any): void {
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

  ngOnInit(): void {
    this.studentForm = new FormGroup({
      'name': new FormControl(null, Validators.required),
      'city': new FormControl(null, Validators.required),
      'year': new FormControl(null, Validators.required),
      'notes': new FormControl(null)
    })
  }

  onSubmit(): void {
    this.dataStorageService.storeStudents();
  }
}
