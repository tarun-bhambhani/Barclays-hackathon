import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree,Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CheckoutGuard implements CanActivate {
  constructor(private router:Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let cart=JSON.parse(sessionStorage.getItem("cart"));
    console.log(cart)
    if(cart!=null && cart.length!=0){
      return true;
    }
    else{
      this.router.navigate(['home']);
      return false;
    }
  }
  
}
