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

function Checkout() {
  const [city, setCity] = useState('TP. Hồ Chí Minh');
  const [district, setDistrict] = useState('Quận 1');

  const districts = city === 'TP. Hồ Chí Minh'
    ? ['Quận 1', 'Quận 3', 'Quận 7', 'Bình Thạnh', 'Thành phố Thủ Đức']
    : ['Ba Đình', 'Cầu Giấy', 'Đống Đa', 'Hai Bà Trưng', 'Hoàn Kiếm'];

  const handleCityChange = (value: string) => {
    setCity(value);
    setDistrict(value === 'TP. Hồ Chí Minh' ? 'Quận 1' : 'Ba Đình');
  };

  return (
    <section className="checkout-delivery" aria-labelledby="delivery-title">
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
  );
}

export default Checkout;
