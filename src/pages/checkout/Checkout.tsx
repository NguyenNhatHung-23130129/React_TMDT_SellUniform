import { useEffect, useRef, useState } from 'react';
import './Checkout.css';

type CustomerType = 'personal' | 'business';

type AdministrativeWard = {
  code: number;
  name: string;
  division_type: string;
  province_code: number;
};

type AdministrativeProvince = {
  code: number;
  name: string;
  division_type: string;
  wards?: AdministrativeWard[];
};

const administrativeApiUrl = 'https://provinces.open-api.vn/api/v2/?depth=2';

function validateVietnamesePhone(input: HTMLInputElement) {
  const phone = input.value.trim().replace(/[\s().-]/g, '');
  const nationalPhone = phone.startsWith('+84') ? `0${phone.slice(3)}` : phone;
  const isValid = /^0(?:2\d{8,9}|[35789]\d{8})$/.test(nationalPhone);

  input.setCustomValidity(
    isValid
      ? ''
      : 'Vui lòng nhập số điện thoại Việt Nam hợp lệ, ví dụ 0988123456 hoặc +84988123456.',
  );
}

function validateEmail(input: HTMLInputElement) {
  if (!input.value.trim()) {
    input.setCustomValidity('Vui lòng nhập email.');
  } else if (input.validity.typeMismatch) {
    input.setCustomValidity('Vui lòng nhập địa chỉ email hợp lệ.');
  } else {
    input.setCustomValidity('');
  }
}

function validateAddress(input: HTMLInputElement, minLength = 8) {
  const address = input.value.trim();

  if (!address) {
    input.setCustomValidity('Vui lòng nhập địa chỉ.');
  } else if (address.length < minLength) {
    input.setCustomValidity(`Địa chỉ cần có ít nhất ${minLength} ký tự.`);
  } else {
    input.setCustomValidity('');
  }
}

type PersonalDeliveryFieldsProps = {
  provinces: AdministrativeProvince[];
  wards: AdministrativeWard[];
  provinceCode: string;
  wardCode: string;
  isLoadingLocations: boolean;
  locationLoadError: boolean;
  onProvinceChange: (value: string) => void;
  onWardChange: (value: string) => void;
};

function PersonalDeliveryFields({
  provinces,
  wards,
  provinceCode,
  wardCode,
  isLoadingLocations,
  locationLoadError,
  onProvinceChange,
  onWardChange,
}: PersonalDeliveryFieldsProps) {
  return (
    <div className="delivery-fields">
      <div className="delivery-field">
        <label htmlFor="recipient-name">
          Họ và tên người nhận <span>*</span>
        </label>
        <input
          id="recipient-name"
          name="recipientName"
          type="text"
          defaultValue="Nguyễn Văn Hoàng"
          autoComplete="name"
          required
        />
      </div>

      <div className="delivery-field">
        <label htmlFor="recipient-phone">
          Số điện thoại nhận hàng <span>*</span>
        </label>
        <input
          id="recipient-phone"
          name="recipientPhone"
          type="tel"
          inputMode="tel"
          defaultValue="0988 234 567"
          autoComplete="tel"
          required
          onInput={(event) => validateVietnamesePhone(event.currentTarget)}
        />
      </div>

      <div className="delivery-field delivery-field-wide">
        <label htmlFor="recipient-email">
          Email nhận thông báo đơn &amp; mã tracking <span>*</span>
        </label>
        <input
          id="recipient-email"
          name="recipientEmail"
          type="email"
          defaultValue="hoang.nguyen@vinacorp.vn"
          autoComplete="email"
          maxLength={254}
          required
          onInput={(event) => validateEmail(event.currentTarget)}
        />
      </div>

      <div className="delivery-field">
        <label htmlFor="recipient-city">
          Tỉnh / Thành phố <span>*</span>
        </label>
        <select
          id="recipient-city"
          name="provinceCode"
          value={provinceCode}
          onChange={(event) => onProvinceChange(event.target.value)}
          disabled={isLoadingLocations || locationLoadError}
          required
        >
          <option value="">
            {isLoadingLocations ? 'Đang tải tỉnh / thành phố...' : 'Chọn tỉnh / thành phố'}
          </option>
          {provinces.map((province) => (
            <option key={province.code} value={province.code}>
              {province.name}
            </option>
          ))}
        </select>
      </div>

      <div className="delivery-field">
        <label htmlFor="recipient-ward">
          Phường / Xã <span>*</span>
        </label>
        <select
          id="recipient-ward"
          name="wardCode"
          value={wardCode}
          onChange={(event) => onWardChange(event.target.value)}
          disabled={!provinceCode || isLoadingLocations || locationLoadError}
          required
        >
          <option value="">
            {isLoadingLocations
              ? 'Đang tải phường / xã...'
              : provinceCode
                ? 'Chọn phường / xã'
                : 'Chọn tỉnh / thành phố trước'}
          </option>
          {wards.map((ward) => (
            <option key={ward.code} value={ward.code}>
              {ward.name}
            </option>
          ))}
        </select>
        {locationLoadError && (
          <span className="delivery-location-status" role="status">
            Không tải được danh sách địa chỉ. Vui lòng tải lại trang.
          </span>
        )}
      </div>

      <div className="delivery-field delivery-field-wide">
        <label htmlFor="recipient-address">
          Địa chỉ chi tiết (Tòa nhà, số tầng, số phòng) <span>*</span>
        </label>
        <input
          id="recipient-address"
          name="address"
          type="text"
          defaultValue="Tầng 12, Tòa nhà Bitexco Financial, số 2 Hải Triều"
          autoComplete="street-address"
          minLength={8}
          maxLength={255}
          required
          onInput={(event) => validateAddress(event.currentTarget)}
        />
      </div>

      <div className="delivery-field delivery-field-wide">
        <label htmlFor="delivery-note">Ghi chú giao hàng cho shipper</label>
        <textarea
          id="delivery-note"
          name="deliveryNote"
          rows={3}
          defaultValue="Giao giờ hành chính, gọi trước khi giao, đồng phục kiểm tra mã size kỹ"
        />
      </div>
    </div>
  );
}

