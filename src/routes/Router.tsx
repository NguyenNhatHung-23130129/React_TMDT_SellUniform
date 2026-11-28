import { createBrowserRouter, Navigate, Outlet, useNavigate, useLocation, useParams, Link } from 'react-router';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import Home from '../pages/home/Home';
import { SearchResults } from '../pages/products/SearchResults';
import ProductDetails from '../pages/products/ProductDetails';
import FavoriteProducts from '../pages/products/FavoriteProducts';
import Cart from '../pages/cart/Cart';
import Checkout from '../pages/checkout/Checkout';
import OrderSuccess from '../pages/checkout/OrderSuccess';
import OrderHistory from '../pages/orders/OrderHistory';
import OrderDetail from '../pages/orders/OrderDetail';
import Auth from '../pages/auth/Auth';
import {
    applyOrderStatusOverride,
    readLocalOrders,
    saveLocalOrder,
    toOrderHistoryRecord,
} from '../pages/orders/orderHistoryTypes';
import {useEffect} from "react";
import type { OrderConfirmation } from '../pages/checkout/orderTypes';


export function Layout() {
    const location = useLocation();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location.pathname, location.search]);
    return (
        <>
            <Header isOrderHistory={location.pathname.startsWith('/orders')} />
            <Outlet />
            <Footer />
        </>
    );
}

function HomePage() {
    const navigate = useNavigate();
    return <Home onSelectCategory={(catId) => navigate(`/search?cat=${catId}`)} />;
}

function getCurrentUserId(): string | null {
    try {
        const user = JSON.parse(localStorage.getItem('user') || 'null');
        return user?.id != null && String(user.id) ? String(user.id) : null;
    } catch {
        return null;
    }
}

function CheckoutPage() {
    const navigate = useNavigate();
    return (
        <Checkout
            onOrderComplete={(order) => {
                const userId = getCurrentUserId();
                if (!userId) {
                    alert('Vui lòng đăng nhập trước khi đặt hàng.');
                    navigate('/auth/login');
                    return;
                }
                try {
                    const record = toOrderHistoryRecord(order);
                    saveLocalOrder(userId, record);
                    navigate('/order-success', { state: { orderNumber: record.orderNumber } });
                } catch {
                    alert('Không thể lưu đơn hàng trong trình duyệt. Vui lòng kiểm tra bộ nhớ trình duyệt và thử lại.');
                }
            }}
        />
    );
}

function OrderSuccessPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const userId = getCurrentUserId();
    if (!userId) return <Navigate to="/auth/login" replace />;
    let orders;
    try {
        orders = readLocalOrders(userId);
    } catch {
        return <p>Không thể đọc lịch sử đơn hàng trong trình duyệt.</p>;
    }
    const orderNumber = (location.state as { orderNumber?: string } | null)?.orderNumber;
    const saved = orderNumber ? orders.find((order) => order.orderNumber === orderNumber) : orders[0];
    if (!saved) return <p>Không tìm thấy đơn hàng. <Link to="/orders">Xem lịch sử đơn hàng</Link></p>;
    return <OrderSuccess order={saved as OrderConfirmation} onContinueShopping={() => navigate('/')} onTrackOrder={() => navigate(`/orders/${encodeURIComponent(saved.orderNumber)}`)} />;
}

function OrderHistoryPage() {
    const navigate = useNavigate();
    const userId = getCurrentUserId();
    if (!userId) return <Navigate to="/auth/login" replace />;
    let orders;
    try {
        orders = readLocalOrders(userId).map(applyOrderStatusOverride);
    } catch {
        return <p>Không thể đọc lịch sử đơn hàng trong trình duyệt.</p>;
    }
    return (
        <OrderHistory
            orders={orders}
            onContinueShopping={() => navigate('/')}
            onSelectOrder={(order) => navigate(`/orders/${encodeURIComponent(order.orderNumber)}`)}
        />
    );
}

function OrderDetailPage() {
    const navigate = useNavigate();
    const { id } = useParams();
    const userId = getCurrentUserId();
    if (!userId) return <Navigate to="/auth/login" replace />;
    let saved;
    try {
        saved = readLocalOrders(userId).find((order) => order.orderNumber === id);
    } catch {
        return <p>Không thể đọc lịch sử đơn hàng trong trình duyệt.</p>;
    }
    if (!saved) return <p>Không tìm thấy đơn hàng. <Link to="/orders">Quay lại lịch sử đơn hàng</Link></p>;
    return <OrderDetail key={saved.orderNumber} order={applyOrderStatusOverride(saved)} onBack={() => navigate('/orders')} onContinueShopping={() => navigate('/')} />;
}

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            { index: true, element: <HomePage /> },
            // { path: 'shop', element:  },
            { path: 'search', element: <SearchResults /> },
            { path: 'product/:id', element: <ProductDetails /> },
            { path: 'favorites', element: <FavoriteProducts /> },
            { path: 'cart', element: <Cart /> },
            { path: 'checkout', element: <CheckoutPage /> },
            { path: 'order-success', element: <OrderSuccessPage /> },
            { path: 'orders', element: <OrderHistoryPage /> },
            { path: 'orders/:id', element: <OrderDetailPage /> }
        ]
    },
    {
        path: '/auth/login',
        element: <Auth />
    }
]);
