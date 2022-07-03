import { Component, OnInit, Input,ViewChild,ElementRef } from '@angular/core';
import { Orders } from 'src/app/shared/models/order';
import { Address } from 'src/app/shared/models/address';
import { CheckoutInvoiceService } from './checkout-invoice.service';
import { CustomerCartService } from "../../customer-cart/customer-cart.service";
import { Card } from 'src/app/shared/models/card';
import { Cart } from 'src/app/shared/models/cart';
import { Customer } from 'src/app/shared/models/customer';
import { CustomerHomeComponent } from '../../customer-home.component';
import {jsPDF} from 'jspdf';

import { CheckoutShareDataService } from '../checkout-share-data.service';
import { resolve } from 'url';
import { async } from 'q';
import html2canvas from 'html2canvas';
import { Identifiers } from '@angular/compiler';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout-invoice',
  templateUrl: './checkout-invoice.component.html',
  styleUrls: ['./checkout-invoice.component.css']
})
export class CheckoutInvoiceComponent implements OnInit {
  placedOrders: Orders[];
  card: Card;
  address:Address;
  grandTotal:number;
  cust:Customer;
  constructor(private router:Router, private invoiceService:CheckoutInvoiceService, private customerCartService:CustomerCartService, private customerHome: CustomerHomeComponent, private dataService: CheckoutShareDataService) { }

  get sharedCard(): Card {
    return this.dataService.card;
  }

  set sharedCard(card: Card) {
    this.dataService.card = card;
  }

  

  ngOnInit(): void {
    this.address=this.dataService.getAddress();
     this.delay(300).then(any =>{
      this.placedOrders=this.dataService.getOrders();
     })
    this.cust=JSON.parse(sessionStorage.getItem("customer"));
    console.log(this.placedOrders);
    this.delay(300).then(any => {
      console.log(this.address);
      console.log(this.placedOrders);
      if (this.placedOrders==null || this.placedOrders.length==0)
      this.router.navigate(['home/checkout/card'])
      this.dateFormatter();
      this.calculateGrandTotal();
      this.deleteProducts();
    });
  }

  ngOnDestroy():void{
    sessionStorage.setItem("checkout-address",null);
    sessionStorage.setItem("checkout-orders",null);
  }
  async delay(ms) {
    await new Promise(resolve => setTimeout(() => resolve(), ms)).then(()=>console.log("fired"));
  }

  calculateGrandTotal(){
    this.grandTotal=0;
    for(let order of this.placedOrders){
      if(order.errorMessage==null){
        this.grandTotal+=order.totalPrice;
      }
    }
  }

  deleteProducts(){
    let cartList: Cart[] = JSON.parse(sessionStorage.getItem("cart"));
    let cartsToDelete: Cart[] = [];
    for(let order of this.placedOrders){
      if (order.errorMessage==null){
        cartList.forEach(cart => {
          if(cart.product.productId == order.product.productId){
            cartsToDelete.push(cart);
          }  
        });
      }
    }
    let customer: Customer = JSON.parse(sessionStorage.getItem("customer"));
    console.log(cartsToDelete.map(cart => cart.cartId));
    this.invoiceService.updateCart(cartsToDelete.map(cart => cart.cartId), customer.emailId).subscribe(
      response => {
        sessionStorage.setItem("cart", JSON.stringify(response));
        this.customerHome.ngOnInit();
      },
      error => {
        console.log(error);
      }
    )
  }

  savePDF(orderNumber: number): void {
  
    var data = document.getElementById('content');
    var canvas = html2canvas(data).then(canvas => {
      var imgWidth = 210; 
      var pageHeight = 295;  
      var imgHeight = canvas.height * imgWidth / canvas.width;
      var heightLeft = imgHeight;
      var doc = new jsPDF('p', 'mm', "a4");
      var position = 10; // give some top padding to first page
  
      var imgData = canvas.toDataURL('image/png')
      doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
  
      while (heightLeft >= 0) {
        position += heightLeft - imgHeight; // top padding for other pages
        doc.addPage();
        doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }
      doc.save(orderNumber+'-Invoice.pdf');
    });
    }

  dateFormatter(){
    this.placedOrders.map(order=>order.dateOfOrder=new Date(order.dateOfOrder));
    console.log(this.placedOrders);
  }

}
