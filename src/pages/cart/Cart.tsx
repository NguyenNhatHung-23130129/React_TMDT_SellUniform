import Header from '../../components/layout/Header.tsx';
import Footer from '../../components/layout/Footer.tsx';
import heroImg from '../../assets/hero.png';
import deliveryTruckIcon from '../../assets/icons/delivery-truck-icon.svg';
import lightningIcon from '../../assets/icons/lightning-icon.svg';
import trashCanIcon from '../../assets/icons/trash-can-icon.svg';
import './Cart.css';

export default function Cart() {
    return (
        <main className="cart-page">
            <Header />
            <div className="cart-container">
                <div className="cart-layout">
                    <div className="cart-main">
                        <div className="cart-header-bar">
                            <label className="checkbox-label">
                                <input type="checkbox" defaultChecked />
                                <span className="checkbox-custom"></span>
                                <strong>Chọn tất cả (4 mã đồng phục)</strong>
                            </label>
                            <button className="delete-all-btn">
                                <img src={trashCanIcon} alt="Trash" className="trash-icon-img trash-red" />
                                Xóa toàn bộ giỏ
                            </button>
                        </div>

                        <div className="cart-items-list">
                            <div className="cart-item">
                                <div className="cart-item-select">
                                    <label className="checkbox-label">
                                        <input type="checkbox" defaultChecked />
                                        <span className="checkbox-custom"></span>
                                    </label>
                                </div>
                                <div className="cart-item-thumb">
                                    <img src={heroImg} alt="Áo Polo CVC Coolmax" />
                                </div>
                                <div className="cart-item-details">
                                    <div className="item-title-row">
                                        <h3 className="item-title">Áo Polo CVC Coolmax Đồng Phục Cao Cấp</h3>
                                        <button className="remove-item-btn">
                                            <img src={trashCanIcon} alt="Remove" className="trash-icon-img" />
                                        </button>
                                    </div>
                                    <div className="item-variants">
                                        <span className="variant-tag">Phân loại: <strong>Size L</strong></span>
                                        <span className="variant-tag">Màu: <strong>Navy Đậm</strong></span>
                                        <span className="sku-tag">SKU: POL-CVC-04</span>
                                    </div>
                                    <div className="item-action-row">
                                        <div className="price-block">
                                            <span className="item-price">189.000đ</span>
                                            <span className="item-old-price">210.000đ</span>
                                            <span className="discount-tag">-10% Sỉ</span>
                                        </div>
                                        <div className="qty-picker">
                                            <button className="qty-btn">-</button>
                                            <input type="text" className="qty-input" defaultValue="4" readOnly />
                                            <button className="qty-btn">+</button>
                                        </div>
                                        <div className="subtotal-block">
                                            <span className="subtotal-label">Thành tiền:</span>
                                            <span className="subtotal-price">756.000đ</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="cart-item">
                                <div className="cart-item-select">
                                    <label className="checkbox-label">
                                        <input type="checkbox" defaultChecked />
                                        <span className="checkbox-custom"></span>
                                    </label>
                                </div>
                                <div className="cart-item-thumb">
                                    <img src={heroImg} alt="Bộ Scrub Y Tế" />
                                </div>
                                <div className="cart-item-details">
                                    <div className="stock-notice">
                                        <img src={lightningIcon} alt="Lightning" className="lightning-icon-img" />
                                        Sẵn kho giao hỏa tốc 2H
                                    </div>
                                    <div className="item-title-row">
                                        <h3 className="item-title">Bộ Scrub Y Tế Tech-Flex Kháng Khuẩn Bệnh Viện</h3>
                                        <button className="remove-item-btn">
                                            <img src={trashCanIcon} alt="Remove" className="trash-icon-img" />
                                        </button>
                                    </div>
                                    <div className="item-variants">
                                        <span className="variant-tag">Phân loại: <strong>Size M</strong></span>
                                        <span className="variant-tag">Màu: <strong>Xanh Cổ Vịt</strong></span>
                                        <span className="sku-tag">SKU: SCR-TF-08</span>
                                    </div>
                                    <div className="item-action-row">
                                        <div className="price-block">
                                            <span className="item-price">297.000đ</span>
                                            <span className="item-old-price">330.000đ</span>
                                            <span className="discount-tag">-10% Sỉ</span>
                                        </div>
                                        <div className="qty-picker">
                                            <button className="qty-btn">-</button>
                                            <input type="text" className="qty-input" defaultValue="3" readOnly />
                                            <button className="qty-btn">+</button>
                                        </div>
                                        <div className="subtotal-block">
                                            <span className="subtotal-label">Thành tiền:</span>
                                            <span className="subtotal-price">891.000đ</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="cart-item">
                                <div className="cart-item-select">
                                    <label className="checkbox-label">
                                        <input type="checkbox" defaultChecked />
                                        <span className="checkbox-custom"></span>
                                    </label>
                                </div>
                                <div className="cart-item-thumb">
                                    <img src={heroImg} alt="Tạp Dề Canvas" />
                                </div>
                                <div className="cart-item-details">
                                    <div className="stock-notice">
                                        <img src={lightningIcon} alt="Lightning" className="lightning-icon-img" />
                                        Sẵn kho giao hỏa tốc 2H
                                    </div>
                                    <div className="item-title-row">
                                        <h3 className="item-title">Tạp Dề Canvas Vintage Phối Dây Da F&B Quán Cafe</h3>
                                        <button className="remove-item-btn">
                                            <img src={trashCanIcon} alt="Remove" className="trash-icon-img" />
                                        </button>
                                    </div>
                                    <div className="item-variants">
                                        <span className="variant-tag">Phân loại: <strong>Freesize (Dây Tăng Chỉnh)</strong></span>
                                        <span className="variant-tag">Màu: <strong>Nâu Mộc Cổ Điển</strong></span>
                                        <span className="sku-tag">SKU: APR-CV-12</span>
                                    </div>
                                    <div className="item-action-row">
                                        <div className="price-block">
                                            <span className="item-price">135.000đ</span>
                                            <span className="item-old-price">150.000đ</span>
                                            <span className="discount-tag">-10% Sỉ</span>
                                        </div>
                                        <div className="qty-picker">
                                            <button className="qty-btn">-</button>
                                            <input type="text" className="qty-input" defaultValue="3" readOnly />
                                            <button className="qty-btn">+</button>
                                        </div>
                                        <div className="subtotal-block">
                                            <span className="subtotal-label">Thành tiền:</span>
                                            <span className="subtotal-price">405.000đ</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="cart-item">
                                <div className="cart-item-select">
                                    <label className="checkbox-label">
                                        <input type="checkbox" defaultChecked />
                                        <span className="checkbox-custom"></span>
                                    </label>
                                </div>
                                <div className="cart-item-thumb">
                                    <img src={heroImg} alt="Áo Sơ Mi Sợi Tre" />
                                </div>
                                <div className="cart-item-details">
                                    <div className="stock-notice">
                                        <img src={lightningIcon} alt="Lightning" className="lightning-icon-img" />
                                        Sẵn kho giao hỏa tốc 2H
                                    </div>
                                    <div className="item-title-row">
                                        <h3 className="item-title">Áo Sơ Mi Sợi Tre Bamboo Slimfit Chống Nhăn Công Sở</h3>
                                        <button className="remove-item-btn">
                                            <img src={trashCanIcon} alt="Remove" className="trash-icon-img" />
                                        </button>
                                    </div>
                                    <div className="item-variants">
                                        <span className="variant-tag">Phân loại: <strong>Size 39 (M)</strong></span>
                                        <span className="variant-tag">Màu: <strong>Trắng Tinh Khôi</strong></span>
                                        <span className="sku-tag">SKU: SMT-BB-01</span>
                                    </div>
                                    <div className="item-action-row">
                                        <div className="price-block">
                                            <span className="item-price">261.000đ</span>
                                            <span className="item-old-price">290.000đ</span>
                                            <span className="discount-tag">-10% Sỉ</span>
                                        </div>
                                        <div className="qty-picker">
                                            <button className="qty-btn">-</button>
                                            <input type="text" className="qty-input" defaultValue="2" readOnly />
                                            <button className="qty-btn">+</button>
                                        </div>
                                        <div className="subtotal-block">
                                            <span className="subtotal-label">Thành tiền:</span>
                                            <span className="subtotal-price">522.000đ</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="continue-shopping">
                            <a href="#">← Tiếp tục xem sản phẩm</a>
                        </div>
                    </div>

                    <div className="cart-sidebar">
                        <div className="summary-card">
                            <h2 className="summary-title">Tóm Tắt Đơn Hàng</h2>

                            <div className="summary-row">
                                <span>Tạm tính tiền hàng gốc:</span>
                                <span className="text-bold">2.870.000đ</span>
                            </div>

                            <div className="summary-row text-red">
                                <span>Chiết khấu sỉ (≥10 cái -10%):</span>
                                <span className="text-bold">-296.000đ</span>
                            </div>

                            <div className="summary-row text-green">
                                <span>Ước tính phí vận chuyển:</span>
                                <span className="text-bold free-shipping-badge">
                                    <img src={deliveryTruckIcon} alt="Delivery Truck" className="truck-icon-img" />
                                    Miễn phí
                                </span>
                            </div>

                            <p className="shipping-note">
                                * Đơn hàng từ 300.000đ được miễn phí vận chuyển hỏa tốc toàn quốc.
                            </p>

                            <div className="voucher-section">
                                <label className="voucher-label">Mã giảm giá / Voucher doanh nghiệp:</label>
                                <div className="voucher-input-group">
                                    <input type="text" placeholder="Nhập Mã Ưu Đãi..." />
                                    <button className="apply-btn">Áp dụng</button>
                                </div>
                                <div className="available-vouchers">
                                    <span className="vouchers-title">MÃ KHẢ DỤNG:</span>
                                    <div className="voucher-item">
                                        <span className="voucher-code">NEW15</span>
                                        <span className="voucher-desc">Giảm thêm 15.000đ đơn mới</span>
                                        <button className="use-voucher-btn">Dùng mã</button>
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
                                    <span className="total-price">2.574.000đ</span>
                                </div>
                                <p className="tax-note">(Đã bao gồm thuế GTGT & chiết khấu sỉ)</p>
                            </div>

                            <button className="checkout-btn">
                                Tiến Hành Đặt Hàng & Thanh Toán →
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </main>
    );
}