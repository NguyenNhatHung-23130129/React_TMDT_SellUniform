import { createBrowserRouter, Outlet, useNavigate, useLocation } from 'react-router';
import { store, load, loadProducts } from '../store/store';
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
import { demoOrderHistory, toOrderHistoryRecord } from '../pages/orders/orderHistoryTypes';

const API_URL = 'http://localhost:3001';
export const dataLoader = async () => {
    let products = [];
    const response = await fetch(`${API_URL}/products`);
    if (response.ok) {
        products = await response.json();
        store.dispatch(loadProducts(products));
    }

    const catRes = await fetch(`${API_URL}/categories`);
    const categories = catRes.ok ? await catRes.json() : [];

    const orderRes = await fetch(`${API_URL}/orders`).catch(() => null);
    const orders = orderRes && orderRes.ok ? await orderRes.json() : demoOrderHistory;

    store.dispatch(load({ categories, products, orders }));
    return true;
};

export function Layout() {
    const location = useLocation();
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

function CheckoutPage() {
    const navigate = useNavigate();
    return (
        <Checkout
            onOrderComplete={async (order) => {
                const record = toOrderHistoryRecord(order);
                localStorage.setItem('lastOrder', JSON.stringify(record));
                await fetch(`${API_URL}/orders`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(record)
                }).catch(() => {});
                navigate('/order-success');
            }}
        />
    );
}

function OrderSuccessPage() {
    const navigate = useNavigate();
    const saved = JSON.parse(localStorage.getItem('lastOrder') || 'null') || demoOrderHistory[0];
    return <OrderSuccess order={saved} onContinueShopping={() => navigate('/')} onTrackOrder={() => navigate('/orders')} />;
}

function OrderHistoryPage() {
    const navigate = useNavigate();
    const orders = store.getState().data.orders;
    return (
        <OrderHistory
            orders={orders.length ? orders : demoOrderHistory}
            onContinueShopping={() => navigate('/')}
            onSelectOrder={(order) => {
                localStorage.setItem('selectedOrder', JSON.stringify(order));
                navigate(`/orders/${encodeURIComponent(order.orderNumber)}`);
            }}
        />
    );
}

function OrderDetailPage() {
    const navigate = useNavigate();
    const saved = JSON.parse(localStorage.getItem('selectedOrder') || 'null') || demoOrderHistory[0];
    return <OrderDetail order={saved} onBack={() => navigate('/orders')} onContinueShopping={() => navigate('/')} />;
}

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        loader: dataLoader,
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