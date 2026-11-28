import { createBrowserRouter, Navigate, Outlet, useNavigate, useLocation, useParams, Link } from 'react-router';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import Home from '../pages/home/Home';
import { SearchResults } from '../pages/products/SearchResults';
import { ShopDetail } from '../pages/home/ShopDetail';
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
    toOrderHistoryRecord,
} from '../pages/orders/orderHistoryTypes';
import { useEffect, useRef, useState } from 'react';
import { API_URL } from '../config/api';
import { createOrderApi, type ServerOrder } from '../pages/orders/orderApi';
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

const orderApi = createOrderApi(API_URL);
const pendingLoads = new Map<string, Promise<ServerOrder[]>>();

function loadOrders(userId: string): Promise<ServerOrder[]> {
    const pending = pendingLoads.get(userId);
    if (pending) return pending;
    const loading = (async () => {
        const orders = await orderApi.list(userId);
        let oldOrders = [];
        try {
            oldOrders = readLocalOrders(userId);
        } catch {
            return orders;
        }
        for (const oldOrder of oldOrders) {
            if (orders.some((order) => order.orderNumber === oldOrder.orderNumber)) continue;
            const migrated = await orderApi.create(userId, applyOrderStatusOverride(oldOrder));
            orders.push(migrated);
        }
        return orders.sort((a, b) => b.createdAt - a.createdAt);
    })();
    pendingLoads.set(userId, loading);
    void loading.finally(() => pendingLoads.delete(userId)).catch(() => {});
    return loading;
}

function useOrders(userId: string | null) {
    const [orders, setOrders] = useState<ServerOrder[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    useEffect(() => {
        if (!userId) return;
        let active = true;
        setLoading(true);
        setError(false);
        loadOrders(userId).then((result) => {
            if (active) setOrders(result);
        }).catch(() => {
            if (active) setError(true);
        }).finally(() => {
            if (active) setLoading(false);
        });
        return () => { active = false; };
    }, [userId]);
    return { orders, loading, error };
}

function CheckoutPage() {
    const navigate = useNavigate();
    const submitting = useRef(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    return (
        <Checkout
            isSubmitting={isSubmitting}
            onOrderComplete={async (order) => {
                const userId = getCurrentUserId();
                if (!userId) {
                    alert('Vui lòng đăng nhập trước khi đặt hàng.');
                    navigate('/auth/login');
                    return;
                }
                if (submitting.current) return;
                submitting.current = true;
                setIsSubmitting(true);
                try {
                    const saved = await orderApi.create(userId, toOrderHistoryRecord(order));
                    navigate('/order-success', { state: { orderNumber: saved.orderNumber } });
                } catch {
                    alert('Không thể lưu đơn hàng. Vui lòng kiểm tra json-server và thử lại.');
                } finally {
                    submitting.current = false;
                    setIsSubmitting(false);
                }
            }}
        />
    );
}

function OrderSuccessPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const userId = getCurrentUserId();
    const { orders, loading, error } = useOrders(userId);
    if (!userId) return <Navigate to="/auth/login" replace />;
    if (loading) return <p>Đang tải đơn hàng...</p>;
    if (error) return <p>Không thể tải đơn hàng. Vui lòng kiểm tra json-server.</p>;
    const orderNumber = (location.state as { orderNumber?: string } | null)?.orderNumber;
    const saved = orderNumber ? orders.find((order) => order.orderNumber === orderNumber) : orders[0];
    if (!saved) return <p>Không tìm thấy đơn hàng. <Link to="/orders">Xem lịch sử đơn hàng</Link></p>;
    return <OrderSuccess order={saved as OrderConfirmation} onContinueShopping={() => navigate('/')} onTrackOrder={() => navigate(`/orders/${encodeURIComponent(saved.orderNumber)}`)} />;
}

function OrderHistoryPage() {
    const navigate = useNavigate();
    const userId = getCurrentUserId();
    const { orders, loading, error } = useOrders(userId);
    if (!userId) return <Navigate to="/auth/login" replace />;
    if (loading) return <p>Đang tải lịch sử đơn hàng...</p>;
    if (error) return <p>Không thể tải lịch sử đơn hàng. Vui lòng kiểm tra json-server.</p>;
    return <OrderHistory orders={orders} onContinueShopping={() => navigate('/')} onSelectOrder={(order) => navigate(`/orders/${encodeURIComponent(order.orderNumber)}`)} />;
}

function OrderDetailPage() {
    const navigate = useNavigate();
    const { id } = useParams();
    const userId = getCurrentUserId();
    const { orders, loading, error } = useOrders(userId);
    if (!userId) return <Navigate to="/auth/login" replace />;
    if (loading) return <p>Đang tải đơn hàng...</p>;
    if (error) return <p>Không thể tải đơn hàng. Vui lòng kiểm tra json-server.</p>;
    const saved = orders.find((order) => order.orderNumber === id);
    if (!saved) return <p>Không tìm thấy đơn hàng. <Link to="/orders">Quay lại lịch sử đơn hàng</Link></p>;
    return <OrderDetail key={saved.orderNumber} order={saved} onCancelOrder={(reason) => orderApi.cancel(saved, reason)} onBack={() => navigate('/orders')} onContinueShopping={() => navigate('/')} />;
}

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            { index: true, element: <HomePage /> },
            { path: 'shop', element: <ShopDetail /> },
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
