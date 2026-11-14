import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import type { RootState } from '../../store/store';
import { tabs } from '../../data/mockProducts';
import './ProductCard.scss';

export default function ProductCard() {
    const navigate = useNavigate();
    const products = useSelector((state: RootState) => state.data.products).slice(0, 4);

    return (
        <section className="product-section">
            <div className="head">
                <h2 className="title">Top sản phẩm bán chạy</h2>
                <div className="tabs">
                    {tabs.slice(1).map((t, i) => (
                        <button key={t.id} className={`tab ${i === 0 ? 'selected' : ''}`}>
                            {t.title}
                        </button>
                    ))}
                </div>
            </div>
            <div className="grid">
                {products.map((product: any) => (
                    <div
                        key={product.id}
                        className="card"
                        style={{ cursor: 'pointer' }}
                        onClick={() => navigate(`/product/${product.id}`)}
                    >
                        <div className="media">
                            <img src={product.image} alt={product.name} />
                        </div>
                        <div className="content">
                            <p className="name">{product.name}</p>
                            <div className="colors">
                                {product.colors?.map((color: string, j: number) => (
                                    <button
                                        key={j}
                                        className={`swatch ${j === 0 ? 'selected' : ''}`}
                                        style={{ backgroundColor: color }}
                                        onClick={(e) => e.stopPropagation()}
                                    />
                                ))}
                                <button
                                    className="save"
                                    aria-label="Lưu"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <i className="fa-regular fa-heart"></i>
                                </button>
                            </div>
                        </div>
                        <div className="price">
                            <p className="label">Giá:</p>
                            <p className="value">{product.price.toLocaleString('vi-VN')}đ</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}