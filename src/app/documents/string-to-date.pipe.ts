import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'toDate'
})
export class StringToDatePipe implements PipeTransform {

  transform(value: string): Date {
    if (value) {
      console.log('Piping...:', value);
      console.log('Is type of:', typeof(value));
      console.log('Is it? :', value['']);
      return new Date(value);
    }
  }

}
