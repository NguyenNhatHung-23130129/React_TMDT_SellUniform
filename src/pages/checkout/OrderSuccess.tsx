import { useState } from 'react';
import type { OrderConfirmation } from './orderTypes';
import './OrderSuccess.css';

type OrderSuccessProps = {
  order: OrderConfirmation;
  onContinueShopping: () => void;
};

const formatCurrency = (amount: number) => `${amount.toLocaleString('vi-VN')} đ`;

function OrderSuccess({ order, onContinueShopping }: OrderSuccessProps) {
  const [copied, setCopied] = useState(false);
  const [showTrackingInfo, setShowTrackingInfo] = useState(false);

  const copyOrderNumber = async () => {
    try {
      await navigator.clipboard.writeText(order.orderNumber);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="order-success-page">
      <section className="order-success-hero" aria-labelledby="order-success-title">
        <div className="order-success-check" aria-hidden="true">
          <svg viewBox="0 0 24 24">
            <path d="m5 12.5 4.5 4L19 7" />
          </svg>
        </div>
        <h1 id="order-success-title">Đặt hàng thành công!</h1>
        <p className="order-success-thanks">Cảm ơn bạn đã tin tưởng và lựa chọn SellUniform.</p>
        <p className="order-success-message">
          Đơn hàng của bạn đang được tiếp nhận và sẽ sớm được xác nhận. Chúng tôi sẽ liên hệ qua
          thông tin đã cung cấp.
        </p>
        <div className="order-success-meta">
          <div className="order-success-number">
            <span>Mã đơn hàng:</span>
            <strong>{order.orderNumber}</strong>
            <button type="button" onClick={copyOrderNumber}>
              {copied ? 'Đã sao chép' : 'Sao chép'}
            </button>
          </div>
          <div className="order-success-status">
            <span className="status-dot" aria-hidden="true" />
            <span>Trạng thái: Đang chờ xác nhận</span>
            <time>{order.orderedAt}</time>
          </div>
        </div>
        {showTrackingInfo && (
          <p className="order-tracking-message" role="status">
            Đơn hàng {order.orderNumber} đang chờ xác nhận. Chúng tôi sẽ liên hệ với bạn qua số điện
            thoại đã đăng ký.
          </p>
        )}
      </section>

      <div className="order-success-grid">
        <section className="success-card success-products" aria-labelledby="success-products-title">
          <div className="success-card-heading">
            <h2 id="success-products-title">Kiện hàng may sẵn xuất kho</h2>
            <span>{order.items.length} sản phẩm</span>
          </div>

          <div className="success-product-list">
            {order.items.map((item) => (
              <article className="success-product" key={item.name}>
                <span className={`success-product-thumb ${item.tone}`} aria-hidden="true">
                  <svg viewBox="0 0 48 48">
                    <path d="m15 8 9 4 9-4 9 7-5 8-5-3v20H16V20l-5 3-5-8 9-7Z" />
                    <path className="success-shirt-seam" d="m18 9 6 7 6-7M24 16v24" />
                  </svg>
                </span>
                <div className="success-product-copy">
                  <h3>{item.name}</h3>
                  <p>{item.options}</p>
                  <p>{item.quantity}</p>
                </div>
                <strong>{formatCurrency(item.price)}</strong>
              </article>
            ))}
          </div>

          <div className="success-product-note">
            <span aria-hidden="true">▣</span>
            <p>
              Kiện hàng sẽ được đóng gói và kiểm tra số lượng trước khi bàn giao cho đơn vị vận
              chuyển.
            </p>
          </div>
        </section>

        <div className="success-detail-stack">
          <section
            className="success-card success-recipient"
            aria-labelledby="success-recipient-title"
          >
            <div className="success-card-heading">
              <h2 id="success-recipient-title">Thông tin nhận hàng</h2>
            </div>
            <strong className="success-recipient-name">{order.customerName}</strong>
            <p className="success-recipient-phone">{order.customerPhone}</p>
            <div className="success-address-box">
              <span>
                {order.customerType === 'business'
                  ? 'Địa chỉ đăng ký kinh doanh'
                  : 'Địa chỉ nhận hàng'}
              </span>
              <p>{order.address}</p>
              {order.companyTaxCode && <span>Mã số thuế: {order.companyTaxCode}</span>}
            </div>
            <p className="success-recipient-email">
              {order.customerType === 'business' ? 'Email hóa đơn' : 'Email'}: {order.customerEmail}
            </p>
            {order.deliveryNote && (
              <p className="success-recipient-note">Ghi chú: {order.deliveryNote}</p>
            )}
          </section>

          <section className="success-card success-payment" aria-labelledby="success-payment-title">
            <div className="success-card-heading">
              <h2 id="success-payment-title">Phương thức thanh toán</h2>
              <span className="success-payment-status">Đã ghi nhận</span>
            </div>
            <p className="success-payment-method">
              <span className="success-payment-mark" aria-hidden="true">
                ✓
              </span>
              {order.paymentLabel}
            </p>

            <dl className="success-totals">
              <div>
                <dt>Tạm tính ({order.items.length} sản phẩm)</dt>
                <dd>{formatCurrency(order.subtotal)}</dd>
              </div>
              <div className="success-discount">
                <dt>Chiết khấu sỉ</dt>
                <dd>- {formatCurrency(order.productDiscount)}</dd>
              </div>
              {order.couponDiscount > 0 && (
                <div className="success-discount">
                  <dt>Voucher {order.couponCode}</dt>
                  <dd>- {formatCurrency(order.couponDiscount)}</dd>
                </div>
              )}
              <div className="success-shipping">
                <dt>Phí vận chuyển</dt>
                <dd>
                  {order.shippingCost === 0 ? 'Miễn phí' : formatCurrency(order.shippingCost)}
                </dd>
              </div>
              {order.vat > 0 && (
                <div>
                  <dt>Thuế GTGT (VAT 8%)</dt>
                  <dd>{formatCurrency(order.vat)}</dd>
                </div>
              )}
            </dl>

            <div className="success-grand-total">
              <span>Tổng thanh toán</span>
              <strong>{formatCurrency(order.total)}</strong>
            </div>
            <p className="success-total-note">{order.shippingLabel}</p>
          </section>
        </div>
      </div>

      <div className="order-success-actions">
        <button
          type="button"
          className="success-track-button"
          onClick={() => setShowTrackingInfo((isVisible) => !isVisible)}
        >
          Theo dõi đơn hàng
        </button>
        <button type="button" className="success-continue-button" onClick={onContinueShopping}>
          Tiếp tục mua sắm
        </button>
      </div>

      <section className="success-benefits" aria-label="Quyền lợi khách hàng">
        <article className="success-benefit-card">
          <span className="success-benefit-icon" aria-hidden="true">
            ↔
          </span>
          <h2>Đổi trả &amp; đổi size linh hoạt</h2>
          <p>Nhận hàng có thể kiểm tra và đổi size theo chính sách hỗ trợ của VIETUNIFORM.</p>
        </article>
        <article className="success-benefit-card">
          <span className="success-benefit-icon" aria-hidden="true">
            ⌂
          </span>
          <h2>Đóng gói cẩn thận</h2>
          <p>Đơn hàng được kiểm tra số lượng và đóng gói trước khi chuyển đến đơn vị giao hàng.</p>
        </article>
        <article className="success-benefit-card">
          <span className="success-benefit-icon" aria-hidden="true">
            ▤
          </span>
          <h2>Hỗ trợ đơn hàng</h2>
          <p>Liên hệ đội ngũ VIETUNIFORM nếu bạn cần hỗ trợ về đơn hàng hoặc hóa đơn.</p>
        </article>
      </section>
    </div>
  );
}

export default OrderSuccess;
