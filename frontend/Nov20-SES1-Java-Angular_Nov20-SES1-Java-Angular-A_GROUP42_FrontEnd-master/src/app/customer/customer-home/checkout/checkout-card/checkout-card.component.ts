import { Component, OnInit, Input } from '@angular/core';
import { Card } from "../../../../shared/models/card"
import { CheckoutCardService } from './checkout-card.service';
import { Customer } from 'src/app/shared/models/customer';
import { Orders } from 'src/app/shared/models/order'
import { OrderStatus } from 'src/app/shared/models/order-status';
import { PaymentThrough } from 'src/app/shared/models/payment-through';
import { Address } from 'src/app/shared/models/address';
import { Cart } from 'src/app/shared/models/cart';
import { CheckoutShareDataService } from '../checkout-share-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout-card',
  templateUrl: './checkout-card.component.html',
  styleUrls: ['./checkout-card.component.css']
})
export class CheckoutCardComponent implements OnInit {
  errorMessage: string;
  successMessage: string;

  isCashOnDelivery: boolean = false;
  cardExpiryDate: string;
  loggedInCustomer: Customer;
  cardToAdd: Card;
  selectedCard: Card = null;
  formErrorMessage: string;
  cards: Card[];
  placedOrders: Orders[];
  verifiedPayment: boolean = false;
  verifyCVVErrorMessage: string;
  address:Address;

  constructor(private cardService: CheckoutCardService, private dataService: CheckoutShareDataService, private router:Router) { }

  get sharedCard(): Card {
    return this.dataService.card;
  }

  set sharedCard(card: Card) {
    this.dataService.card = card;
  }

  ngOnInit(): void {
    this.address=this.dataService.getAddress();
    if (this.address==null)
      this.router.navigate(['home/checkout/address']);
    this.loggedInCustomer = JSON.parse(sessionStorage.getItem('customer'));
    this.cardService.getCards(this.loggedInCustomer.emailId).subscribe(
      response => this.cards = response,
      error => console.log(error)
    );
    this.sharedCard = null;
  }

  // verifyCVV(): void{
  //   this.cardService.verifyCVV(this.sharedCard).subscribe(
  //     response => {
  //       this.verifiedPayment = response;
  //       this.addTempAddress();
  //     },
  //     error => this.verifyCVVErrorMessage = error.error.errorMessage
  //   );
  // }

  // addTempAddress(): void{
  //   if(this.address.addressId == null){
  //     this.cardService.addTempAddress(this.address).subscribe(
  //       response => {
  //         let json = JSON.parse(response);
  //         this.placeNewOrder(json.addressId);
  //       },
  //       error => this.errorMessage = error.error.errorMessage
  //     );
  //   } else {
  //     this.placeNewOrder(this.address.addressId);
  //   }
  // }

  // placeOrder(): void{
  //   if(this.sharedCard == null){
  //     this.verifiedPayment = true;
  //     this.addTempAddress();
  //   } else {
  //     this.verifyCVV();
  //   }
  // }

