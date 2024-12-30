import { Pipe, PipeTransform } from '@angular/core';
import { Student } from '../shared/models/Student';

@Pipe({
    name: 'filterLocation',
    standalone: false
})
export class FilterLocationPipe implements PipeTransform {

  transform(value: Student[], locationName: string): Student[] {
    const resultArray = [];
    for (const key in value) {
      if (value[key].studentLocation === locationName) {
        resultArray.push(value[key]);
      }
    }
    return resultArray;
  }
}
