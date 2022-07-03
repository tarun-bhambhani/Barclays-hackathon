import { TestBed } from '@angular/core/testing';

import { CheckoutCardService } from './checkout-card.service';

describe('CheckoutCardService', () => {
  let service: CheckoutCardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CheckoutCardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
