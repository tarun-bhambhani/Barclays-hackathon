import { Component, OnInit } from '@angular/core';
import { CustomerAddressService } from '../../customer-details/customer-address/customer-address.service';
import { Address } from "../../../../shared/models/address";
import { Customer } from 'src/app/shared/models/customer';
import { CheckoutShareDataService } from '../checkout-share-data.service';
import { CustomerSharedService } from '../../customer-shared-service';



@Component({
  selector: 'app-checkout-address',
  templateUrl: './checkout-address.component.html',
  styleUrls: ['./checkout-address.component.css']
})
export class CheckoutAddressComponent implements OnInit {
  continue: boolean = false;
  loggedInCustomer: Customer;
  show=false;
  addresses: Address[];
  addressToAdd: Address = null;
  successMessage: string = null;
  errorMessage: string = null;
  selectedAddress:Address=null;

  constructor(private addressService: CustomerAddressService, private dataService: CheckoutShareDataService, private customerSharedService: CustomerSharedService) {

  }

  ngOnInit(): void {
    this.loggedInCustomer = JSON.parse(sessionStorage.getItem("customer"));
    this.addresses = this.loggedInCustomer.addresses;
    this.dataService.setAddress(null);
  }

  // deleteAddress(addressToDelete: Address) {
  //   this.successMessage = null;
  //   this.errorMessage = null;
  //   this.addressService.deleteAddress(addressToDelete, this.loggedInCustomer.emailId).subscribe(
  //     response => {
  //       this.successMessage = response;
  //       this.addresses = this.addresses.filter(address => address.addressId !== addressToDelete.addressId);
  //       this.customerSharedService.updateCustomerAddressList(this.addresses);
  //       this.loggedInCustomer.addresses = this.addresses;
  //       sessionStorage.setItem("customer", JSON.stringify(this.loggedInCustomer));
  //     }, error => {
  //         this.errorMessage = error;
  //     }
  //   );
  // }

   addNewAddress(){
        this.successMessage = null;
        this.errorMessage = null;
        this.addressToAdd = new Address();
    }

    addAddress(){
      this.successMessage = null;
      this.errorMessage = null;
      this.addressService.addNewAddress(this.addressToAdd, this.loggedInCustomer.emailId).subscribe(response => {
          this.successMessage = response;
          let id = this.successMessage.substring(this.successMessage.indexOf(":")+1).trim();
          this.addressToAdd.addressId = parseInt(id);
          this.addresses.push(this.addressToAdd);
          this.loggedInCustomer.addresses = this.addresses;
          this.addressToAdd = null;
          sessionStorage.setItem("customer", JSON.stringify(this.loggedInCustomer));
      }, error => {
          this.errorMessage = error;
      })
  }

  
  cancelAdd(){
    this.successMessage = null;
    this.errorMessage = null;
    this.addressToAdd = null;
}
 selectAddress(address:Address){
   this.selectedAddress = address;
   this.dataService.setAddress(address);
 }
 
 proceed(addressToAdd: Address){
   this.dataService.setAddress(addressToAdd);
   this.dataService.getAddress().addressId=null;
 }
 

 }



