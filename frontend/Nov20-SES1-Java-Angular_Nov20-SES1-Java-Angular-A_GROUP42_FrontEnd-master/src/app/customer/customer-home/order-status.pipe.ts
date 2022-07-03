import { Pipe, PipeTransform } from '@angular/core';
import { OrderStatus } from 'src/app/shared/models/order-status';

@Pipe({
  name: 'orderStatus'
})
export class OrderStatusPipe implements PipeTransform {

  transform(value: string): unknown {
    switch(value) {
      case 'PLACED': {
        return OrderStatus[value];
      }
      case 'CONFIRMED': {
        return OrderStatus[value];
      }
      case 'DISPATCHED': {
        return OrderStatus[value];
      }
      case 'IN_TRANSIT': {
        return OrderStatus[value];
      }
      case 'OUT_FOR_DELIVERY': {
        return OrderStatus[value];
      }
      case 'DELIVERED': {
        return OrderStatus[value];
      }
      case 'CANCELLED': {
        return OrderStatus[value];
      }
      case 'RETURNED': {
        return OrderStatus[value];
      }
      default: {
        return "Invalid Order Status";
      }
    }
  }

}

