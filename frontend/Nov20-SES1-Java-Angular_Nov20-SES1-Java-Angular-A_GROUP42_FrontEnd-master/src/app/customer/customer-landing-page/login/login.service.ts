import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpErrorResponse } from "@angular/common/http";
import { Customer } from "../../../shared/models/customer";
import { environment } from "../../../../environments/environment";
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
    providedIn:'root'
})
export class LoginService {
    private headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    constructor(private http: HttpClient) {

    }
    login(customer: Customer): Observable<Customer> {
        const url = environment.customerAPIUrl +"authenticateUser/"+ customer.emailId+"/"+customer.password;

        return this.http.get<Customer>(url,{headers:this.headers})
        .pipe(catchError(this.handleError));

    }
    private handleError(err: HttpErrorResponse) {
        console.log(err)
        let errMsg:string='';
        if (err.error instanceof Error) {   
            errMsg=err.error.message;
            console.log(errMsg)
        }
         else if(typeof err.error === 'string'){
            errMsg = JSON.parse(err.error).errorMessage
        }
        else {
           if(err.status==0){ 
               errMsg="A connection to back end can not be established.";
           }else{
            errMsg = err.error.errorMessage;
           }
         }
            return throwError(errMsg);
    }
}