  // placeNewOrder(addressId: number): void{
  //   let cartList: Cart[] = JSON.parse(sessionStorage.getItem("cart"));
  //   if(this.verifiedPayment == true){
  //     let orders: Orders[] = [];
  //     for(let i = 0; i < cartList.length; i++){
  //       orders.push(new Orders());
  //       orders[i].addressId = addressId;
  //       orders[i].customerEmailId = this.loggedInCustomer.emailId;
  //       orders[i].orderNumber = null;
  //       orders[i].orderId = null;
  //       orders[i].dateOfOrder = new Date();
  //       orders[i].dateOfOrder.setTime(orders[i].dateOfOrder.getTime() + (5.5*60*60*1000));
  //       orders[i].product = cartList[i].product;
  //       orders[i].quantity = cartList[i].quantity;
  //       orders[i].totalPrice = cartList[i].product.maximum_retail_price * orders[i].quantity;
  //       orders[i].totalPrice -= (orders[i].totalPrice * cartList[i].product.discount) / 100;
  //       orders[i].orderStatus = null;
  //       if(this.sharedCard == null){
  //         orders[i].paymentThrough = "CASH_ON_DELIVERY" as PaymentThrough;
  //       } else if(this.sharedCard.cardType == 'DEBIT_CARD'){
  //         orders[i].paymentThrough = "DEBIT_CARD" as PaymentThrough;
  //       } else if(this.sharedCard.cardType == 'CREDIT_CARD'){
  //         orders[i].paymentThrough = "CREDIT_CARD" as PaymentThrough;
  //       }
  //       orders[i].dataOfDelivery = null;
  //       // orders[i].dataOfDelivery.setDate(orders[i].dataOfDelivery.getDate() + 10);
  //       console.log(orders[i])
  //     }
  //     this.cardService.placeOrder(orders).subscribe(
  //       response => {
  //         let orders:Orders[]=response;
  //         orders.forEach(order => {
  //           order.orderStatus = OrderStatus[order.orderStatus];
  //           order.paymentThrough = PaymentThrough[order.paymentThrough];
  //           order.dateOfOrder = new Date(order.dateOfOrder[0], order.dateOfOrder[1] - 1, order.dateOfOrder[2], order.dateOfOrder[3], order.dateOfOrder[4], order.dateOfOrder[5]);
  //           console.log(order.dateOfOrder);

  //           // order.dataOfDelivery = new Date(order.dataOfDelivery[0], order.dataOfDelivery[1] - 1, order.dataOfDelivery[2], order.dataOfDelivery[3], order.dataOfDelivery[4], order.dataOfDelivery[5]);
  //         });
  //         this.dataService.setOrders(orders);
  //         this.router.navigate(['home/checkout/invoice']);
  //       },
  //       error => {
  //         console.log(error);
  //         this.verifiedPayment = false;
  //       }
  //     )
  //   }
  // }

  // addNewCard(){
  //   this.successMessage = null;
  //   this.formErrorMessage = null;
  //   this.cardToAdd = new Card();
  // }

  // addCard(){
  //   this.successMessage = null;
  //   this.formErrorMessage = null;
  //   this.cardToAdd.customerEmail = this.loggedInCustomer.emailId;
  //   this.cardToAdd.expiryDate = [];
  //   this.cardToAdd.expiryDate.push(parseInt(this.cardExpiryDate.slice(0,4)));
  //   this.cardToAdd.expiryDate.push(parseInt(this.cardExpiryDate.slice(5)));
  //   if(this.cardToAdd.expiryDate[1] == 2){
  //     this.cardToAdd.expiryDate.push(28);
  //   } else if(/^([469])*(11)*$/.test(this.cardToAdd.expiryDate[1].toString())) {
  //     this.cardToAdd.expiryDate.push(30);
  //   } else {
  //     this.cardToAdd.expiryDate.push(31);
  //   }
  //   this.cardService.addNewCard(this.cardToAdd).subscribe(response => {
  //     this.successMessage = response;
  //     this.cardToAdd = null;
  //     this.ngOnInit();
  // }, error => {
  //   this.formErrorMessage = JSON.parse(error.error).errorMessage.toString();
  // })
  // }

  cancelAdd(){
    this.successMessage = null;
    this.formErrorMessage = null;
    this.cardToAdd = null;
  }

  deleteCard(cardToDelete: Card) {
    this.successMessage = null;
    this.errorMessage = null;
    this.cardService.deleteCard(cardToDelete).subscribe(
        response => {
            this.successMessage = response;
            this.cards = this.cards.filter(card => card.cardId !== cardToDelete.cardId);
        }, error => {
            this.errorMessage = JSON.parse(error.error).errorMessage.toString();
        }
    );
  }

  validateCVV(): boolean{
    if(this.isCashOnDelivery == true){
      return false;
    } else {
      if(this.sharedCard != null && this.sharedCard.cvv != null){
        return !(this.sharedCard.cvv.toString().length == 3);
      } else {
        return true;
      }
    }
  }

//   proceed(): void{
    
//     this.sharedCard = this.cardToAdd;
//     this.verifiedPayment = true;
//     this.addTempAddress();
//   }
 }
