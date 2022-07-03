import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http'
import { environment } from 'src/environments/environment';
import { throwError, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Card } from 'src/app/shared/models/card';
import { Orders } from 'src/app/shared/models/order';
import { Address } from 'src/app/shared/models/address';

@Injectable({
  providedIn: 'root'
})
export class CheckoutCardService {
  private headers = new HttpHeaders({ 'Content-Type': 'text/plain' });

  constructor(private http: HttpClient) { }

  getCards(customerEmailId: string): Observable<Card[]>{
    let url: string = environment.customerCardAPI + customerEmailId;
    return this.http.get<Card[]>(url, {headers: this.headers})
      .pipe(
        catchError(this.handleError)
      );
  }

  verifyCVV(card: Card): Observable<boolean>{
    let url: string = environment.customerCardVerifyAPI;
    return this.http.post<boolean>(url, card);
  }

  placeOrder(orders: Orders[]): Observable<Orders[]>{
    let url: string = environment.customerPlaceOrderAPI;
    return this.http.post<Orders[]>(url, orders);
  }

  addNewCard(cardToadd: Card): Observable<string> {
    let url: string = environment.customerAddCardAPI;
    return this.http.post<string>(url, cardToadd, { responseType: 'text' as 'json' });
  }

  addTempAddress(addressToadd: Address): Observable<string> {
    let url: string = environment.customerAddTempAddressAPI;
    return this.http.post<string>(url, addressToadd, { responseType: 'text' as 'json' });
  }

  deleteCard(cardToDelete: Card): Observable<string> {
    let url: string = environment.customerDeleteCardAPI + cardToDelete.cardId;
    return this.http.delete<string>(url, { headers: this.headers, responseType: 'text' as 'json' });
  }

  private handleError(err: HttpErrorResponse) {
    console.log(err)
    let errMsg: string = '';

    if (err.status == 400) {
        errMsg = "The request can not be processed at the moment. Please try again later or connect with admin!!";
    } else if (err.status == 404) {
        errMsg = "The resources you are looking for is not available. Please try again later or connect with admin!!";
    } else {
        if (err.error instanceof Error) {

            errMsg = err.error.message;

            console.log(errMsg)
        }
        else if (typeof err.error === 'string') {
            alert("I am in error")
            errMsg = JSON.parse(err.error).errorMessage
        }
        else {
            if (err.status == 0) {
                errMsg = "A connection to back end can not be established.";
            } else {
                errMsg = err.error.message;
            }
        }
    }
    return throwError(errMsg);
  }
}
