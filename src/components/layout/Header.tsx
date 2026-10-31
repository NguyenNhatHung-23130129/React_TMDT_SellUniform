import './Header.scss';

export default function Header() {
  return (
      <header className="header container">
        <div className="brand-search">
          <a href="/" className="brand" aria-label="Trang chủ">VIETUNIFORM</a>

          <div className="search">
            <input type="text" placeholder="Tìm sản phẩm..." />
            <img src="/src/assets/icons/search-icon.svg" alt="Search" />
          </div>
        </div>

        <nav className="nav">
          <a href="/categories" className="active" aria-current="page">Sản phẩm nổi bật</a>
          <a href="/categories">Đơn hàng</a>
          <a href="/categories">Giới thiệu</a>
          <a href="/categories">Liên hệ</a>
          <a href="/categories">Khuyến mãi</a>
        </nav>

        <div className="actions">
          <button aria-label="Yêu thích">
            <img src="/src/assets/icons/favorite-icon.svg" alt="" />
            <span className="badge">3</span>
          </button>

          <button aria-label="Giỏ hàng">
            <img src="/src/assets/icons/cart-icon.svg" alt="" />
            <span className="badge">2</span>
          </button>

          <a href="/auth/login" className="login">Đăng nhập</a>
        </div>
      </header>
  );
}