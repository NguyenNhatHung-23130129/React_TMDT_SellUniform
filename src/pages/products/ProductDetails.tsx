import Header from '../../components/layout/Header.tsx';
import Footer from '../../components/layout/Footer.tsx';
import heroImg from '../../assets/hero.png';
import shoppingCartIcon from '../../assets/icons/shopping-cart-icon.svg';
import searchIcon from '../../assets/icons/search-icon.svg';
import starFillIcon from '../../assets/icons/star-fill-icon.svg';
import tagIcon from '../../assets/icons/tag-icon.svg';
import rulerIcon from '../../assets/icons/ruler-icon.svg';
import lightningIcon from '../../assets/icons/lightning-icon.svg';
import './ProductDetails.css';

export default function ProductDetails() {
    return (
        <main className="home">
            <Header />
            <div className="product-details-container">
                <div className="product-main-section">
                    <div className="product-gallery">
                        <div className="main-image-wrapper">
                            <img src={heroImg} alt="Áo Polo CVC Coolmax" className="main-image" />
                            <button className="zoom-btn">
                                <img src={searchIcon} alt="Zoom" className="zoom-icon" />
                            </button>
                        </div>
                        <div className="thumbnail-list">
                            <div className="thumbnail-item active">
                                <img src={heroImg} alt="Thumb 1" />
                            </div>
                            <div className="thumbnail-item">
                                <img src={heroImg} alt="Thumb 2" />
                            </div>
                            <div className="thumbnail-item">
                                <img src={heroImg} alt="Thumb 3" />
                            </div>
                            <div className="thumbnail-item">
                                <img src={heroImg} alt="Thumb 4" />
                            </div>
                        </div>
                        <div className="policy-box">
                            <p className="policy-text">
                                <strong>Kho Hàng Đồng Phục May Sẵn:</strong> Toàn bộ sản phẩm đều có sẵn hàng tại kho Hà Nội & TP.HCM, giao hàng ngay. <span className="highlight-red">Tùy chọn in/thêu logo lấy gấp trong ngày</span> áp dụng cho các đơn hàng đặt trực tiếp tại xưởng.
                            </p>
                        </div>
                    </div>

                    <div className="product-info-summary">
                        <div className="info-header">
                            <span className="sku-text">Mã SP: POLO-CVC-01</span>
                            <span className="status-badge">Sẵn hàng</span>
                        </div>
                        <h1 className="product-title-detail">Áo Polo CVC Coolmax Kháng Khuẩn Cao Cấp (Form Chuẩn Châu Á)</h1>
                        <div className="rating-row">
                            <div className="stars">
                                <img src={starFillIcon} alt="Star" className="star-icon-img" /> 4.9
                            </div>
                            <span className="divider">•</span>
                            <span className="review-count">148 Đánh giá được duyệt</span>
                            <span className="divider">•</span>
                            <span className="sold-count">Đã bán 1.890 cái</span>
                        </div>

                        <div className="price-box">
                            <div className="price-detail-row">
                                <span className="current-price">185.000đ</span>
                                <span className="original-price">230.000đ</span>
                                <span className="discount-badge">-20%</span>
                            </div>
                            <p className="price-note">Giá chưa bao gồm VAT và chi phí in/thêu logo theo yêu cầu (nếu có)</p>
                        </div>

                        <div className="discount-tier-box">
                            <div className="tier-header">
                                <img src={tagIcon} alt="Tag" className="tier-icon-img" />
                                <strong>BẢNG CHIẾT KHẤU TỰ ĐỘNG THEO SỐ LƯỢNG</strong>
                            </div>
                            <div className="tier-grid">
                                <div className="tier-item">
                                    <span className="tier-qty">Từ 20 - 49 cái</span>
                                    <span className="tier-discount">Giảm 5%</span>
                                    <span className="tier-price">175.750đ / cái</span>
                                </div>
                                <div className="tier-item active">
                                    <span className="tier-qty">Từ 50 - 99 cái</span>
                                    <span className="tier-discount">Giảm 10%</span>
                                    <span className="tier-price">166.500đ / cái</span>
                                </div>
                                <div className="tier-item">
                                    <span className="tier-qty">Từ 100 cái trở lên</span>
                                    <span className="tier-discount">Giảm 15%</span>
                                    <span className="tier-price">157.250đ / cái</span>
                                </div>
                            </div>
                            <p className="tier-footer">Hệ thống sẽ tự động tính giảm giá ngay khi bạn chọn số lượng phù hợp</p>
                        </div>

                        <div className="option-section">
                            <div className="option-label-row">
                                <span><strong>Màu Sắc:</strong> Xanh Navy Doanh Nhân</span>
                                <span className="stock-info">● Còn 189 sản phẩm</span>
                            </div>
                            <div className="color-options">
                                <div className="color-circle active navy"></div>
                                <div className="color-circle white"></div>
                                <div className="color-circle black"></div>
                                <div className="color-circle gray"></div>
                                <div className="color-circle green"></div>
                            </div>
                        </div>

                        <div className="option-section">
                            <div className="option-label-row">
                                <span><strong>Kích Thước Vừa Vặn (Size chuẩn Á Đông):</strong></span>
                                <span className="size-guide">
                                    <img src={rulerIcon} alt="Ruler" className="size-icon-img" /> Hướng dẫn chọn size
                                </span>
                            </div>
                            <div className="size-options">
                                <button className="size-btn">S</button>
                                <button className="size-btn active">M</button>
                                <button className="size-btn">L</button>
                                <button className="size-btn">XL</button>
                                <button className="size-btn">2XL</button>
                                <button className="size-btn">3XL</button>
                            </div>
                        </div>

                        <div className="quantity-section">
                            <span className="quantity-label"><strong>Số Lượng Mua:</strong></span>
                            <div className="quantity-controls">
                                <div className="quantity-picker">
                                    <button className="qty-btn">-</button>
                                    <input type="text" className="qty-input" defaultValue="1" />
                                    <button className="qty-btn">+</button>
                                </div>
                                <div className="quick-qty-tags">
                                    <button className="qty-tag">+5 cái (-5%)</button>
                                    <button className="qty-tag">+10 cái (-10%)</button>
                                    <button className="qty-tag">+20 cái (-15%)</button>
                                </div>
                            </div>
                        </div>

                        <div className="action-buttons">
                            <button className="add-to-cart-btn">
                                <img src={shoppingCartIcon} alt="Cart" className="cart-icon-img" />
                                THÊM VÀO GIỎ HÀNG
                            </button>
                            <button className="buy-now-btn">
                                <img src={lightningIcon} alt="Buy Now" className="buy-now-icon-img" />
                                MUA NGAY - NHẬN TRONG 24H
                            </button>
                        </div>
                    </div>
                </div>

                <div className="shop-info-banner">
                    <div className="shop-avatar">
                        <span>VU</span>
                    </div>
                    <div className="shop-details">
                        <div className="shop-name-row">
                            <h3>VIETUNIFORM Official Hub</h3>
                            <span className="official-badge">✓ Thương hiệu chính hãng</span>
                        </div>
                        <p className="shop-sub">● Đang hoạt động • Kho hàng HÀ NỘI & TP.HCM</p>
                        <div className="shop-actions">
                            <button className="shop-btn outline">Chat Ngay</button>
                            <button className="shop-btn primary">Xem Shop</button>
                        </div>
                    </div>
                    <div className="shop-metrics">
                        <div className="metric-item">
                            <span className="metric-label">Đánh giá</span>
                            <span className="metric-value">4.9 / 5</span>
                        </div>
                    </div>
                </div>

                <div className="product-tabs-section">
                    <div className="tab-header">
                        <button className="tab-btn active">Chất Liệu & Thông Số Kỹ Thuật</button>
                        <button className="tab-btn">Bảng Tra Cứu Size Chuẩn</button>
                        <button className="tab-btn">Chính Sách Đổi Trả & Phụ Phí</button>
                    </div>

                    <div className="tab-content">
                        <h3 className="tab-title">Đặc tính vải dệt Coolmax CVC Doanh Nghiệp</h3>
                        <p className="tab-description">
                            Dòng áo polo đồng phục may sẵn sử dụng kết hợp sợi vóc dệt dặn tỉ lệ đạt <strong>65% Cotton sợi bông tự nhiên</strong> mang đến cảm giác êm ái, thân thiện tuyệt đối với làn da, kết hợp cùng <strong>35% Sợi công nghệ Coolmax</strong> với cấu trúc thoáng khí hình thoi giúp tốc độ bay hơi mồ hôi gấp 3 lần so với thông thường.
                        </p>
                        <div className="spec-grid">
                            <div className="spec-card">
                                <span className="spec-label">Định lượng sợi</span>
                                <span className="spec-value">220 GSM (Độ dày tối ưu)</span>
                            </div>
                            <div className="spec-card">
                                <span className="spec-label">Tỉ lệ co giãn</span>
                                <span className="spec-value">Co giãn 4 chiều (Spandex)</span>
                            </div>
                            <div className="spec-card">
                                <span className="spec-label">Công nghệ nhuộm</span>
                                <span className="spec-value">Bền màu tuyệt đối (Đạt chuẩn 4.5/5)</span>
                            </div>
                            <div className="spec-card">
                                <span className="spec-label">Đặc tính bề mặt</span>
                                <span className="spec-value">Chống xù lông, rụng chỉ khi giặt máy</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="cross-sell-section">
                    <div className="cross-sell-header">
                        <div>
                            <span className="sub-title">ĐỒNG PHỤC THƯỜNG MUA CÙNG</span>
                            <h2>Sản Phẩm Có Sẵn Mua Kèm Thường Gặp</h2>
                        </div>
                        <a href="#" className="view-all-link">Xem toàn bộ kho hàng có sẵn →</a>
                    </div>
                    <div className="cross-sell-grid">
                        <div className="cross-sell-card">
                            <div className="cross-card-img-wrapper">
                                <img src={heroImg} alt="Quần Tây Nam" />
                            </div>
                            <div className="cross-card-info">
                                <p className="cross-category">ĐỒNG PHỤC NAM</p>
                                <h4 className="cross-title">Quần Tây Áo Công Sở Co Co Dãn Nhẹ (Chống Nhăn 100%)</h4>
                                <p className="cross-price">245.000đ <span className="cross-old-price">290.000đ</span></p>
                                <button className="cross-action-btn">+ Thêm Cùng</button>
                            </div>
                        </div>

                        <div className="cross-sell-card">
                            <div className="cross-card-img-wrapper">
                                <img src={heroImg} alt="Chân Váy Chữ A" />
                            </div>
                            <div className="cross-card-info">
                                <p className="cross-category">THỜI TRANG NỮ</p>
                                <h4 className="cross-title">Chân Váy Chữ A Công Sở Dáng Lưng Cao Lót Lụa</h4>
                                <p className="cross-price">195.000đ <span className="cross-old-price">240.000đ</span></p>
                                <button className="cross-action-btn">+ Thêm Cùng</button>
                            </div>
                        </div>

                        <div className="cross-sell-card">
                            <div className="cross-card-img-wrapper">
                                <img src={heroImg} alt="Áo Khoác Gió" />
                            </div>
                            <div className="cross-card-info">
                                <p className="cross-category">ĐỒNG PHỤC MÙA ĐÔNG</p>
                                <h4 className="cross-title">Áo Khoác Gió 2 Lớp Chống Thấm Nước Phối Bo Cổ</h4>
                                <p className="cross-price">215.000đ <span className="cross-old-price">270.000đ</span></p>
                                <button className="cross-action-btn">+ Thêm Cùng</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </main>
    );
}