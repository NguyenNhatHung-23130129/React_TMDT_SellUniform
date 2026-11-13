import type { CSSProperties } from 'react';
import type { OrderHistoryRecord, OrderHistoryStatus } from './orderHistoryTypes';
import './OrderDetail.css';

type OrderDetailProps = {
  order: OrderHistoryRecord;
  onBack: () => void;
  onContinueShopping: () => void;
};

const statusLabels: Record<OrderHistoryStatus, string> = {
  waiting: 'Đang chờ xác nhận',
  shipping: 'Đang giao hàng',
  completed: 'Đã giao thành công',
  cancelled: 'Đã hủy',
};

const trackingSteps = [
  {
    title: 'Đặt hàng thành công',
    description: 'Đơn hàng đã được ghi nhận trên hệ thống.',
  },
  {
    title: 'Kiểm duyệt & Đóng gói',
    description: 'Đơn hàng được kiểm tra và chuẩn bị tại kho.',
  },
  {
    title: 'Đang giao hàng',
    description: 'Đơn hàng đang được vận chuyển đến bạn.',
  },
  {
    title: 'Giao hàng thành công',
    description: 'Bạn có thể kiểm tra hàng khi nhận.',
  },
];

const formatCurrency = (amount: number) => `${amount.toLocaleString('vi-VN')} đ`;

function StepIcon({ index }: { index: number }) {
  if (index === 0 || index === 3) {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="m5 12.5 4.5 4L19 7" />
      </svg>
    );
  }

  if (index === 1) {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M4 7.5 12 3l8 4.5v9L12 21l-8-4.5z" />
        <path d="m4.5 7.7 7.5 4.2 7.5-4.2M12 12v8.5" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M3 6h11v11H3zM14 10h4l3 3v4h-7z" />
      <circle cx="7.5" cy="18" r="1.8" />
      <circle cx="18" cy="18" r="1.8" />
    </svg>
  );
}

function DetailIcon({ type }: { type: 'pin' | 'payment' | 'support' }) {
  if (type === 'pin') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M19 10c0 5-7 11-7 11S5 15 5 10a7 7 0 1 1 14 0Z" />
        <circle cx="12" cy="10" r="2.3" />
      </svg>
    );
  }

  if (type === 'payment') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="M3 10h18M7 15h4" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 13v-2a7 7 0 0 1 14 0v2M5 13H4a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h3v-6H5ZM19 13h1a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-3v-6h2ZM12 19h2" />
    </svg>
  );
}

function OrderThumbnail({ tone }: { tone: string }) {
  return (
    <span className={`order-detail-product-thumbnail ${tone}`} aria-hidden="true">
      <svg viewBox="0 0 48 48">
        <path d="m15 8 9 4 9-4 9 7-5 8-5-3v20H16V20l-5 3-5-8 9-7Z" />
        <path className="order-detail-shirt-seam" d="m18 9 6 7 6-7M24 16v24" />
      </svg>
    </span>
  );
}

