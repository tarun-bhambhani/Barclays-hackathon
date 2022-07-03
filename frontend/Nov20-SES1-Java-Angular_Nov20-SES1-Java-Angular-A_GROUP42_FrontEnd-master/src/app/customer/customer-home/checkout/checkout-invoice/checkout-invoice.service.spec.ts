import { TestBed } from '@angular/core/testing';

import { CheckoutInvoiceService } from './checkout-invoice.service';

describe('CheckoutInvoiceService', () => {
  let service: CheckoutInvoiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CheckoutInvoiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
