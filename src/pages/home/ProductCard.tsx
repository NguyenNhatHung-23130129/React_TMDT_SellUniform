import { useState } from 'react';
import { useSelector } from 'react-redux';
import { tabs } from '../../data/mockProducts';
import { ProductCard as ProductItem } from '../../components/product/ProductCard';
import './ProductCard.scss';

export default function ProductCard() {
    const allProducts = useSelector((state: any) => state.data.products);
    const [activeTab, setActiveTab] = useState(0);

    const products = allProducts
        .filter((p: any) => !activeTab || Number(p.tabId) === activeTab);

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
        </section>
    );
}