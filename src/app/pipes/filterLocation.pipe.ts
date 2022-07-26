import { Pipe, PipeTransform } from '@angular/core';
import { student } from '../shared/models/Student';

@Pipe({
  name: 'filterLocation'
})
export class FilterLocationPipe implements PipeTransform {

  transform(value: student[], locationName: string): student[] {

    if (value.length === 0) {
      return value;
    }

    const resultArray = [];
    for (const key in value) {
      if (value[key].studentLocation === locationName) {
        resultArray.push(value[key]);
      }
    }
    return resultArray;
  }
}
