export type OrderSummaryItem = {
  name: string;
  options: string;
  quantity: string;
  price: number;
  tone: string;
};

export type OrderConfirmation = {
  orderNumber: string;
  orderedAt: string;
  customerType: 'personal' | 'business';
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  address: string;
  companyTaxCode?: string;
  deliveryNote?: string;
  paymentLabel: string;
  shippingLabel: string;
  couponCode?: string;
  items: OrderSummaryItem[];
  subtotal: number;
  productDiscount: number;
  couponDiscount: number;
  shippingCost: number;
  vat: number;
  total: number;
};
