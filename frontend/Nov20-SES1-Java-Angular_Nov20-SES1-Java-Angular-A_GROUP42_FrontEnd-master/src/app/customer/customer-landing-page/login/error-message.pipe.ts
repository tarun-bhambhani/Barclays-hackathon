import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'errorMessage'
})
export class ErrorMessagePipe implements PipeTransform {

  transform(value: string): unknown {
    let errors: string[] = value.split(', ');
    return errors;
  }

}
