import { useSelector } from 'react-redux';
import type { RootState, Product } from '../../store/store';
import { ProductCard } from '../../components/product/ProductCard';
import { Link } from 'react-router';
import './FavoriteProducts.css';

export default function FavoriteProducts() {
    const favorites = useSelector((state: RootState) => state.data.favorites);
    const allProducts = useSelector((state: RootState) => state.data.products);
    const loading = useSelector((state: RootState) => state.data.loading);

    const favoriteProducts = allProducts.filter((product: Product) =>
        favorites.includes(product.id)
    );

    if (loading && allProducts.length === 0) {
        return (
            <main className="home">
                <div className="favorite-container">
                    <p style={{ textAlign: 'center', padding: '40px' }}>Đang tải sản phẩm...</p>
                </div>
            </main>
        );
    }

    return (
        <main className="home">
            <div className="favorite-container">
                <h2 className="favorite-title">
                    Danh sách sản phẩm yêu thích của bạn ({favoriteProducts.length} món)
                </h2>

                {favoriteProducts.length === 0 ? (
                    <div className="empty-favorites">
                        <p>Bạn chưa có sản phẩm yêu thích nào.</p>
                        <Link to="/search" className="buy-btn">Khám phá sản phẩm</Link>
                    </div>
                ) : (
                    <div className="favorite-grid">
                        {favoriteProducts.map((product: Product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                )}
            </div>
        </main>
    );
}