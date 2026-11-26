import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router';
import type { RootState, AppDispatch } from '../../store/store';
import { toggleFavorite } from '../../store/store';
import './ProductCard.scss';

export const ProductCard = ({ product }: { product: any }) => {
    const dispatch = useDispatch<AppDispatch>();
    const favorites = useSelector((state: RootState) => state.data.favorites);
    const isLiked = favorites.includes(product.id);

    const handleToggleFavorite = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        dispatch(toggleFavorite(product.id));
    };

    return (
        <div className="product-card">
            <div className="img-box">
                <Link to={`/product/${product.id}`}>
                    <img src={product.image} alt={product.name} />
                </Link>
                <button type="button" className={`save ${isLiked ? 'active' : ''}`}
                    onClick={handleToggleFavorite} aria-label={isLiked ? 'Bỏ yêu thích' : 'Yêu thích'}>
                    <i className={`${isLiked ? 'fa-solid' : 'fa-regular'} fa-heart`}></i>
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