function OrderDetail({ order, onBack, onContinueShopping }: OrderDetailProps) {
  const itemSubtotal = order.items.reduce((sum, item) => sum + item.price, 0);
  const subtotal = order.subtotal ?? itemSubtotal;
  const productDiscount = order.productDiscount ?? 0;
  const couponDiscount = order.couponDiscount ?? 0;
  const shippingCost = order.shippingCost ?? 0;
  const vat = order.vat ?? 0;
  const itemCount = order.items.reduce((sum, item) => {
    const quantity = Number(item.quantity.match(/\d+/)?.[0] ?? 0);
    return sum + quantity;
  }, 0);
  const activeStep =
    order.status === 'waiting'
      ? 1
      : order.status === 'shipping'
        ? 2
        : order.status === 'completed'
          ? trackingSteps.length
          : -1;
  const completedStepCount = Math.max(0, Math.min(activeStep, trackingSteps.length - 1));
  const trackingProgressStyle = {
    width: `${(75 * completedStepCount) / (trackingSteps.length - 1)}%`,
  } as CSSProperties;
  const statusMessage =
    order.status === 'shipping'
      ? 'Đơn hàng đã được bàn giao cho đơn vị vận chuyển và đang trên đường đến bạn.'
      : order.status === 'completed'
        ? 'Đơn hàng đã được giao thành công. Cảm ơn bạn đã mua sắm tại VIETUNIFORM.'
        : order.status === 'cancelled'
          ? 'Đơn hàng này đã được hủy. Liên hệ với chúng tôi nếu bạn cần hỗ trợ.'
          : 'Cửa hàng đã nhận đơn và sẽ sớm liên hệ để xác nhận.';

  return (
    <div className="order-detail-page">
      <nav className="order-detail-breadcrumb" aria-label="Điều hướng">
        <button type="button" onClick={onContinueShopping}>
          Trang chủ
        </button>
        <span aria-hidden="true">›</span>
        <button type="button" onClick={onBack}>
          Theo dõi đơn hàng
        </button>
      </nav>

      <div className="order-detail-title-row">
        <h1>Chi tiết đơn hàng</h1>
        <span className={`order-detail-status status-${order.status}`}>
          <i aria-hidden="true" /> {statusLabels[order.status]}
        </span>
      </div>

      <article className="order-detail-card">
        <header className="order-detail-card-heading">
          <h2>Đơn hàng {order.orderNumber}</h2>
          <button type="button" onClick={() => window.print()}>
            <span aria-hidden="true">▣</span> In đơn hàng
          </button>
        </header>

        <section className="order-tracking" aria-labelledby="order-tracking-title">
          <h3 id="order-tracking-title">Trạng thái vận chuyển</h3>
          <div className="order-tracking-timeline">
            <div className="order-tracking-rail" aria-hidden="true">
              <span style={trackingProgressStyle} />
            </div>
            {trackingSteps.map((step, index) => {
              const state =
                order.status === 'completed' || index < activeStep
                  ? 'complete'
                  : index === activeStep
                    ? 'current'
                    : 'upcoming';

              return (
                <div
                  className={`order-tracking-step is-${state}`}
                  key={step.title}
                  aria-current={state === 'current' ? 'step' : undefined}
                >
                  <span className="order-tracking-marker">
                    <StepIcon index={index} />
                  </span>
                  <strong>{step.title}</strong>
                  <p>{step.description}</p>
                  {index === 0 && <time>{order.orderedAt}</time>}
                </div>
              );
            })}
          </div>
          <p className={`order-tracking-message status-${order.status}`} role="status">
            {statusMessage}
          </p>
        </section>

        <div className="order-detail-columns">
          <div className="order-detail-main-column">
            <section className="order-detail-recipient">
              <span className="order-detail-recipient-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24">
                  <path d="M3 7h11v10H3zM14 10h4l3 3v4h-7z" />
                  <circle cx="7" cy="18" r="1.7" />
                  <circle cx="18" cy="18" r="1.7" />
                </svg>
              </span>
              <div className="order-detail-recipient-copy">
                <strong>{order.customerName}</strong>
                <span>{order.customerPhone}</span>
                {order.customerEmail && <span>{order.customerEmail}</span>}
              </div>
              <a
                className="order-detail-call-button"
                href={`tel:${order.customerPhone.replace(/\s/g, '')}`}
              >
                Gọi người nhận
              </a>
            </section>

            <section className="order-detail-products" aria-labelledby="order-products-title">
              <div className="order-detail-section-heading">
                <div>
                  <h3 id="order-products-title">
                    Kiện hàng gồm {order.items.length} loại sản phẩm ({itemCount} sản phẩm)
                  </h3>
                  <p>Được đóng gói và kiểm tra trước khi giao</p>
                </div>
                <span>{order.items.length} mặt hàng</span>
              </div>

              <div className="order-detail-product-list">
                {order.items.map((item) => (
                  <article className="order-detail-product" key={item.name}>
                    <OrderThumbnail tone={item.tone} />
                    <div className="order-detail-product-copy">
                      <span className="order-detail-product-category">Đồng phục cao cấp</span>
                      <h4>{item.name}</h4>
                      <p>{item.options}</p>
                      <small>Số lượng: {item.quantity}</small>
                    </div>
                    <div className="order-detail-product-price">
                      <strong>{formatCurrency(item.price)}</strong>
                      <small>
                        {formatCurrency(
                          item.price / Math.max(Number(item.quantity.match(/\d+/)?.[0] ?? 1), 1),
                        )}{' '}
                        / sản phẩm
                      </small>
                    </div>
                  </article>
                ))}
              </div>

              <dl className="order-detail-totals">
                <div>
                  <dt>Tạm tính tiền hàng:</dt>
                  <dd>{formatCurrency(subtotal)}</dd>
                </div>
                {productDiscount > 0 && (
                  <div className="is-discount">
                    <dt>Chiết khấu trực tiếp:</dt>
                    <dd>- {formatCurrency(productDiscount)}</dd>
                  </div>
                )}
                {couponDiscount > 0 && (
                  <div className="is-discount">
                    <dt>Ưu đãi {order.couponCode ? `(${order.couponCode})` : 'mã giảm giá'}:</dt>
                    <dd>- {formatCurrency(couponDiscount)}</dd>
                  </div>
                )}
                <div>
                  <dt>Phí vận chuyển:</dt>
                  <dd>{shippingCost === 0 ? 'Miễn phí' : formatCurrency(shippingCost)}</dd>
                </div>
                {vat > 0 && (
                  <div>
                    <dt>Thuế GTGT (VAT 8%):</dt>
                    <dd>{formatCurrency(vat)}</dd>
                  </div>
                )}
                <div className="order-detail-grand-total">
                  <dt>Tổng thanh toán:</dt>
                  <dd>{formatCurrency(order.total)}</dd>
                </div>
              </dl>
            </section>
          </div>

          <aside className="order-detail-side-column">
            <section className="order-detail-side-card" aria-labelledby="order-address-title">
              <h3 id="order-address-title">
                <DetailIcon type="pin" /> Địa chỉ nhận hàng &amp; liên hệ
              </h3>
              {order.customerType === 'business' && (
                <span className="order-detail-business-label">Văn phòng công ty</span>
              )}
              <strong>{order.customerName}</strong>
              <p>Số điện thoại: {order.customerPhone}</p>
              {order.companyTaxCode && <p>Mã số thuế: {order.companyTaxCode}</p>}
              <p>{order.address}</p>
              {order.deliveryNote && (
                <p className="order-detail-delivery-note">Ghi chú: {order.deliveryNote}</p>
              )}
            </section>

            <section className="order-detail-side-card" aria-labelledby="order-payment-title">
              <h3 id="order-payment-title">
                <DetailIcon type="payment" /> Phương thức thanh toán
              </h3>
              <div className="order-detail-payment-method">
                <span aria-hidden="true">✓</span>
                <strong>{order.paymentLabel}</strong>
                <small>{order.status === 'waiting' ? 'Chờ xác nhận' : 'Đã ghi nhận'}</small>
              </div>
              <div className="order-detail-payment-reference">
                Mã đơn: <strong>{order.orderNumber}</strong>
              </div>
            </section>

            <section className="order-detail-help-card">
              <span className="order-detail-help-icon" aria-hidden="true">
                <DetailIcon type="support" />
              </span>
              <h3>Cần đổi size khi nhận hàng?</h3>
              <p>
                VIETUNIFORM hỗ trợ đổi size trong 30 ngày. Kiểm tra sản phẩm khi nhận hàng và liên
                hệ nếu bạn cần hỗ trợ.
              </p>
              <div className="order-detail-help-contact">
                <span>
                  Tổng đài hỗ trợ đơn hàng
                  <strong>
                    1900 1234 <small>(8:00–21:00)</small>
                  </strong>
                </span>
                <a href="tel:19001234">Yêu cầu hỗ trợ</a>
              </div>
            </section>
          </aside>
        </div>
      </article>
    </div>
  );
}

export default OrderDetail;
