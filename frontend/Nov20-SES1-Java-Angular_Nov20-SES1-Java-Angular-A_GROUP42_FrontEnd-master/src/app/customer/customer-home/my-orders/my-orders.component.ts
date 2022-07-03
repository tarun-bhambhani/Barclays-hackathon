import { Component, OnInit } from '@angular/core';
import { MyOrdersService } from './my-orders.service';
import { Orders } from '../../../shared/models/order';
import { Customer } from '../../../shared/models/customer';
import { CustomerSharedService } from '../customer-shared-service';
import { Address } from 'src/app/shared/models/address';
import { OrderStatus } from 'src/app/shared/models/order-status';
import { PaymentThrough } from 'src/app/shared/models/payment-through';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { ElementFinder } from 'protractor';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit {

  placedOrders: Orders[][];
  page: number = 1;
  totalItems: number;
  flag: boolean;
  addresses: Map<number, Address>;
  grandTotal: Map<number, number>;
  customer: Customer;
  orderNumber: number;
  showCard: boolean;
  cancelOrderCheck: boolean;
  invoiceOrderList: Orders[];
  orderTotal: number;
  orderMap: Map<number, Orders[]>;
  statusMap: Map<number, boolean>;
  invoiceStatusMap:Map<number,boolean>;
  constructor(private myOrderService: MyOrdersService, private customerService: CustomerSharedService) { }

  ngOnInit(): void {
    this.orderMap = new Map();
    this.statusMap = new Map();
    this.invoiceStatusMap = new Map();
    this.showCard = false;
    this.flag = false;
    this.customer = JSON.parse(sessionStorage.getItem("customer"));
    this.myOrderService.getOrders(this.customer.emailId).subscribe(
      response => {
        this.placedOrders = response;
      },
      error => console.log(error),
      () => {
        this.totalItems = this.placedOrders.length;
        this.dateFormatter();
        //this.addressGetter();
        this.calculateGrandTotal();
        console.log(this.placedOrders);
        this.placedOrders.slice().reverse().forEach(orderList => {
          this.orderMap.set(orderList[0].orderNumber, orderList);
          this.statusMap.set(orderList[0].orderNumber, false);
          this.checkInvoiceStatus(orderList);
        })
        console.log(this.orderMap);
        console.log(this.statusMap);
        console.log(this.invoiceStatusMap);
      },

    );
  }
  async delay(ms) {
    await new Promise(resolve => setTimeout(() => resolve(2000), ms)).then(()=>console.log("fired"));
  }
  calculateGrandTotal() {

    this.grandTotal = new Map();
    console.log(this.orderMap);
    this.orderMap.forEach((key, order) => {
      console.log(key, order);
    })
    for (let [key, value] of this.orderMap) {
      let temp: number = 0;
      console.log(key, value);
      for (let order of value) {
        console.log(order.totalPrice)
        if (order.errorMessage == null && order.orderStatus != 'CANCELLED' as OrderStatus) {
          console.log("totalprice" + order.totalPrice);
          temp += order.totalPrice;

        }

      }
      this.grandTotal.set(key, temp);
      console.log(this.grandTotal);
    }
  }

  generateInvoice(orders) {
    this.invoiceOrderList = [];
    this.orderTotal = 0;
    for (let order of orders) {
      if (order.paymentThrough == 'CASH_ON_DELIVERY' && order.orderStatus == 'DELIVERED') {
        this.invoiceOrderList.push(order);
        this.orderTotal += order.totalPrice;
      }
      if (order.paymentThrough != 'CASH_ON_DELIVERY' && order.orderStatus != 'CANCELLED') {
        this.invoiceOrderList.push(order);
        this.orderTotal += order.totalPrice;
      }
    }
    console.log(this.orderTotal);
    if (this.invoiceOrderList.length == 0) {
      alert("No product is eligible for invoice in this order!")
    }
    console.log(this.invoiceOrderList)
  }

  checkInvoiceStatus(orders:Orders[]){
    let flag:boolean=true;
    for (let order of orders){
      if (order.paymentThrough == 'CASH_ON_DELIVERY' as PaymentThrough && order.orderStatus == 'DELIVERED' as OrderStatus){
        this.invoiceStatusMap.set(order.orderNumber,true);
        flag=false;
        break;
      }
      if (order.paymentThrough != 'CASH_ON_DELIVERY' as PaymentThrough && order.orderStatus != 'CANCELLED' as OrderStatus){
        this.invoiceStatusMap.set(order.orderNumber,true);
        flag=false;
        break;
      }
      
    }
    if(flag)
    this.invoiceStatusMap.set(orders[0].orderNumber, false);
  }
  cancelOrder(orderNumber: number, id: number) {
    this.cancelOrderCheck = true;
    this.myOrderService.cancelOrder(id).subscribe(
      response => {
        this.cancelOrderCheck = response;
      },
      error => {
        console.log(error);
      },
      ()=>{
        if(this.cancelOrderCheck)
          this.checkInvoiceStatus(this.orderMap.get(orderNumber))
      }
    );
    console.log(this.cancelOrderCheck);
    if (this.cancelOrderCheck == true) {
      this.orderMap.get(orderNumber).map(order => {
        if (order.orderId == id)
          order.orderStatus = "CANCELLED" as OrderStatus;
        console.log(order.orderStatus, order.orderId);
      })
    }
  }
  dateFormatter() {
    let tempOrders: Orders[] = [];
    let tempOrderLists: Orders[][] = [];
    for (let orderLists of this.placedOrders) {
      for (let order of orderLists) {
        order.dateOfOrder = new Date(order.dateOfOrder[0], order.dateOfOrder[1] - 1, order.dateOfOrder[2], order.dateOfOrder[3], order.dateOfOrder[4], order.dateOfOrder[5]);
        if (order.dataOfDelivery != null) {
          order.dataOfDelivery = new Date(order.dataOfDelivery[0], order.dataOfDelivery[1] - 1, order.dataOfDelivery[2], order.dataOfDelivery[3], order.dataOfDelivery[4], order.dataOfDelivery[5])
        }
      }
    }
    console.log(tempOrderLists);
  }

  // addressGetter() {
  //   this.addresses = new Map<number, Address>();
  //   for (let orderList of this.placedOrders) {
  //     for (let order of orderList) {
  //       if (!this.addresses.get(order.addressId)) {
  //         this.customerService.getAddress(order.addressId).subscribe(
  //           response => {
  //             this.addresses.set(order.addressId, response);
  //           },
  //           error => console.log(error),
  //         );
  //       }
  //     }
  //   }
  //   console.log(this.addresses);
  //   this.flag = true;
  // }

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
  ignore(event){
    event.preventDefault();
  }
}
