import { useSelector } from 'react-redux';
import type { RootState } from '../../store/store';
import './CategorySection.scss';

export default function CategorySection({ onSelect }: { onSelect: (catId: number) => void }) {
    const categories = useSelector((state: RootState) => state.data.categories);

    return (
        <section className="category">
            <h2 className="section-title">DANH MỤC SẢN PHẨM</h2>
            <div className="category-grid">
                {categories.map((cat: any) => (
                    <div key={cat.id} className="category-card" onClick={() => onSelect(cat.id)} style={{cursor: 'pointer'}}>
                        <div className="category-media">
                            <img src={cat.image} alt={cat.title} />
                        </div>
                        <div className="category-text">
                            <p className="category-name">{cat.title}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}