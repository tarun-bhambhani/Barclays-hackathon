import { Pipe, PipeTransform } from '@angular/core';
import { PaymentThrough } from 'src/app/shared/models/payment-through';

@Pipe({
  name: 'paymentThrough'
})
export class PaymentThroughPipe implements PipeTransform {

  transform(value: string): unknown {
    switch(value) {
      case 'DEBIT_CARD': {
        return PaymentThrough[value];
      }
      case 'CREDIT_CARD': {
        return PaymentThrough[value];
      }
      case 'CASH_ON_DELIVERY': {
        return PaymentThrough[value];
      }
      default: {
        return 'Invalid Payment Method';
      }
    }
  }

}
