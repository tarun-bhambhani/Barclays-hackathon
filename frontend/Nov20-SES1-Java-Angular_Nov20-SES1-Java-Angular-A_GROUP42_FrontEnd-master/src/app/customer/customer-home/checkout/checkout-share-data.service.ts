import { Injectable } from '@angular/core';
import { Address } from 'src/app/shared/models/address';
import { Orders } from 'src/app/shared/models/order';
import { Card } from 'src/app/shared/models/card';

@Injectable({
  providedIn: 'root'
})
export class CheckoutShareDataService {
  address: Address;
  orders: Orders[];
  card: Card;
  constructor() { }

  getOrders(): Orders[]{
    return JSON.parse(sessionStorage.getItem("checkout-orders"))
  }

  setOrders(orders: Orders[]){
    this.orders = orders;
    sessionStorage.setItem("checkout-orders",JSON.stringify(orders));
  }

  getcard(): Card{
    return this.card;
  }

  setcard(card: Card){
    this.card = card;
  }

  getAddress(): Address{
    return JSON.parse(sessionStorage.getItem("checkout-address"))
  }

  setAddress(address: Address){
    this.address = address;
    sessionStorage.setItem("checkout-address",JSON.stringify(address));
  }
}