function BusinessDetailsFields() {
  return (
    <div className="delivery-fields">
      <div className="business-info-fields">
        <div className="delivery-field delivery-field-wide">
          <label htmlFor="company-name">
            Tên công ty đầy đủ theo ĐKKD <span>*</span>
          </label>
          <input
            id="company-name"
            name="companyName"
            type="text"
            defaultValue="CÔNG TY CỔ PHẦN CÔNG NGHỆ VÀ TRUYỀN THÔNG VINA TECH"
            autoComplete="organization"
            minLength={3}
            maxLength={160}
            required
          />
        </div>

        <div className="delivery-field delivery-field-wide">
          <label htmlFor="company-phone">
            Số điện thoại doanh nghiệp <span>*</span>
          </label>
          <input
            id="company-phone"
            name="companyPhone"
            type="tel"
            autoComplete="tel"
            inputMode="tel"
            placeholder="Ví dụ: 02873008899"
            required
            onInput={(event) => validateVietnamesePhone(event.currentTarget)}
          />
        </div>

        <div className="delivery-field">
          <label htmlFor="company-tax-code">
            Mã số thuế (MST) <span>*</span>
          </label>
          <input
            id="company-tax-code"
            name="companyTaxCode"
            type="text"
            inputMode="numeric"
            defaultValue="0315998822"
            pattern="[0-9]{10}([0-9]{3})?"
            title="Mã số thuế gồm 10 hoặc 13 chữ số."
            maxLength={13}
            required
          />
        </div>

        <div className="delivery-field">
          <label htmlFor="invoice-email">
            Email nhận hóa đơn (File XML/PDF) <span>*</span>
          </label>
          <input
            id="invoice-email"
            name="invoiceEmail"
            type="email"
            defaultValue="ketoan@vinacorp.vn"
            autoComplete="email"
            maxLength={254}
            required
            onInput={(event) => validateEmail(event.currentTarget)}
          />
        </div>

        <div className="delivery-field delivery-field-wide">
          <label htmlFor="company-address">
            Địa chỉ đăng ký kinh doanh chính thức <span>*</span>
          </label>
          <input
            id="company-address"
            name="companyAddress"
            type="text"
            defaultValue="Tầng 12, Bitexco Financial Tower, Số 2 Hải Triều, P. Bến Nghé, Quận 1, TP. Hồ Chí Minh"
            autoComplete="street-address"
            minLength={10}
            maxLength={255}
            required
            onInput={(event) => validateAddress(event.currentTarget, 10)}
          />
        </div>
      </div>
    </div>
  );
}

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

