import { Component, OnInit } from '@angular/core';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { FileUpload } from 'src/app/shared/models/file-upload.model';

@Component({
  selector: 'app-upload-list',
  templateUrl: './upload-list.component.html',
  styleUrls: ['./upload-list.component.scss']
})

export class UploadListComponent implements OnInit {
  displayedColumns: string[] = ['demo-position', 'demo-name', 'demo-weight', 'demo-symbol'];
  fileUploads: FileUpload[] = [];

  constructor(
    private uploadService: FileUploadService
  ) { }

  async ngOnInit(): Promise<void> {
    const files = await this.uploadService.getFiles('/uploads');
    files.forEach(file => {
      this.fileUploads.push(file);
    });
  }
}
