import './Footer.scss';

export default function Footer() {
  return (
    <footer className="footer container">
      <div className="grid">
        <div className="brand">
          <h2>VIETUNIFORM</h2>
          <p>
            Hệ sinh thái kho tổng đồng phục may sẵn phục vụ doanh nghiệp, bệnh viện, nhà hàng và
            trường học trên toàn quốc. Đổi size linh hoạt, giao hàng thần tốc.
          </p>
        </div>

        <div className="links">
          <h3>Chính Sách & Hỗ Trợ</h3>
          <ul>
            <li>
              <a href="#">Bảng Tra Size Chuẩn</a>
            </li>
            <li>
              <a href="#">Chính Sách Đổi Trả 7 Ngày</a>
            </li>
            <li>
              <a href="#">Chiết Khấu Đơn Hàng Sỉ</a>
            </li>
          </ul>
        </div>

        <div className="links">
          <h3>Dịch Vụ Khách Hàng</h3>
          <ul>
            <li>
              <a href="#">Hướng Dẫn Mua Hàng</a>
            </li>
            <li>
              <a href="#">Chứng Nhận Vải Tiêu Chuẩn</a>
            </li>
            <li>
              <a href="#">Liên Hệ & Kho Hàng</a>
            </li>
          </ul>
        </div>

        <div className="contact">
          <span>Email:</span>
          <a href="mailto:23130129@st.hcmuaf.edu.vn">23130129@st.hcmuaf.edu.vn</a>
        </div>
      </div>

      <div className="bottom">
        <p>2026 VIETUNIFORM - Đồng Phục Hàng Đầu Việt Nam.</p>
        <div className="payment">
          <i className="fa-solid fa-shield-virus"></i>
          <span>Thanh toán an toàn</span>
        </div>
      </div>
    </footer>
  );
}
