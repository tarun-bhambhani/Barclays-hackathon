import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CustomValidatorService {

  constructor() { }

  dateValidator(inputDate: string): boolean{
    let date = new Date();
    date = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth()));

    let inDate = new Date(inputDate);
    inDate = new Date(Date.UTC(inDate.getUTCFullYear(), date.getUTCMonth()));

    if(date > inDate){
      return false;
    } else {
      return true;
    }
  }
}
