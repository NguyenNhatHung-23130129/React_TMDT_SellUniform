import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router';
import './Header.scss';

type HeaderProps = {
  isOrderHistory?: boolean;
  onOrdersClick?: () => void;
};

export default function Header({ isOrderHistory = false }: HeaderProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const [keyword, setKeyword] = useState('');

  const handleSearch = () => {
    const q = keyword.trim();
    navigate(q ? `/search?q=${encodeURIComponent(q)}` : '/search');
  };

  return (
      <header className="header container">
        <div className="brand-search">
          <Link to="/" className="brand" aria-label="Trang chủ">VIETUNIFORM</Link>
          <div className="search">
            <input type="text" placeholder="Tìm sản phẩm..."
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}/>
            <img src="/src/assets/icons/search-icon.svg" alt="Search"
                style={{ cursor: 'pointer' }}
                onClick={handleSearch}/>
          </div>
        </div>

        <nav className="nav">
          <Link to="/shop" className={location.pathname === '/shop' ? 'active' : undefined}>Cửa hàng</Link>
          <Link to="/search" className={location.pathname === '/search' ? 'active' : undefined}>Sản phẩm</Link>
          <Link to="/orders" className={isOrderHistory ? 'active' : undefined}>Đơn hàng</Link>
          <Link to="/checkout" className={location.pathname === '/checkout' ? 'active' : undefined}>Thanh toán</Link>
        </nav>

        <div className="actions">
          <button aria-label="Yêu thích" onClick={() => navigate('/favorites')}>
            <img src="/src/assets/icons/favorite-icon.svg" alt="Yêu thích" />
            <span className="badge">6</span>
          </button>
          <button aria-label="Giỏ hàng" onClick={() => navigate('/cart')}>
            <img src="/src/assets/icons/cart-icon.svg" alt="Giỏ hàng" />
            <span className="badge">4</span>
          </button>
          <Link to="/auth/login" className="login">Đăng nhập</Link>
        </div>
      </header>
  );
}