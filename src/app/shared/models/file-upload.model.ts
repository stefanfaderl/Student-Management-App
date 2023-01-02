export class FileUpload {
  key!: string;
  name!: string;
  url!: string;
  file: File;
  constructor(file: File, public downloadURL: string = '') {
    this.file = file;
    this.downloadURL = downloadURL;
  }
}
