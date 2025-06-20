export interface StripeProduct {
  priceId: string;
  name: string;
  description: string;
  mode: 'payment' | 'subscription';
  price?: string;
  currency?: string;
}

export const stripeProducts: StripeProduct[] = [
  {
    priceId: 'price_1RbzIbR9EITXQuWq5DD9w8PW',
    name: 'ThaiProperty',
    description: 'Access to premium Thai property AI features and analytics',
    mode: 'subscription',
    price: 'Free',
    currency: 'THB'
  }
];

export const getProductByPriceId = (priceId: string): StripeProduct | undefined => {
  return stripeProducts.find(product => product.priceId === priceId);
};

export const getProductsByMode = (mode: 'payment' | 'subscription'): StripeProduct[] => {
  return stripeProducts.filter(product => product.mode === mode);
};