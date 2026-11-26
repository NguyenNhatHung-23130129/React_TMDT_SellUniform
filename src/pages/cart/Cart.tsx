import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { API_URL } from '../../config/api';
import deliveryTruckIcon from '../../assets/icons/delivery-truck-icon.svg';
import lightningIcon from '../../assets/icons/lightning-icon.svg';
import trashCanIcon from '../../assets/icons/trash-can-icon.svg';
import './Cart.css';

interface CartItem {
    id: string;
    name: string;
    image: string;
    size: string;
    color: string;
    sku: string;
    price: number;
    oldPrice: number;
    quantity: number;
    selected: boolean;
}

export default function Cart() {
    const navigate = useNavigate();

    const [items, setItems] = useState<CartItem[]>([]);
    const [voucherCode, setVoucherCode] = useState('');
    const [voucherDiscount, setVoucherDiscount] = useState(0);

    const getCurrentUser = () => {
        const saved = localStorage.getItem('user');
        return saved ? JSON.parse(saved) : null;
    };

    const syncCartToServer = async (nextItems: CartItem[]) => {
        const user = getCurrentUser();
        if (!user?.id) return;

        try {
            const res = await fetch(`${API_URL}/cart?userId=${encodeURIComponent(user.id)}`);
            const existing = await res.json();

            if (nextItems.length === 0) {
                if (Array.isArray(existing)) {
                    for (const cart of existing) {
                        await fetch(`${API_URL}/cart/${cart.id}`, {
                            method: 'DELETE',
                        });
                    }
                }
                return;
            }

            if (Array.isArray(existing) && existing.length > 0) {
                await fetch(`${API_URL}/cart/${existing[0].id}`, {
                    method: 'PATCH',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ items: nextItems }),
                });
            } else {
                await fetch(`${API_URL}/cart`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        userId: user.id,
                        items: nextItems,
                    }),
                });
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        const loadCart = async () => {
            const user = getCurrentUser();
            if (!user?.id) {
                setItems([]);
                localStorage.removeItem('cart_items');
                window.dispatchEvent(new Event('cartUpdated'));
                return;
            }

            try {
                const res = await fetch(`${API_URL}/cart?userId=${encodeURIComponent(user.id)}`);
                const serverCarts = await res.json();
                const serverItems = Array.isArray(serverCarts) && serverCarts.length > 0 && Array.isArray(serverCarts[0].items)
                    ? serverCarts[0].items
                    : [];
                setItems(serverItems);
                localStorage.setItem('cart_items', JSON.stringify(serverItems));
                window.dispatchEvent(new Event('cartUpdated'));
            } catch {
                const savedCart = localStorage.getItem('cart_items');
                setItems(savedCart ? JSON.parse(savedCart) : []);
            }
        };

        loadCart();
    }, []);

    const updateCart = async (nextItems: CartItem[]) => {
        setItems(nextItems);
        localStorage.setItem('cart_items', JSON.stringify(nextItems));
        window.dispatchEvent(new Event('cartUpdated'));
        await syncCartToServer(nextItems);
    };

    const allSelected = items.length > 0 && items.every((item) => item.selected);

    const handleToggleAll = () => {
        const nextState = !allSelected;
        updateCart(items.map((item) => ({ ...item, selected: nextState })));
    };

    const handleToggleItem = (index: number) => {
        updateCart(items.map((item, idx) => (idx === index ? { ...item, selected: !item.selected } : item)));
    };

    const handleQuantity = (index: number, delta: number) => {
        updateCart(
            items.map((item, idx) =>
                idx === index ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
            )
        );
    };

    const handleRemoveItem = (index: number) => {
        updateCart(items.filter((_, idx) => idx !== index));
    };

    const handleClearCart = () => {
        updateCart([]);
    };

    const handleApplyVoucher = (codeToApply?: string) => {
        const code = (codeToApply ?? voucherCode).trim().toUpperCase();
        if (code === 'NEW15') {
            setVoucherCode('NEW15');
            setVoucherDiscount(15000);
        } else if (code === 'FREESHIP300K') {
            setVoucherCode('FREESHIP300K');
        } else if (code) {
            alert('Mã giảm giá không hợp lệ!');
        }
    };

    const selectedItems = items.filter((item) => item.selected);
    const totalQuantity = selectedItems.reduce((sum, item) => sum + item.quantity, 0);
    const originalSubtotal = selectedItems.reduce((sum, item) => sum + item.oldPrice * item.quantity, 0);
    const currentSubtotal = selectedItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const wholesaleDiscount = totalQuantity >= 10 ? Math.round(currentSubtotal * 0.1) : 0;
    const shippingFee = currentSubtotal >= 300000 || currentSubtotal === 0 ? 0 : 30000;
    const finalTotal = Math.max(0, currentSubtotal - wholesaleDiscount - voucherDiscount + shippingFee);

    const formatPrice = (val: number) => val.toLocaleString('vi-VN') + 'đ';

    return (
        <main className="cart-page">
            <div className="cart-container">
                <div className="cart-layout">
                    <div className="cart-main">
                        <div className="cart-header-bar">
                            <label className="checkbox-label">
                                <input type="checkbox" checked={allSelected} onChange={handleToggleAll} />
                                <span className="checkbox-custom"></span>
                                <strong>Chọn tất cả ({items.length} mã đồng phục)</strong>
                            </label>
                            <button type="button" className="delete-all-btn" onClick={handleClearCart}>
                                <img src={trashCanIcon} alt="Trash" className="trash-icon-img trash-red" />
                                Xóa toàn bộ giỏ
                            </button>
                        </div>

                        <div className="cart-items-list">
                            {items.length === 0 ? (
                                <div className="cart-item" style={{ justifyContent: 'center', padding: '40px' }}>
                                    <p>Giỏ hàng của bạn đang trống.</p>
                                </div>
                            ) : (
                                items.map((item, index) => (
                                    <div key={`${item.id}-${item.size}-${item.color}-${index}`} className="cart-item">
                                        <div className="cart-item-select">
                                            <label className="checkbox-label">
                                                <input
                                                    type="checkbox"
                                                    checked={item.selected}
                                                    onChange={() => handleToggleItem(index)}
                                                />
                                                <span className="checkbox-custom"></span>
                                            </label>
                                        </div>
                                        <div
                                            className="cart-item-thumb"
                                            style={{ cursor: 'pointer' }}
                                            onClick={() => navigate(`/product/${item.id}`)}
                                        >
                                            <img src={item.image} alt={item.name} />
                                        </div>
                                        <div className="cart-item-details">
                                            <div className="stock-notice">
                                                <img src={lightningIcon} alt="Lightning" className="lightning-icon-img" />
                                                Sẵn kho giao hỏa tốc 2H
                                            </div>
                                            <div className="item-title-row">
                                                <h3
                                                    className="item-title"
                                                    style={{ cursor: 'pointer' }}
                                                    onClick={() => navigate(`/product/${item.id}`)}
                                                >
                                                    {item.name}
                                                </h3>
                                                <button
                                                    type="button"
                                                    className="remove-item-btn"
                                                    onClick={() => handleRemoveItem(index)}
                                                >
                                                    <img src={trashCanIcon} alt="Remove" className="trash-icon-img" />
                                                </button>
                                            </div>
                                            <div className="item-variants">
                                                <span className="variant-tag">Phân loại: <strong>Size {item.size}</strong></span>
                                                <span className="variant-tag">Màu: <strong>{item.color}</strong></span>
                                                <span className="sku-tag">SKU: {item.sku}</span>
                                            </div>
                                            <div className="item-action-row">
                                                <div className="price-block">
                                                    <span className="item-price">{formatPrice(item.price)}</span>
                                                    {item.oldPrice > item.price && (
                                                        <span className="item-old-price">{formatPrice(item.oldPrice)}</span>
                                                    )}
                                                    <span className="discount-tag">-10% Sỉ</span>
                                                </div>
                                                <div className="qty-picker">
                                                    <button
                                                        type="button"
                                                        className="qty-btn"
                                                        onClick={() => handleQuantity(index, -1)}
                                                    >
                                                        -
                                                    </button>
                                                    <input type="text" className="qty-input" value={item.quantity} readOnly />
                                                    <button
                                                        type="button"
                                                        className="qty-btn"
                                                        onClick={() => handleQuantity(index, 1)}
                                                    >
                                                        +
                                                    </button>
                                                </div>
                                                <div className="subtotal-block">
                                                    <span className="subtotal-label">Thành tiền:</span>
                                                    <span className="subtotal-price">{formatPrice(item.price * item.quantity)}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>

                        <div className="continue-shopping">
                            <a
                                href="/"
                                onClick={(e) => {
                                    e.preventDefault();
                                    navigate('/');
                                }}
                            >
                                ← Tiếp tục xem sản phẩm
                            </a>
                        </div>
                    </div>

                    <div className="cart-sidebar">
                        <div className="summary-card">
                            <h2 className="summary-title">Tóm Tắt Đơn Hàng</h2>

                            <div className="summary-row">
                                <span>Tạm tính tiền hàng gốc:</span>
                                <span className="text-bold">{formatPrice(originalSubtotal)}</span>
                            </div>

                            <div className="summary-row text-red">
                                <span>Chiết khấu sỉ (≥10 cái -10%):</span>
                                <span className="text-bold">-{formatPrice(wholesaleDiscount)}</span>
                            </div>

                            {voucherDiscount > 0 && (
                                <div className="summary-row text-red">
                                    <span>Voucher ưu đãi ({voucherCode}):</span>
                                    <span className="text-bold">-{formatPrice(voucherDiscount)}</span>
                                </div>
                            )}

                            <div className="summary-row text-green">
                                <span>Ước tính phí vận chuyển:</span>
                                <span className="text-bold free-shipping-badge">
                                    <img src={deliveryTruckIcon} alt="Delivery Truck" className="truck-icon-img" />
                                    {shippingFee === 0 ? 'Miễn phí' : formatPrice(shippingFee)}
                                </span>
                            </div>

                            <p className="shipping-note">
                                * Đơn hàng từ 300.000đ được miễn phí vận chuyển hỏa tốc toàn quốc.
                            </p>

                            <div className="voucher-section">
                                <label className="voucher-label">Mã giảm giá / Voucher doanh nghiệp:</label>
                                <div className="voucher-input-group">
                                    <input
                                        type="text"
                                        placeholder="Nhập Mã Ưu Đãi..."
                                        value={voucherCode}
                                        onChange={(e) => setVoucherCode(e.target.value)}
                                    />
                                    <button type="button" className="apply-btn" onClick={() => handleApplyVoucher()}>
                                        Áp dụng
                                    </button>
                                </div>
                                <div className="available-vouchers">
                                    <span className="vouchers-title">MÃ KHẢ DỤNG:</span>
                                    <div className={`voucher-item ${voucherDiscount > 0 ? 'applied' : ''}`}>
                                        <span className="voucher-code">NEW15</span>
                                        <span className="voucher-desc">Giảm thêm 15.000đ đơn mới</span>
                                        {voucherDiscount > 0 ? (
                                            <span className="applied-text">Đã áp dụng</span>
                                        ) : (
                                            <button
                                                type="button"
                                                className="use-voucher-btn"
                                                onClick={() => handleApplyVoucher('NEW15')}
                                            >
                                                Dùng mã
                                            </button>
                                        )}
                                    </div>
                                    <div className="voucher-item applied">
                                        <span className="voucher-code">FREESHIP300K</span>
                                        <span className="voucher-desc">Freeship tối đa 50k</span>
                                        <span className="applied-text">Đã áp dụng</span>
                                    </div>
                                </div>
                            </div>

                            <div className="total-section">
                                <div className="total-row">
                                    <span className="total-label">Tổng tiền thanh toán:</span>
                                    <span className="total-price">{formatPrice(finalTotal)}</span>
                                </div>
                                <p className="tax-note">(Đã bao gồm thuế GTGT & chiết khấu sỉ)</p>
                            </div>

                            <button
                                type="button"
                                className="checkout-btn"
                                onClick={() => {
                                    if (selectedItems.length === 0) {
                                        alert('Vui lòng chọn ít nhất 1 sản phẩm để thanh toán!');
                                        return;
                                    }
                                    navigate('/checkout', {
                                        state: {
                                            items: selectedItems,
                                            subtotal: currentSubtotal,
                                            wholesaleDiscount,
                                            voucherDiscount,
                                            shippingFee,
                                            total: finalTotal,
                                        },
                                    });
                                }}
                            >
                                Tiến Hành Đặt Hàng & Thanh Toán →
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}