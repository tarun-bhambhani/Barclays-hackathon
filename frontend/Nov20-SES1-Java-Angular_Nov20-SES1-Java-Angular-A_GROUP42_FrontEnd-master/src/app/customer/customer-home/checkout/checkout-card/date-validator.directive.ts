import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator} from '@angular/forms'
import { CustomValidatorService } from './custom-validator.service'

@Directive({
  selector: '[inputDateValidator]',
  providers: [{provide: NG_VALIDATORS, useExisting: DateValidatorDirective, multi: true}]
})
export class DateValidatorDirective implements Validator{

  constructor(private customValidatorService: CustomValidatorService) { }

  validate(control: AbstractControl): {[key: string]: any} | null {
    let inputDate:string = control.value;
    if(!this.customValidatorService.dateValidator(inputDate)){
      return {invalidDate: true};
    }
    return null;
  }

}
