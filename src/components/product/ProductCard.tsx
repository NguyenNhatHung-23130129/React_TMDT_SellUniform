import './ProductCard.scss';
import type {Product} from "../../store/store.ts";

export const ProductCard = ({ product }: { product: Product }) => (
    <div className="product-card">
        <div className="img-box">
            <img src={product.image} alt={product.name} />
        </div>
        <div className="info">
            <strong>{product.name}</strong>
            <div className="colors">
                {product.colors?.map((color: string, j: number) => (
                    <button key={j} className={`swatch ${j === 0 ? 'selected' : ''}`}
                        style={{ backgroundColor: color }}
                    />
                ))}
                <button className="save"><i className="fa-regular fa-heart"></i></button>
            </div>
            <div className="price">
                <span className="new">{product.price.toLocaleString('vi-VN')}đ</span>
                {product.oldPrice && <span className="old">{product.oldPrice.toLocaleString('vi-VN')}đ</span>}
            </div>
            <div className="btn-action">
                <button className="btn cart-btn"><i className="fa-solid fa-cart-shopping"></i></button>
                <button className="btn buy-btn">Mua ngay</button>
            </div>
        </div>
    </div>
);