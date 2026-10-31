import { useState } from 'react';
import './Checkout.css';

function LocationIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}

function TruckIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M3 6h11v11H3zM14 10h4l3 3v4h-7z" />
      <circle cx="7.5" cy="18" r="1.8" />
      <circle cx="18" cy="18" r="1.8" />
    </svg>
  );
}

function PaymentIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="3" y="6" width="18" height="13" rx="2" />
      <path d="M3 10h18M8 15h3" />
    </svg>
  );
}

function QrIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3z" />
      <path d="M5.5 5.5h2v2h-2zM16.5 5.5h2v2h-2zM5.5 16.5h2v2h-2zM14 14h3v3h-3zM19 14v2M17 19h2M21 18v3M14 19v2" />
    </svg>
  );
}

function CashIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M12 8v8M14 10.2c-.5-.5-1.1-.7-2-.7-1 0-1.7.5-1.7 1.2 0 1.8 3.4.7 3.4 2.4 0 .7-.7 1.2-1.8 1.2-.8 0-1.5-.3-2-.8" />
    </svg>
  );
}

function CardIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 10h18" />
    </svg>
  );
}

function Checkout() {
  const [city, setCity] = useState('TP. Hồ Chí Minh');
  const [district, setDistrict] = useState('Quận 1');
  const [shippingMethod, setShippingMethod] = useState('standard');
  const [paymentMethod, setPaymentMethod] = useState('vietqr');

  const districts = city === 'TP. Hồ Chí Minh'
    ? ['Quận 1', 'Quận 3', 'Quận 7', 'Bình Thạnh', 'Thành phố Thủ Đức']
    : ['Ba Đình', 'Cầu Giấy', 'Đống Đa', 'Hai Bà Trưng', 'Hoàn Kiếm'];

  const handleCityChange = (value: string) => {
    setCity(value);
    setDistrict(value === 'TP. Hồ Chí Minh' ? 'Quận 1' : 'Ba Đình');
  };

  return (
    <>
    <section className="checkout-section checkout-delivery" aria-labelledby="delivery-title">
      <div className="delivery-card-heading">
        <div className="delivery-title-group">
          <div className="delivery-icon"><LocationIcon /></div>
          <div>
            <h2 id="delivery-title">1. Thông Tin Nhận Hàng</h2>
            <p>Địa chỉ giao phát đồng phục và thông tin đại diện nhận kiện</p>
          </div>
        </div>
        <span className="required-badge">Bắt buộc</span>
      </div>

      <form className="delivery-form" onSubmit={(event) => event.preventDefault()}>
        <div className="delivery-fields">
          <div className="delivery-field">
            <label htmlFor="recipient-name">Họ và tên người nhận <span>*</span></label>
            <input id="recipient-name" name="recipientName" type="text" defaultValue="Nguyễn Văn Hoàng" autoComplete="name" required />
          </div>

          <div className="delivery-field">
            <label htmlFor="recipient-phone">Số điện thoại nhận hàng <span>*</span></label>
            <input id="recipient-phone" name="recipientPhone" type="tel" defaultValue="0988 234 567" autoComplete="tel" required />
          </div>

          <div className="delivery-field delivery-field-wide">
            <label htmlFor="recipient-email">Email nhận thông báo đơn &amp; mã tracking <span>*</span></label>
            <input id="recipient-email" name="recipientEmail" type="email" defaultValue="hoang.nguyen@vinacorp.vn" autoComplete="email" required />
          </div>

          <div className="delivery-field">
            <label htmlFor="recipient-city">Tỉnh / Thành phố <span>*</span></label>
            <select id="recipient-city" name="city" value={city} onChange={(event) => handleCityChange(event.target.value)} required>
              <option>TP. Hồ Chí Minh</option>
              <option>Hà Nội</option>
            </select>
          </div>

          <div className="delivery-field">
            <label htmlFor="recipient-district">Quận / Huyện <span>*</span></label>
            <select id="recipient-district" name="district" value={district} onChange={(event) => setDistrict(event.target.value)} required>
              {districts.map((name) => <option key={name}>{name}</option>)}
            </select>
          </div>

          <div className="delivery-field delivery-field-wide">
            <label htmlFor="recipient-address">Địa chỉ chi tiết (Tòa nhà, số tầng, số phòng) <span>*</span></label>
            <input id="recipient-address" name="address" type="text" defaultValue="Tầng 12, Tòa nhà Bitexco Financial, số 2 Hải Triều, P. Bến Nghé" autoComplete="street-address" required />
          </div>

          <div className="delivery-field delivery-field-wide">
            <label htmlFor="delivery-note">Ghi chú giao hàng cho shipper</label>
            <textarea id="delivery-note" name="deliveryNote" rows={3} defaultValue="Giao giờ hành chính, gọi trước khi giao, đồng phục kiểm tra mã size kỹ" />
          </div>
        </div>
      </form>
    </section>

    <section className="checkout-section checkout-shipping" aria-labelledby="shipping-title">
      <div className="checkout-section-heading">
        <div className="checkout-section-title-group">
          <div className="checkout-section-icon"><TruckIcon /></div>
          <div>
            <h2 id="shipping-title">3. Phương Thức Vận Chuyển</h2>
            <p>Đồng phục may sẵn đóng kiện cẩn thận theo tiêu chuẩn</p>
          </div>
        </div>
      </div>

      <div className="checkout-choice-list" role="radiogroup" aria-labelledby="shipping-title">
        <label className={`checkout-choice-card shipping-choice ${shippingMethod === 'standard' ? 'is-selected' : ''}`}>
          <input className="checkout-radio" type="radio" name="shippingMethod" value="standard" checked={shippingMethod === 'standard'} onChange={() => setShippingMethod('standard')} />
          <span className="checkout-choice-radio" aria-hidden="true" />
          <span className="checkout-choice-copy">
            <span className="checkout-choice-title-row">
              <strong>Giao hàng tiêu chuẩn toàn quốc</strong>
              <span className="choice-badge badge-green">Khuyên dùng</span>
            </span>
            <span className="checkout-choice-description">Thời gian nhận từ 1 - 3 ngày làm việc (Viettel Post / GHN bảo hiểm kiện hàng)</span>
          </span>
          <strong className="checkout-choice-price price-free">Miễn phí</strong>
        </label>

        <label className={`checkout-choice-card shipping-choice ${shippingMethod === 'express' ? 'is-selected' : ''}`}>
          <input className="checkout-radio" type="radio" name="shippingMethod" value="express" checked={shippingMethod === 'express'} onChange={() => setShippingMethod('express')} />
          <span className="checkout-choice-radio" aria-hidden="true" />
          <span className="checkout-choice-copy">
            <span className="checkout-choice-title-row">
              <strong>Giao hỏa tốc nội thành 2h</strong>
              <span className="choice-badge badge-blue">Grab / Ahamove</span>
            </span>
            <span className="checkout-choice-description">Áp dụng đơn hàng cần gấp trong TP. HCM &amp; Hà Nội (Nhận hàng sau 120 phút)</span>
          </span>
          <strong className="checkout-choice-price">35.000 đ</strong>
        </label>
      </div>
    </section>

    <section className="checkout-section checkout-payment" aria-labelledby="payment-title">
      <div className="checkout-section-heading">
        <div className="checkout-section-title-group">
          <div className="checkout-section-icon"><PaymentIcon /></div>
          <div>
            <h2 id="payment-title">4. Phương Thức Thanh Toán</h2>
            <p>Tích hợp cổng thanh toán doanh nghiệp chuẩn bảo mật cao</p>
          </div>
        </div>
      </div>

      <div className="checkout-choice-list" role="radiogroup" aria-labelledby="payment-title">
        <label className={`checkout-choice-card payment-choice ${paymentMethod === 'vietqr' ? 'is-selected' : ''}`}>
          <input className="checkout-radio" type="radio" name="paymentMethod" value="vietqr" checked={paymentMethod === 'vietqr'} onChange={() => setPaymentMethod('vietqr')} />
          <span className="checkout-choice-radio" aria-hidden="true" />
          <span className="checkout-choice-copy">
            <span className="checkout-choice-title-row">
              <strong>Quét mã VietQR Chuyển khoản ngân hàng tự động</strong>
              <span className="choice-badge badge-blue">Tiện lợi nhất</span>
            </span>
            <span className="checkout-choice-description">Xác nhận tự động trong 3 giây. Hỗ trợ tất cả ứng dụng ngân hàng &amp; ví điện tử.</span>
          </span>
          <span className="checkout-payment-icon checkout-qr-icon"><QrIcon /></span>
          {paymentMethod === 'vietqr' && (
            <span className="checkout-payment-note"><span aria-hidden="true">ⓘ</span> Mã QR cá nhân hóa kèm mã đơn hàng sẽ hiển thị ngay sau khi bạn bấm “Xác Nhận Đặt Hàng”.</span>
          )}
        </label>

        <label className={`checkout-choice-card payment-choice ${paymentMethod === 'cod' ? 'is-selected' : ''}`}>
          <input className="checkout-radio" type="radio" name="paymentMethod" value="cod" checked={paymentMethod === 'cod'} onChange={() => setPaymentMethod('cod')} />
          <span className="checkout-choice-radio" aria-hidden="true" />
          <span className="checkout-choice-copy">
            <span className="checkout-choice-title-row"><strong>Thanh toán khi nhận hàng (COD)</strong></span>
            <span className="checkout-choice-description">Được đồng kiểm số lượng và kiểm tra bảng size trước khi thanh toán tiền mặt</span>
          </span>
          <span className="checkout-payment-icon"><CashIcon /></span>
        </label>

        <label className={`checkout-choice-card payment-choice ${paymentMethod === 'card' ? 'is-selected' : ''}`}>
          <input className="checkout-radio" type="radio" name="paymentMethod" value="card" checked={paymentMethod === 'card'} onChange={() => setPaymentMethod('card')} />
          <span className="checkout-choice-radio" aria-hidden="true" />
          <span className="checkout-choice-copy">
            <span className="checkout-choice-title-row"><strong>Thẻ ATM Nội địa / Thẻ Quốc tế (Visa, Mastercard, JCB)</strong></span>
            <span className="checkout-choice-description">Cổng thanh toán OnePay / VNPAY mã hóa an toàn bảo mật tuyệt đối</span>
          </span>
          <span className="checkout-payment-icon"><CardIcon /></span>
        </label>
      </div>
    </section>
    </>
  );
}

export default Checkout;
