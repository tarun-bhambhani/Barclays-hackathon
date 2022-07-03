import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Address } from 'src/app/shared/models/address';
import { environment } from 'src/environments/environment';
import { Cart } from 'src/app/shared/models/cart';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CheckoutInvoiceService {
  private headers = new HttpHeaders({ 'Content-Type': 'text/plain' });
  constructor(private http:HttpClient) { }
  
  getAddress(addressId:number){
    let url:string = environment.addressAPI +addressId;
    return this.http.get<Address>(url,{headers: this.headers});
  }

  updateCart(cartsToDelete: number[], emailId : String): Observable<Cart[]>{
    let url: string = environment.updateCartAPI+"/"+emailId;
    return this.http.post<Cart[]>(url, cartsToDelete);
  }
}
