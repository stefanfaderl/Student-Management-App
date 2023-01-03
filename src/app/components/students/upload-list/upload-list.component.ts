import { Component, OnInit } from '@angular/core';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { FileUpload } from 'src/app/shared/models/file-upload.model';

@Component({
  selector: 'app-upload-list',
  templateUrl: './upload-list.component.html',
  styleUrls: ['./upload-list.component.scss']
})

export class UploadListComponent implements OnInit {
  public fileUploads: FileUpload[] = [];
  public changedFileUploads: FileUpload[] = [];

  constructor(
    private uploadService: FileUploadService
  ) { }

  async ngOnInit(): Promise<void> {
    const files = await this.uploadService.getFiles('/uploads');
    files.forEach(file => {
      this.fileUploads.push(file);
    });

    // Update the list if files were deleted
    this.uploadService.filesChanged$.subscribe(async file => {
      await this.updateChangedFileUploads(file);
      this.fileUploads = this.changedFileUploads;
    });
  }

  async updateChangedFileUploads(file: FileUpload): Promise<void> {
    this.changedFileUploads.push(file);
  }
}
