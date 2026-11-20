import { useState } from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../../store/store';
import { tabs } from '../../data/mockProducts';
import { ProductCard as ProductItem } from '../../components/product/ProductCard';
import './ProductCard.scss';
import { Link } from "react-router";

export default function ProductCard() {
    const allProducts = useSelector((state: RootState) => state.data.products);
    const loading = useSelector((state: RootState) => state.data.loading);
    const [activeTab, setActiveTab] = useState(0);

    if (loading && allProducts.length === 0) {
        return <p style={{ textAlign: 'center', padding: '40px' }}>Đang tải sản phẩm...</p>;
    }

    const products = allProducts
         .filter((p: any) => !activeTab || Number(p.tabId) === activeTab).slice(0,8);

    return (
        <section className="product-section">
            <div className="head">
                <h2 className="title">Top sản phẩm bán chạy</h2>
                <div className="tabs">
                    {tabs.map((t) => (
                        <button
                            key={t.id}
                            className={`tab ${activeTab === t.id ? 'selected' : ''}`}
                            onClick={() => setActiveTab(t.id)}
                        >
                            {t.title}
                        </button>
                    ))}
                </div>
            </div>
            <div className="grid">
                {products.map((product: any) => (
                    <ProductItem key={product.id} product={product} />
                ))}
            </div>
            <div className="buttonView">
                <Link to="/search" className="buy-btn">Xem thêm sản phẩm
                </Link>
            </div>
        </section>
    );
}