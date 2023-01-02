import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { AuthService } from '../components/auth/auth.service';
import { FileUpload } from '../shared/models/file-upload.model';

@Injectable({
  providedIn: 'root'
})

export class FileUploadService {

  private basePath = '/uploads';

  constructor(
    private storage: AngularFireStorage,
    private authService: AuthService,
  ) { }

  public pushFileToStorage(fileUpload: FileUpload): Observable<number | undefined> {
    const currentUserId = this.authService.getUserId();
    const filePath = `${this.basePath}/${currentUserId}/${fileUpload.file.name}`;
    const storageRef = this.storage.ref(filePath);
    const uploadTask = this.storage.upload(filePath, fileUpload.file);
    uploadTask.snapshotChanges().pipe(
      finalize(() => {
        storageRef.getDownloadURL().subscribe(downloadURL => {
          fileUpload.url = downloadURL;
          fileUpload.name = fileUpload.file.name;
        });
      })
    ).subscribe();
    return uploadTask.percentageChanges();
  }

  public async getFiles(dir: string): Promise<FileUpload[]> {
    const currentUserId = this.authService.getUserId();
    const filePath = `${dir}/${currentUserId}`;
    const result = await this.storage.storage.ref(filePath).listAll();
    const fileUploads = [];

    for (const fileRef of result.items) {
      const downloadURL = await fileRef.getDownloadURL();
      const metadata = await fileRef.getMetadata();
      const file = new File([], metadata.name || '', { type: metadata.contentType || '' });
      fileUploads.push(new FileUpload(file, downloadURL));
    }

    return fileUploads;
  }

  public deleteFile(fileUpload: FileUpload): void {
    this.deleteFileStorage(fileUpload.name);
  }

  /*   private deleteFileDatabase(key: string): Promise<void> {
      return this.db.list(this.basePath).remove(key);
    } */

  private deleteFileStorage(name: string): void {
    const storageRef = this.storage.ref(this.basePath);
    storageRef.child(name).delete();
  }
}
