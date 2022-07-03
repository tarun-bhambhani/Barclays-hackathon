import { TestBed } from '@angular/core/testing';

import { CheckoutAddressService } from './checkout-address.service';

describe('CheckoutAddressService', () => {
  let service: CheckoutAddressService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CheckoutAddressService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
