import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Orders } from 'src/app/shared/models/order';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MyOrdersService {

  private headers = new HttpHeaders({ 'Content-Type': 'text/plain' });
 
  constructor(private http : HttpClient) {}

    getOrders(emailId: String){
      let url:string = environment.customerAPIUrl+"/getOrders/"+emailId;
      return this.http.get<Orders[][]>(url, {headers: this.headers});
  }
    cancelOrder(id:number){
      let url:string = environment.cancelOrderAPI+"cancelOrder/"+id;
      return this.http.put<boolean>(url, {headers: this.headers});
    }
}
