import { useState } from 'react';
import { Link } from 'react-router';
import './ProductCard.scss';

export const ProductCard = ({ product }: any) => {
    const [liked, setLiked] = useState(false);

    return (
        <div className="product-card">
            <div className="img-box">
                <Link to={`/product/${product.id}`}>
                    <img src={product.image} alt={product.name} />
                </Link>
                <button
                    type="button"
                    className={`save ${liked ? 'active' : ''}`}
                    onClick={() => setLiked(!liked)}
                    aria-label="Yêu thích"
                >
                    <i className={`${liked ? 'fa-solid' : 'fa-regular'} fa-heart`}></i>
                </button>
            </div>

            <div className="info">
                <Link to={`/product/${product.id}`} style={{ textDecoration: 'none' }}>
                    <strong>{product.name}</strong>
                </Link>

                <div className="price">
                    <span className="new">{product.price.toLocaleString('vi-VN')}đ</span>
                    {product.oldPrice && (
                        <span className="old">{product.oldPrice.toLocaleString('vi-VN')}đ</span>
                    )}
                </div>

                <Link to={`/product/${product.id}`} className="buy-btn">
                    Xem chi tiết
                </Link>
            </div>
        </div>
    );
};

