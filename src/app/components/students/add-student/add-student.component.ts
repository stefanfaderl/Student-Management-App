import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DataStorageService } from 'src/app/shared/data-storage.service';
import { LearningYear } from 'src/app/shared/models/LearningYear';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.scss']
})
export class AddStudentComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private dataStorageService: DataStorageService
  ) { }

  selectedFile: any = null;

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0] ?? null;

  }

  /*   onUpload() {
      const formData = new FormData();
      formData.append('image',this.selectedFile,this.selectedFile.name);
      //this.http.url
    } */

  addressForm = this.fb.group({
    firstName: [null, Validators.required],
    lastName: [null, Validators.required],
    city: [null, Validators.required],
    year: [null, Validators.required]
  });

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
  }

  onSubmit(): void {
    this.dataStorageService.storeStudents();
  }
}
