import { Pipe, PipeTransform } from '@angular/core';
import { Student } from '../shared/models/Student';

@Pipe({
  name: 'filterYear'
})
export class FilterYearPipe implements PipeTransform {
  transform(value: Student[], currentYear: number): Student[] {
    const resultArray = [];
    for (const key in value) {
      if (value[key].learningYear === currentYear) {
        resultArray.push(value[key]);
      }
    }
    return resultArray;
  }

}
