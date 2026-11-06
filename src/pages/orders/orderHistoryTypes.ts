import type { OrderConfirmation, OrderSummaryItem } from '../checkout/orderTypes';

export type OrderHistoryStatus = 'waiting' | 'shipping' | 'completed' | 'cancelled';

export type OrderHistoryRecord = Pick<
  OrderConfirmation,
  | 'orderNumber'
  | 'orderedAt'
  | 'customerName'
  | 'customerPhone'
  | 'customerEmail'
  | 'address'
  | 'paymentLabel'
  | 'shippingLabel'
  | 'items'
  | 'total'
> & {
  createdAt: number;
  status: OrderHistoryStatus;
};

export function toOrderHistoryRecord(order: OrderConfirmation): OrderHistoryRecord {
  return {
    orderNumber: order.orderNumber,
    orderedAt: order.orderedAt,
    customerName: order.customerName,
    customerPhone: order.customerPhone,
    customerEmail: order.customerEmail,
    address: order.address,
    paymentLabel: order.paymentLabel,
    shippingLabel: order.shippingLabel,
    items: order.items,
    total: order.total,
    createdAt: Date.now(),
    status: 'waiting',
  };
}

const makeItem = (
  name: string,
  options: string,
  quantity: string,
  price: number,
  tone: string,
): OrderSummaryItem => ({ name, options, quantity, price, tone });

export const demoOrderHistory: OrderHistoryRecord[] = [
  {
    orderNumber: '#VN-89421',
    orderedAt: '24/10/2024',
    createdAt: Date.UTC(2024, 9, 24),
    status: 'shipping',
    customerName: 'Anh Trần Minh Quân',
    customerPhone: '0903 821 772',
    customerEmail: 'quan.tran@example.com',
    address: 'Tòa nhà VinaCorp, Tầng 14, Võ Văn Kiệt, TP. Hồ Chí Minh',
    paymentLabel: 'VietQR chuyển khoản ngân hàng',
    shippingLabel: 'Giao hàng tiêu chuẩn toàn quốc',
    items: [
      makeItem(
        'Áo Polo CVC Coolmax phối cổ dệt bo',
        'Màu: Navy • Chất liệu: CVC Coolmax',
        '6 áo',
        1_800_000,
        'thumbnail-navy',
      ),
      makeItem(
        'Bộ Scrub Y Tế Kháng Khuẩn Bác Sĩ',
        'Màu: Xanh Teal • Vải kháng khuẩn',
        '4 bộ',
        603_500,
        'thumbnail-teal',
      ),
    ],
    total: 2_403_500,
  },
  {
    orderNumber: '#VN-89398',
    orderedAt: '21/10/2024',
    createdAt: Date.UTC(2024, 9, 21),
    status: 'waiting',
    customerName: 'Anh Trần Minh Quân',
    customerPhone: '0903 821 772',
    customerEmail: 'quan.tran@example.com',
    address: 'Tòa nhà VinaCorp, Tầng 14, Võ Văn Kiệt, TP. Hồ Chí Minh',
    paymentLabel: 'Thanh toán khi nhận hàng (COD)',
    shippingLabel: 'Giao hàng tiêu chuẩn toàn quốc',
    items: [
      makeItem(
        'Áo Sơ Mi Sỉ Nam Tay Dài Bamboo Cao Cấp',
        'Màu: Trắng • Size: M–XL • Chống nhăn',
        '5 áo',
        1_305_000,
        'thumbnail-plum',
      ),
    ],
    total: 1_305_000,
  },
  {
    orderNumber: '#VN-89304',
    orderedAt: '18/10/2024',
    createdAt: Date.UTC(2024, 9, 18),
    status: 'completed',
    customerName: 'Anh Trần Minh Quân',
    customerPhone: '0903 821 772',
    customerEmail: 'quan.tran@example.com',
    address: 'Tòa nhà VinaCorp, Tầng 14, Võ Văn Kiệt, TP. Hồ Chí Minh',
    paymentLabel: 'VietQR chuyển khoản ngân hàng',
    shippingLabel: 'Đã giao hàng ngày 19/10/2024',
    items: [
      makeItem(
        'Tạp Dề Canvas Vintage Phối Dây Da F&B',
        'Màu: Nâu • Dây da cao cấp',
        '10 chiếc',
        1_350_000,
        'thumbnail-teal',
      ),
    ],
    total: 1_350_000,
  },
  {
    orderNumber: '#VN-88719',
    orderedAt: '02/10/2024',
    createdAt: Date.UTC(2024, 9, 2),
    status: 'cancelled',
    customerName: 'Anh Trần Minh Quân',
    customerPhone: '0903 821 772',
    customerEmail: 'quan.tran@example.com',
    address: 'Tòa nhà VinaCorp, Tầng 14, Võ Văn Kiệt, TP. Hồ Chí Minh',
    paymentLabel: 'Thanh toán khi nhận hàng (COD)',
    shippingLabel: 'Đơn hàng đã được hủy',
    items: [
      makeItem(
        'Áo Polo CVC Coolmax phối cổ dệt bo',
        'Màu: Navy • Chất liệu: CVC Coolmax',
        '4 áo',
        780_000,
        'thumbnail-navy',
      ),
    ],
    total: 780_000,
  },
];
