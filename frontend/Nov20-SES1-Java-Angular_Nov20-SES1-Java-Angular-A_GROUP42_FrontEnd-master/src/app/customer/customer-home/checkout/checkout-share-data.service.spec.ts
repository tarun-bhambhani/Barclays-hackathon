import { TestBed } from '@angular/core/testing';

import { CheckoutShareDataService } from './checkout-share-data.service';

describe('CheckoutShareDataService', () => {
  let service: CheckoutShareDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CheckoutShareDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
