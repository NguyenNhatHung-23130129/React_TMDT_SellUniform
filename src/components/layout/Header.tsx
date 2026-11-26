import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router';
import { useSelector } from 'react-redux';
import type { RootState } from '../../store/store';
import { API_URL } from '../../config/api';
import { SearchAutocomplete } from '../../utils/SearchAutocomplete';
import './Header.scss';

type HeaderProps = {
    isOrderHistory?: boolean;
    onOrdersClick?: () => void;
};

type SessionUser = {
    id: string;
    fullName: string;
    email: string;
    phone: string;
};

export default function Header({ isOrderHistory = false }: HeaderProps) {
    const navigate = useNavigate();
    const location = useLocation();
    const favorites = useSelector((state: RootState) => state.data.favorites);
    const [openMenu, setOpenMenu] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    const [user, setUser] = useState<SessionUser | null>(() => {
        const saved = localStorage.getItem('user');
        return saved ? JSON.parse(saved) : null;
    });

    const getTotalQty = (list: { quantity?: number }[]) =>
        Array.isArray(list) ? list.reduce((sum, item) => sum + (Number(item.quantity) || 1), 0) : 0;

    const [cartCount, setCartCount] = useState<number>(() => {
        const saved = localStorage.getItem('cart_items');
        return getTotalQty(saved ? JSON.parse(saved) : []);
    });

    useEffect(() => {
        const updateCountFromLocal = () => {
            const saved = localStorage.getItem('cart_items');
            setCartCount(getTotalQty(saved ? JSON.parse(saved) : []));
        };

        const syncCartFromServer = async () => {
            if (!user?.id) {
                localStorage.removeItem('cart_items');
                setCartCount(0);
                return;
            }
            try {
                const res = await fetch(`${API_URL}/cart?userId=${encodeURIComponent(user.id)}`);
                const carts = await res.json();
                const serverItems = Array.isArray(carts) && carts.length > 0 && Array.isArray(carts[0].items)
                    ? carts[0].items
                    : [];
                localStorage.setItem('cart_items', JSON.stringify(serverItems));
                setCartCount(getTotalQty(serverItems));
            } catch {
                updateCountFromLocal();
            }
        };

        syncCartFromServer();
        window.addEventListener('cartUpdated', updateCountFromLocal);
        return () => window.removeEventListener('cartUpdated', updateCountFromLocal);
    }, [user]);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
                setOpenMenu(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('cart_items');
        setUser(null);
        setCartCount(0);
        setOpenMenu(false);
        navigate('/auth/login');
    };

    const getShortName = (fullName?: string, email?: string) => {
        if (fullName && fullName.trim()) {
            const parts = fullName.trim().split(/\s+/);
            return parts[parts.length - 1];
        }
        return email ? email.split('@')[0] : 'Tài khoản';
    };

    return (
        <header className="header container">
            <div className="brand">
                <Link to="/" className="brand" aria-label="Trang chủ">VIETUNIFORM</Link>

            </div>
            <div className="search">
                <SearchAutocomplete />
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
                    <span className="badge">{favorites.length}</span>
                </button>
                <button aria-label="Giỏ hàng" onClick={() => navigate('/cart')}>
                    <img src="/src/assets/icons/cart-icon.svg" alt="Giỏ hàng" />
                    <span className="badge">{cartCount}</span>
                </button>
                {user ? (
                    <div className="user-pill-wrapper" ref={menuRef}>
                        <button type="button" className="user-pill" onClick={() => setOpenMenu(!openMenu)}>
                            <span className="user-pill-name">{getShortName(user.fullName, user.email)}</span>
                            <span className="user-pill-avatar">
                  <i className="fa-regular fa-user"></i>
                </span>
                        </button>

                        {openMenu && (
                            <div className="user-dropdown">
                                <div className="user-dropdown-info">
                                    <div className="user-dropdown-fullname">{user.fullName || 'Khách hàng'}</div>
                                    <div className="user-dropdown-email">{user.email}</div>
                                </div>
                                <Link to="/profile" className="user-dropdown-item" onClick={() => setOpenMenu(false)}>
                                    <i className="fa-regular fa-id-card"></i> Thông tin người dùng
                                </Link>
                                <Link to="/orders" className="user-dropdown-item" onClick={() => setOpenMenu(false)}>
                                    <i className="fa-solid fa-clock-rotate-left"></i> Lịch sử đơn hàng
                                </Link>
                                <button type="button" className="user-dropdown-item logout" onClick={handleLogout}>
                                    <i className="fa-solid fa-right-from-bracket"></i> Đăng xuất
                                </button>
                            </div>
                        )}
                    </div>
                ) : (
                    <Link to="/auth/login" className="login">Đăng nhập</Link>
                )}
            </div>
        </header>
    );
}