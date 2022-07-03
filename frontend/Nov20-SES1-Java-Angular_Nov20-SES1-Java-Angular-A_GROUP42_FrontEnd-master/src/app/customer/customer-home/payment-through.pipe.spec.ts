import { PaymentThroughPipe } from './payment-through.pipe';

describe('PaymentThroughPipe', () => {
  it('create an instance', () => {
    const pipe = new PaymentThroughPipe();
    expect(pipe).toBeTruthy();
  });
});
