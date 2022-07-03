import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpErrorResponse } from "@angular/common/http";
import { Observable, throwError } from 'rxjs';
import { environment } from "../../../environments/environment";
import { Cart } from "../../shared/models/cart";
import { catchError } from 'rxjs/operators';
//import { Orders } from 'src/app/shared/models/order';
//import { Product } from 'src/app/shared/models/product';
//import { Address } from 'src/app/shared/models/address';


@Injectable({
    providedIn: 'root'
})
export class CustomerHomeService {
    private headers = new HttpHeaders({ 'Content-Type': 'text/plain' });
    constructor(private http: HttpClient) { }

    getNearestStore(lat: Number, long: Number): Observable<String>{
        let url : string = "http://localhost:3333/EKart_Server/user-controller/getStoreName/"+lat+"/"+long;
        console.log(url);
        return this.http.get<String>(url).pipe(catchError(this.handleError));
    }
    getCustomerCart(emailId: string): Observable<Cart[]> {
        let url: string = environment.customerCartUrl + "/customers/" + emailId + "/customerCarts";
        return this.http.get<Cart[]>(url)
            .pipe(catchError(this.handleError));

    }
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