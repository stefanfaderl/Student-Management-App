import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any, locationName: string): any {
    if (value.length === 0) {
      return value;
    }
    const resultArray = [];
    for (const key in value) {
      if (value[key].ort === locationName) {
        resultArray.push(value[key]);
      }
    }
    return resultArray;
  }
}
