import { Injectable } from "@angular/core";
import { Product } from "../../shared/models/product";
import { BehaviorSubject, throwError, Observable } from "rxjs";
import { Cart } from "../../shared/models/cart";
import { Address } from '../../shared/models/address';
import { Customer } from '../../shared/models/customer';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';


@Injectable({
    providedIn: 'root'
})
export class CustomerSharedService {
    private headers = new HttpHeaders({ 'Content-Type': 'text/plain' });
    constructor(private http: HttpClient) { }

    // private cartList = new BehaviorSubject<Cart[]>(sessionStorage.getItem("cart") == null ? [] : JSON.parse(sessionStorage.getItem("cart")));
    // updatedCartList = this.cartList.asObservable();

    // private addressList = new BehaviorSubject<Address[]>(JSON.parse(sessionStorage.getItem("customer")).addresses);
    // updatedAddressList = this.addressList.asObservable();

    // private loggedInCustomer = new BehaviorSubject<Customer>(JSON.parse(sessionStorage.getItem("customer")));
    // updatedCustomer = this.loggedInCustomer.asObservable();

    // updatedCustomerDetails(customer: Customer) {
    //     this.loggedInCustomer.next(customer);
    // }
    // updateCartList(cartList: Cart[]) {
    //     this.cartList.next(cartList);
    // }
    // updateCustomerAddressList(addressList: Address[]) {
    //     this.addressList.next(addressList);

    // }

    // addProductToCart(cart: Cart): Observable<string> {
    //     return this.http.post(environment.customerCartUrl + "/customerCarts/" + cart.customerEmailId + "/products", cart, { responseType: "text" })
    //         .pipe(catchError(this.handleError))

    // }

    // getAddress(addressId:number){
    //     let url:string = environment.addressAPI +addressId;
    //     return this.http.get<Address>(url, {headers: this.headers});
    //   }

    private handleError(err: HttpErrorResponse) {
        console.log(err)
        let errMsg: string = '';
        if (err.error instanceof Error) {
            errMsg = err.error.message;
            console.log(errMsg)
        }
        else if (typeof err.error === 'string') {
            errMsg = JSON.parse(err.error).errorMessage
        }
        else {
            if (err.status == 0) {
                errMsg = "A connection to back end can not be established.";
            } else {
                errMsg = err.error.message;
            }
        }
        return throwError(errMsg);
    }

}