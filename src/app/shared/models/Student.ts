export class Student {
  public studentName: string;
  public learningYear: number;
  public studentLocation: string;
  public studentNotes?: string;
  public pdf?: any;
  public id?: string;

  constructor(studentName: string, studentLocation: string, learningYear: number, studentNotes?: string, pdf?: any, id?: string) {
    this.studentName = studentName;
    this.studentLocation = studentLocation;
    this.learningYear = learningYear;
    this.studentNotes = studentNotes;
    this.pdf = pdf;
    this.id = id;
  }
}
