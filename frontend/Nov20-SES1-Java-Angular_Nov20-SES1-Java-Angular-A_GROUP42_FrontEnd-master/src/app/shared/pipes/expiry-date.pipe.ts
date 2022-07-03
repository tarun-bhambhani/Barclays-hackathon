import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'expiryDate'
})
export class ExpiryDatePipe implements PipeTransform {

  transform(value: number[]): unknown {
    return value[1] + "/" + value[0].toString().slice(2);
  }

}