function ProductThumbnail({ tone }: { tone: string }) {
  return (
    <span className={`summary-product-thumbnail ${tone}`} aria-hidden="true">
      <svg viewBox="0 0 48 48">
        <path d="m15 8 9 4 9-4 9 7-5 8-5-3v20H16V20l-5 3-5-8 9-7Z" />
        <path className="shirt-seam" d="m18 9 6 7 6-7M24 16v24" />
      </svg>
    </span>
  );
}

const cartItems = [
  {
    name: 'Áo Sơ Mi Công Sở Oxford Nam Tay Dài',
    options: 'Màu: Xanh Navy • Size: L (May chuẩn)',
    quantity: 'Số lượng: 10 cái',
    price: 2_450_000,
    tone: 'thumbnail-navy',
  },
  {
    name: 'Bộ Đồng Phục Scrub Y Tế Bác Sĩ & Điều Dưỡng',
    options: 'Màu: Xanh Teal • Size: M (Chống nhăn)',
    quantity: 'Số lượng: 5 bộ',
    price: 1_250_000,
    tone: 'thumbnail-teal',
  },
  {
    name: 'Áo Polo Doanh Nghiệp Cotton Pique 100%',
    options: 'Màu: Đen Tím Than • Size: XL',
    quantity: 'Số lượng: 15 cái',
    price: 2_850_000,
    tone: 'thumbnail-plum',
  },
];

const formatCurrency = (amount: number) => `${amount.toLocaleString('vi-VN')} đ`;

