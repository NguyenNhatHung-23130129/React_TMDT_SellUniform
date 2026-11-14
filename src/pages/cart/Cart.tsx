import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useSelector } from 'react-redux';
import type { RootState } from '../../store/store';
import heroImg from '../../assets/hero.png';
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
    const products = useSelector((state: RootState) => state.data.products);

    const [items, setItems] = useState<CartItem[]>([]);
    const [voucherCode, setVoucherCode] = useState('');
    const [voucherDiscount, setVoucherDiscount] = useState(0);

    useEffect(() => {
        const savedCart = localStorage.getItem('cart_items');
        if (savedCart) {
            setItems(JSON.parse(savedCart));
            return;
        }
        if (products && products.length > 0) {
            const initialItems: CartItem[] = products.slice(0, 4).map((p: any, idx: number) => ({
                id: String(p.id),
                name: p.name,
                image: p.image || heroImg,
                size: ['L', 'M', 'Freesize', '39 (M)'][idx] || 'M',
                color: p.colors?.[0] || 'Navy Đậm',
                sku: p.sku || `SP-${p.id}`,
                price: Number(p.price),
                oldPrice: Number(p.oldPrice) || Math.round(Number(p.price) * 1.15),
                quantity: idx === 0 ? 4 : 3,
                selected: true,
            }));
            setItems(initialItems);
        }
    }, [products]);

    const updateCart = (nextItems: CartItem[]) => {
        setItems(nextItems);
        localStorage.setItem('cart_items', JSON.stringify(nextItems));
    };

    const allSelected = items.length > 0 && items.every((item) => item.selected);

    const handleToggleAll = () => {
        const nextState = !allSelected;
        updateCart(items.map((item) => ({ ...item, selected: nextState })));
    };

    const handleToggleItem = (id: string) => {
        updateCart(items.map((item) => (item.id === id ? { ...item, selected: !item.selected } : item)));
    };

    const handleQuantity = (id: string, delta: number) => {
        updateCart(
            items.map((item) =>
                item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
            )
        );
    };

    const handleRemoveItem = (id: string) => {
        updateCart(items.filter((item) => item.id !== id));
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
                                items.map((item) => (
                                    <div key={item.id} className="cart-item">
                                        <div className="cart-item-select">
                                            <label className="checkbox-label">
                                                <input
                                                    type="checkbox"
                                                    checked={item.selected}
                                                    onChange={() => handleToggleItem(item.id)}
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
                                                    onClick={() => handleRemoveItem(item.id)}
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
                                                        onClick={() => handleQuantity(item.id, -1)}
                                                    >
                                                        -
                                                    </button>
                                                    <input type="text" className="qty-input" value={item.quantity} readOnly />
                                                    <button
                                                        type="button"
                                                        className="qty-btn"
                                                        onClick={() => handleQuantity(item.id, 1)}
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