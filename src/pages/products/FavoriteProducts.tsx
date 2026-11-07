import Header from '../../components/layout/Header.tsx';
import Footer from '../../components/layout/Footer.tsx';
import heroImg from '../../assets/hero.png';
import heartIcon from '../../assets/icons/heart-icon.svg';
import shoppingCartIcon from '../../assets/icons/shopping-cart-icon.svg';
import './FavoriteProducts.css';

export default function FavoriteProducts() {
    return (
        <main className="home">
            <Header />
            <div className="favorite-container">
                <h2 className="favorite-title">Danh sách sản phẩm yêu thích của bạn (6 món)</h2>

                <div className="favorite-grid">
                    <div className="product-card">
                        <div className="card-image-wrapper">
                            <img src={heroImg} alt="Áo Polo Công Sở" className="card-img" />
                            <span className="badge-tag">Giao ngay 24h</span>
                            <button className="heart-btn active">
                                <img src={heartIcon} alt="Heart" className="icon-img" />
                            </button>
                        </div>
                        <div className="card-info">
                            <p className="category-text">Đồng phục Công ty • Mã: CS-PO-01 • Sẵn kho: 245 cái</p>
                            <h3 className="product-name">Áo Polo Công Sở Phối Cổ Dệt Cotton...</h3>
                            <div className="price-row">
                                <div className="price-col">
                                    <span className="price-label">Giá niêm yết</span>
                                    <span className="old-price">185.000 ₫</span>
                                </div>
                                <div className="price-col text-right">
                                    <span className="price-label highlight">Giá sỉ (từ 5 cái)</span>
                                    <span className="new-price">145.000 ₫</span>
                                </div>
                            </div>
                            <div className="size-selector">
                                <span className="size-label">Chọn kích cỡ (Size chuẩn VN):</span>
                                <div className="size-list">
                                    <span className="size-item">S</span>
                                    <span className="size-item">M</span>
                                    <span className="size-item active">L</span>
                                    <span className="size-item">XL</span>
                                    <span className="size-item">2XL</span>
                                </div>
                            </div>
                            <button className="add-cart-btn">
                                <img src={shoppingCartIcon} alt="Cart" className="btn-icon" /> Thêm vào giỏ hàng
                            </button>
                        </div>
                    </div>

                    <div className="product-card">
                        <div className="card-image-wrapper">
                            <img src={heroImg} alt="Áo Sơ Mi Nam" className="card-img" />
                            <span className="badge-tag">Giao ngay 24h</span>
                            <button className="heart-btn active">
                                <img src={heartIcon} alt="Heart" className="icon-img" />
                            </button>
                        </div>
                        <div className="card-info">
                            <p className="category-text">Đồng phục Công sở • Mã: CS-SM-04 • Sẵn kho: 180 cái</p>
                            <h3 className="product-name">Áo Sơ Mi Nam Tay Dài Vải Bamboo Chống...</h3>
                            <div className="price-row">
                                <div className="price-col">
                                    <span className="price-label">Giá niêm yết</span>
                                    <span className="old-price">265.000 ₫</span>
                                </div>
                                <div className="price-col text-right">
                                    <span className="price-label highlight">Giá sỉ (từ 5 cái)</span>
                                    <span className="new-price">210.000 ₫</span>
                                </div>
                            </div>
                            <div className="size-selector">
                                <span className="size-label">Chọn kích cỡ (Size chuẩn VN):</span>
                                <div className="size-list">
                                    <span className="size-item">39</span>
                                    <span className="size-item active">40</span>
                                    <span className="size-item">41</span>
                                    <span className="size-item">42</span>
                                </div>
                            </div>
                            <button className="add-cart-btn">
                                <img src={shoppingCartIcon} alt="Cart" className="btn-icon" /> Thêm vào giỏ hàng
                            </button>
                        </div>
                    </div>

                    <div className="product-card">
                        <div className="card-image-wrapper">
                            <img src={heroImg} alt="Bộ Đồng Phục Scrub" className="card-img" />
                            <span className="badge-tag">Giao ngay 24h</span>
                            <button className="heart-btn active">
                                <img src={heartIcon} alt="Heart" className="icon-img" />
                            </button>
                        </div>
                        <div className="card-info">
                            <p className="category-text">Đồng phục Y Tế • Mã: YT-SCRUB-03 • Sẵn kho: 310 bộ</p>
                            <h3 className="product-name">Bộ Đồng Phục Scrub Y Tế Kháng Khuẩn...</h3>
                            <div className="price-row">
                                <div className="price-col">
                                    <span className="price-label">Giá niêm yết</span>
                                    <span className="old-price">320.000 ₫</span>
                                </div>
                                <div className="price-col text-right">
                                    <span className="price-label highlight">Giá sỉ (từ 5 bộ)</span>
                                    <span className="new-price">255.000 ₫</span>
                                </div>
                            </div>
                            <div className="size-selector">
                                <span className="size-label">Chọn kích cỡ (Size chuẩn VN):</span>
                                <div className="size-list">
                                    <span className="size-item">S</span>
                                    <span className="size-item active">M</span>
                                    <span className="size-item">L</span>
                                    <span className="size-item">XL</span>
                                </div>
                            </div>
                            <button className="add-cart-btn">
                                <img src={shoppingCartIcon} alt="Cart" className="btn-icon" /> Thêm vào giỏ hàng
                            </button>
                        </div>
                    </div>

                    <div className="product-card">
                        <div className="card-image-wrapper">
                            <img src={heroImg} alt="Tạp Dề" className="card-img" />
                            <span className="badge-tag">Giao ngay 24h</span>
                            <button className="heart-btn active">
                                <img src={heartIcon} alt="Heart" className="icon-img" />
                            </button>
                        </div>
                        <div className="card-info">
                            <p className="category-text">Nhà Hàng & F&B • Mã: FB-TD-01 • Sẵn kho: 450 cái</p>
                            <h3 className="product-name">Tạp Dề Yếm Pha Chế Canvas Dày Dặn...</h3>
                            <div className="price-row">
                                <div className="price-col">
                                    <span className="price-label">Giá niêm yết</span>
                                    <span className="old-price">125.000 ₫</span>
                                </div>
                                <div className="price-col text-right">
                                    <span className="price-label highlight">Giá sỉ (từ 5 cái)</span>
                                    <span className="new-price">95.000 ₫</span>
                                </div>
                            </div>
                            <div className="size-selector">
                                <span className="size-label">Kích thước tiêu chuẩn:</span>
                                <div className="size-list">
                                    <span className="size-item active long">Freesize Unisex</span>
                                </div>
                            </div>
                            <button className="add-cart-btn">
                                <img src={shoppingCartIcon} alt="Cart" className="btn-icon" /> Thêm vào giỏ hàng
                            </button>
                        </div>
                    </div>

                    <div className="product-card">
                        <div className="card-image-wrapper">
                            <img src={heroImg} alt="Áo Blouse" className="card-img" />
                            <span className="badge-tag">Giao ngay 24h</span>
                            <button className="heart-btn active">
                                <img src={heartIcon} alt="Heart" className="icon-img" />
                            </button>
                        </div>
                        <div className="card-info">
                            <p className="category-text">Đồng phục Y Tế • Mã: YT-BL-01 • Sẵn kho: 120 cái</p>
                            <h3 className="product-name">Áo Blouse Bác Sĩ Dài Tay Vải Kate Ford</h3>
                            <div className="price-row">
                                <div className="price-col">
                                    <span className="price-label">Giá niêm yết</span>
                                    <span className="old-price">240.000 ₫</span>
                                </div>
                                <div className="price-col text-right">
                                    <span className="price-label highlight">Giá sỉ (từ 5 cái)</span>
                                    <span className="new-price">195.000 ₫</span>
                                </div>
                            </div>
                            <div className="size-selector">
                                <span className="size-label">Chọn kích cỡ (Size chuẩn VN):</span>
                                <div className="size-list">
                                    <span className="size-item">S</span>
                                    <span className="size-item">M</span>
                                    <span className="size-item active">L</span>
                                    <span className="size-item">XL</span>
                                </div>
                            </div>
                            <button className="add-cart-btn">
                                <img src={shoppingCartIcon} alt="Cart" className="btn-icon" /> Thêm vào giỏ hàng
                            </button>
                        </div>
                    </div>

                    <div className="product-card">
                        <div className="card-image-wrapper">
                            <img src={heroImg} alt="Quần Tây Nam" className="card-img" />
                            <span className="badge-tag">Giao ngay 24h</span>
                            <button className="heart-btn active">
                                <img src={heartIcon} alt="Heart" className="icon-img" />
                            </button>
                        </div>
                        <div className="card-info">
                            <p className="category-text">Công sở Nam • Mã: CS-QT-06 • Sẵn kho: 195 cái</p>
                            <h3 className="product-name">Quần Tây Nam Công Sở Form Dáng Suông</h3>
                            <div className="price-row">
                                <div className="price-col">
                                    <span className="price-label">Giá niêm yết</span>
                                    <span className="old-price">295.000 ₫</span>
                                </div>
                                <div className="price-col text-right">
                                    <span className="price-label highlight">Giá sỉ (từ 5 cái)</span>
                                    <span className="new-price">235.000 ₫</span>
                                </div>
                            </div>
                            <div className="size-selector">
                                <span className="size-label">Chọn kích cỡ (Size chuẩn VN):</span>
                                <div className="size-list">
                                    <span className="size-item">29</span>
                                    <span className="size-item">30</span>
                                    <span className="size-item active">31</span>
                                    <span className="size-item">32</span>
                                    <span className="size-item">33</span>
                                </div>
                            </div>
                            <button className="add-cart-btn">
                                <img src={shoppingCartIcon} alt="Cart" className="btn-icon" /> Thêm vào giỏ hàng
                            </button>
                        </div>
                    </div>
                </div>

                <div className="recommendation-section">
                    <div className="recommendation-header">
                        <h3>Đồng phục may sẵn bán chạy cùng loại bạn có thể thích</h3>
                        <div className="slider-nav">
                            <button className="nav-btn">‹</button>
                            <button className="nav-btn">›</button>
                        </div>
                    </div>

                    <div className="recommendation-grid">
                        <div className="rec-card">
                            <div className="rec-image-wrapper">
                                <img src={heroImg} alt="Áo Bếp" className="rec-img" />
                                <span className="rec-badge">Top Bán Chạy</span>
                                <button className="rec-heart-btn">
                                    <img src={heartIcon} alt="Heart" className="icon-img" />
                                </button>
                            </div>
                            <div className="rec-info">
                                <p className="rec-category">NHÀ HÀNG & F&B</p>
                                <h4 className="rec-title">Áo Bếp Trưởng Phối Lưới Thoáng...</h4>
                                <p className="rec-price">215.000 ₫</p>
                                <button className="rec-action-btn">Xem nhanh & Thêm</button>
                            </div>
                        </div>

                        <div className="rec-card">
                            <div className="rec-image-wrapper">
                                <img src={heroImg} alt="Quần Jogger" className="rec-img" />
                                <span className="rec-badge green">Mẫu Mới</span>
                                <button className="rec-heart-btn">
                                    <img src={heartIcon} alt="Heart" className="icon-img" />
                                </button>
                            </div>
                            <div className="rec-info">
                                <p className="rec-category">Y TẾ & ĐIỀU DƯỠNG</p>
                                <h4 className="rec-title">Quần Jogger Y Tế Nhiều Ngăn Co...</h4>
                                <p className="rec-price">165.000 ₫</p>
                                <button className="rec-action-btn">Xem nhanh & Thêm</button>
                            </div>
                        </div>

                        <div className="rec-card">
                            <div className="rec-image-wrapper">
                                <img src={heroImg} alt="Áo Polo Thể Thao" className="rec-img" />
                                <span className="rec-badge blue">Hot Nhất Hè</span>
                                <button className="rec-heart-btn">
                                    <img src={heartIcon} alt="Heart" className="icon-img" />
                                </button>
                            </div>
                            <div className="rec-info">
                                <p className="rec-category">CÔNG SỞ & DOANH NGHIỆP</p>
                                <h4 className="rec-title">Áo Polo Thể Thao Doanh Nghiệp...</h4>
                                <p className="rec-price">155.000 ₫</p>
                                <button className="rec-action-btn">Xem nhanh & Thêm</button>
                            </div>
                        </div>

                        <div className="rec-card">
                            <div className="rec-image-wrapper">
                                <img src={heroImg} alt="Áo Gile" className="rec-img" />
                                <span className="rec-badge gray">Thiết Kế Chuẩn</span>
                                <button className="rec-heart-btn">
                                    <img src={heartIcon} alt="Heart" className="icon-img" />
                                </button>
                            </div>
                            <div className="rec-info">
                                <p className="rec-category">CÔNG SỞ & KHÁCH SẠN</p>
                                <h4 className="rec-title">Áo Gile Công Sở Nữ Ôm Dáng Cao...</h4>
                                <p className="rec-price">275.000 ₫</p>
                                <button className="rec-action-btn">Xem nhanh & Thêm</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </main>
    );
}