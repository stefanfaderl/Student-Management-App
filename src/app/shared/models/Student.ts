export class Student {
  public studentName: string;
  public learningYear: number;
  public studentLocation: string;
  public studentNotes: string;
  public pdf?: any;

  constructor(studentName: string, learningYear: number, studentLocation: string, studentNotes: string, pdf?: any) {
    this.studentName = studentName;
    this.learningYear = learningYear;
    this.studentLocation = studentLocation;
    this.studentNotes = studentNotes;
    this.pdf = pdf;
  }
}