function Checkout() {
  const deliveryFormRef = useRef<HTMLFormElement>(null);
  const [customerType, setCustomerType] = useState<CustomerType>('personal');
  const [provinces, setProvinces] = useState<AdministrativeProvince[]>([]);
  const [provinceCode, setProvinceCode] = useState('79');
  const [wardCode, setWardCode] = useState('');
  const [isLoadingLocations, setIsLoadingLocations] = useState(true);
  const [locationLoadError, setLocationLoadError] = useState(false);
  const [shippingMethod, setShippingMethod] = useState('standard');
  const [paymentMethod, setPaymentMethod] = useState('vietqr');
  const [coupon, setCoupon] = useState('CORP2024');
  const [couponStatus, setCouponStatus] = useState<'applied' | 'error' | 'idle'>('applied');

  useEffect(() => {
    const controller = new AbortController();

    const loadAdministrativeData = async () => {
      try {
        const response = await fetch(administrativeApiUrl, { signal: controller.signal });

        if (!response.ok) {
          throw new Error('Không thể tải danh sách địa chỉ.');
        }

        const data = (await response.json()) as AdministrativeProvince[];
        setProvinces(data);
      } catch (error) {
        if (error instanceof Error && error.name === 'AbortError') {
          return;
        }

        setLocationLoadError(true);
      } finally {
        setIsLoadingLocations(false);
      }
    };

    void loadAdministrativeData();

    return () => controller.abort();
  }, []);

  const selectedProvince = provinces.find((province) => String(province.code) === provinceCode);
  const wards = selectedProvince?.wards ?? [];
  const isBusiness = customerType === 'business';

  const subtotal = cartItems.reduce((sum, item) => sum + item.price, 0);
  const productDiscount = 786_000;
  const couponDiscount = isBusiness && couponStatus === 'applied' ? 327_500 : 0;
  const shippingCost = shippingMethod === 'express' ? 35_000 : 0;
  const vat = isBusiness ? 435_000 : 0;
  const total = subtotal - productDiscount - couponDiscount + shippingCost + vat;

  return (
    <>
      <a className="checkout-back-link" href="/cart">
        ← Quay lại giỏ hàng
      </a>
      <div className="checkout-layout">
        <div className="checkout-sections">
          <section className="checkout-section checkout-delivery" aria-labelledby="delivery-title">
            <div className="delivery-card-heading">
              <div className="delivery-title-group">
                <div className="delivery-icon">
                  <LocationIcon />
                </div>
                <div>
                  <h2 id="delivery-title">1. Thông Tin Nhận Hàng</h2>
                  <p>
                    {isBusiness
                      ? 'Thông tin doanh nghiệp và địa chỉ đăng ký theo ĐKKD'
                      : 'Nhập địa chỉ nhận hàng và thông tin liên hệ của bạn'}
                  </p>
                </div>
              </div>
              <span className="required-badge">Bắt buộc</span>
            </div>

            <div className="checkout-customer-tabs" role="tablist" aria-label="Loại khách hàng">
              <button
                id="customer-tab-personal"
                className={customerType === 'personal' ? 'is-active' : ''}
                type="button"
                role="tab"
                aria-selected={customerType === 'personal'}
                aria-controls="delivery-panel"
                onClick={() => setCustomerType('personal')}
              >
                Cá nhân
              </button>
              <button
                id="customer-tab-business"
                className={customerType === 'business' ? 'is-active' : ''}
                type="button"
                role="tab"
                aria-selected={customerType === 'business'}
                aria-controls="delivery-panel"
                onClick={() => setCustomerType('business')}
              >
                Doanh nghiệp
              </button>
            </div>

            <form
              id="delivery-panel"
              ref={deliveryFormRef}
              className="delivery-form"
              role="tabpanel"
              aria-labelledby={`customer-tab-${customerType}`}
              onSubmit={(event) => event.preventDefault()}
            >
              {isBusiness ? (
                <BusinessDetailsFields />
              ) : (
                <PersonalDeliveryFields
                  provinces={provinces}
                  wards={wards}
                  provinceCode={provinceCode}
                  wardCode={wardCode}
                  isLoadingLocations={isLoadingLocations}
                  locationLoadError={locationLoadError}
                  onProvinceChange={(value) => {
                    setProvinceCode(value);
                    setWardCode('');
                  }}
                  onWardChange={setWardCode}
                />
              )}
            </form>
          </section>

          <section className="checkout-section checkout-shipping" aria-labelledby="shipping-title">
            <div className="checkout-section-heading">
              <div className="checkout-section-title-group">
                <div className="checkout-section-icon">
                  <TruckIcon />
                </div>
                <div>
                  <h2 id="shipping-title">3. Phương Thức Vận Chuyển</h2>
                  <p>Đồng phục may sẵn đóng kiện cẩn thận theo tiêu chuẩn</p>
                </div>
              </div>
            </div>

            <div
              className="checkout-choice-list"
              role="radiogroup"
              aria-labelledby="shipping-title"
            >
              <label
                className={`checkout-choice-card shipping-choice ${shippingMethod === 'standard' ? 'is-selected' : ''}`}
              >
                <input
                  className="checkout-radio"
                  type="radio"
                  name="shippingMethod"
                  value="standard"
                  checked={shippingMethod === 'standard'}
                  onChange={() => setShippingMethod('standard')}
                />
                <span className="checkout-choice-radio" aria-hidden="true" />
                <span className="checkout-choice-copy">
                  <span className="checkout-choice-title-row">
                    <strong>Giao hàng tiêu chuẩn toàn quốc</strong>
                    <span className="choice-badge badge-green">Khuyên dùng</span>
                  </span>
                  <span className="checkout-choice-description">
                    Thời gian nhận từ 1 - 3 ngày làm việc (Viettel Post / GHN bảo hiểm kiện hàng)
                  </span>
                </span>
                <strong className="checkout-choice-price price-free">Miễn phí</strong>
              </label>

              <label
                className={`checkout-choice-card shipping-choice ${shippingMethod === 'express' ? 'is-selected' : ''}`}
              >
                <input
                  className="checkout-radio"
                  type="radio"
                  name="shippingMethod"
                  value="express"
                  checked={shippingMethod === 'express'}
                  onChange={() => setShippingMethod('express')}
                />
                <span className="checkout-choice-radio" aria-hidden="true" />
                <span className="checkout-choice-copy">
                  <span className="checkout-choice-title-row">
                    <strong>Giao hỏa tốc nội thành 2h</strong>
                    <span className="choice-badge badge-blue">Grab / Ahamove</span>
                  </span>
                  <span className="checkout-choice-description">
                    Áp dụng đơn hàng cần gấp trong TP. HCM &amp; Hà Nội (Nhận hàng sau 120 phút)
                  </span>
                </span>
                <strong className="checkout-choice-price">35.000 đ</strong>
              </label>
            </div>
          </section>

          <section className="checkout-section checkout-payment" aria-labelledby="payment-title">
            <div className="checkout-section-heading">
              <div className="checkout-section-title-group">
                <div className="checkout-section-icon">
                  <PaymentIcon />
                </div>
                <div>
                  <h2 id="payment-title">4. Phương Thức Thanh Toán</h2>
                  <p>
                    {isBusiness
                      ? 'Tích hợp cổng thanh toán doanh nghiệp chuẩn bảo mật cao'
                      : 'Chọn phương thức thanh toán phù hợp với bạn'}
                  </p>
                </div>
              </div>
            </div>

            <div className="checkout-choice-list" role="radiogroup" aria-labelledby="payment-title">
              <label
                className={`checkout-choice-card payment-choice ${paymentMethod === 'vietqr' ? 'is-selected' : ''}`}
              >
                <input
                  className="checkout-radio"
                  type="radio"
                  name="paymentMethod"
                  value="vietqr"
                  checked={paymentMethod === 'vietqr'}
                  onChange={() => setPaymentMethod('vietqr')}
                />
                <span className="checkout-choice-radio" aria-hidden="true" />
                <span className="checkout-choice-copy">
                  <span className="checkout-choice-title-row">
                    <strong>Quét mã VietQR Chuyển khoản ngân hàng tự động</strong>
                    <span className="choice-badge badge-blue">Tiện lợi nhất</span>
                  </span>
                  <span className="checkout-choice-description">
                    Xác nhận tự động trong 3 giây. Hỗ trợ tất cả ứng dụng ngân hàng &amp; ví điện
                    tử.
                  </span>
                </span>
                <span className="checkout-payment-icon checkout-qr-icon">
                  <QrIcon />
                </span>
                {paymentMethod === 'vietqr' && (
                  <span className="checkout-payment-note">
                    <span aria-hidden="true">ⓘ</span> Mã QR cá nhân hóa kèm mã đơn hàng sẽ hiển thị
                    ngay sau khi bạn bấm “Xác Nhận Đặt Hàng”.
                  </span>
                )}
              </label>

              <label
                className={`checkout-choice-card payment-choice ${paymentMethod === 'cod' ? 'is-selected' : ''}`}
              >
                <input
                  className="checkout-radio"
                  type="radio"
                  name="paymentMethod"
                  value="cod"
                  checked={paymentMethod === 'cod'}
                  onChange={() => setPaymentMethod('cod')}
                />
                <span className="checkout-choice-radio" aria-hidden="true" />
                <span className="checkout-choice-copy">
                  <span className="checkout-choice-title-row">
                    <strong>Thanh toán khi nhận hàng (COD)</strong>
                  </span>
                  <span className="checkout-choice-description">
                    Được đồng kiểm số lượng và kiểm tra bảng size trước khi thanh toán tiền mặt
                  </span>
                </span>
                <span className="checkout-payment-icon">
                  <CashIcon />
                </span>
              </label>

              <label
                className={`checkout-choice-card payment-choice ${paymentMethod === 'card' ? 'is-selected' : ''}`}
              >
                <input
                  className="checkout-radio"
                  type="radio"
                  name="paymentMethod"
                  value="card"
                  checked={paymentMethod === 'card'}
                  onChange={() => setPaymentMethod('card')}
                />
                <span className="checkout-choice-radio" aria-hidden="true" />
                <span className="checkout-choice-copy">
                  <span className="checkout-choice-title-row">
                    <strong>Thẻ ATM Nội địa / Thẻ Quốc tế (Visa, Mastercard, JCB)</strong>
                  </span>
                  <span className="checkout-choice-description">
                    Cổng thanh toán OnePay / VNPAY mã hóa an toàn bảo mật tuyệt đối
                  </span>
                </span>
                <span className="checkout-payment-icon">
                  <CardIcon />
                </span>
              </label>
            </div>
          </section>
        </div>

        <aside className="checkout-order-summary" aria-labelledby="order-summary-title">
          <div className="order-summary-heading">
            <h2 id="order-summary-title">Tóm Tắt Đơn Hàng</h2>
            <span>3 sản phẩm</span>
          </div>

          <div className="summary-product-list">
            {cartItems.map((item) => (
              <article className="summary-product" key={item.name}>
                <ProductThumbnail tone={item.tone} />
                <div className="summary-product-info">
                  <h3>{item.name}</h3>
                  <p>{item.options}</p>
                  <p>{item.quantity}</p>
                </div>
                <strong className="summary-product-price">{formatCurrency(item.price)}</strong>
              </article>
            ))}
          </div>

          {isBusiness && (
            <div className="summary-coupon">
              <div className="summary-coupon-entry">
                <input
                  aria-label="Mã ưu đãi"
                  value={coupon}
                  onChange={(event) => {
                    setCoupon(event.target.value);
                    setCouponStatus('idle');
                  }}
                />
                {couponStatus === 'applied' && (
                  <span className="coupon-check" aria-label="Đã áp dụng">
                    ✓
                  </span>
                )}
                <button
                  type="button"
                  onClick={() =>
                    setCouponStatus(
                      coupon.trim().toUpperCase() === 'CORP2024' ? 'applied' : 'error',
                    )
                  }
                >
                  Áp Dụng
                </button>
              </div>
              {isBusiness && couponStatus === 'applied' && (
                <p className="coupon-success">◇ Đã kích hoạt ưu đãi đối tác Doanh nghiệp (-5%)</p>
              )}
              {isBusiness && couponStatus === 'error' && (
                <p className="coupon-error">Mã ưu đãi không hợp lệ. Vui lòng thử lại.</p>
              )}
            </div>
          )}

          <dl className="summary-totals">
            <div>
              <dt>Tạm tính tổng sản phẩm (30 chiếc):</dt>
              <dd>{formatCurrency(subtotal)}</dd>
            </div>
            <div className="summary-discount">
              <dt>
                Chiết khấu sỉ tự động (≥20 món) <span>-12%</span>:
              </dt>
              <dd>- {formatCurrency(productDiscount)}</dd>
            </div>
            {isBusiness && (
              <div className="summary-discount">
                <dt>Voucher đối tác CORP2024:</dt>
                <dd>- {formatCurrency(couponDiscount)}</dd>
              </div>
            )}
            <div className="summary-shipping-cost">
              <dt>Phí vận chuyển giao hàng:</dt>
              <dd>{shippingCost === 0 ? 'Miễn phí (Toàn quốc)' : formatCurrency(shippingCost)}</dd>
            </div>
            {isBusiness && (
              <div>
                <dt>Thuế GTGT (VAT 8% xuất theo ĐKKD):</dt>
                <dd>{formatCurrency(vat)}</dd>
              </div>
            )}
          </dl>

          <div className="summary-total">
            <div>
              <span>Tổng thanh toán:</span>
              <strong>{formatCurrency(total)}</strong>
            </div>
            <p>
              {isBusiness
                ? shippingCost === 0
                  ? 'Đã bao gồm VAT • Miễn phí giao hàng toàn quốc'
                  : 'Đã bao gồm VAT và phí giao hỏa tốc'
                : shippingCost === 0
                  ? 'Miễn phí giao hàng toàn quốc'
                  : 'Đã bao gồm phí giao hỏa tốc'}
            </p>
          </div>

          <button
            type="button"
            className="summary-submit"
            onClick={() => deliveryFormRef.current?.reportValidity()}
          >
            Hoàn Tất Đặt Hàng (Mô Phỏng) <span aria-hidden="true">→</span>
          </button>
          <p className="summary-terms">
            {isBusiness
              ? 'Bằng việc hoàn tất, bạn đồng ý với Điều Khoản Cung Ứng B2B của VIETUNIFORM'
              : 'Bằng việc hoàn tất, bạn đồng ý với Điều Khoản Mua Hàng của VIETUNIFORM'}
          </p>

          <ul className="summary-benefits">
            <li>
              <span aria-hidden="true">◉</span> Hỗ trợ đổi size tận nơi trong vòng 30 ngày nếu không
              vừa
            </li>
            <li>
              <span aria-hidden="true">♧</span> Chất lượng và chuẩn kiểm định, đền 200% nếu sai mô
              tả
            </li>
            <li>
              <span aria-hidden="true">◉</span> Chuyên viên tư vấn mẫu vải và bảng size hỗ trợ 24/7
            </li>
          </ul>
        </aside>
      </div>
    </>
  );
}

export default Checkout;
