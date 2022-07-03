import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Cart } from 'src/app/shared/models/cart';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  continue: boolean = true;

  constructor(private _router: Router) { }

  ngOnInit(): void {
    this._router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)){
        return;
      }
      window.scrollTo(0, 0);
    });
  }

}
