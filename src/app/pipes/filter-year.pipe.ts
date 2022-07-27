import { Pipe, PipeTransform } from '@angular/core';
import { student } from '../shared/models/Student';

@Pipe({
  name: 'filterYear'
})
export class FilterYearPipe implements PipeTransform {
  transform(value: student[], currentYear: number): student[] {
    const resultArray = [];
    for (const key in value) {
      if (value[key].learningYear === currentYear) {
        resultArray.push(value[key]);
      }
    }
    return resultArray;
  }

}
