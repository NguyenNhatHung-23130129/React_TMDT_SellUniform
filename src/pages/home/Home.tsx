import HeroSection from './HeroSection';
import CategorySection from './CategorySection';
import ProductCard from './ProductCard';
import { useSelector } from 'react-redux';
import type { RootState } from '../../store/store';

export default function Home({ onSelectCategory }: { onSelectCategory: (catId: number) => void }) {
    const loading = useSelector((state: RootState) => state.data.loading);
    const error = useSelector((state: RootState) => state.data.error);

    if (loading) {
        return <main className="home"><p style={{ textAlign: 'center', padding: '40px' }}>Đang tải dữ liệu...</p></main>;
    }
    if (error) {
        return <main className="home"><p style={{ textAlign: 'center', color: 'red' }}>Lỗi: {error}</p></main>;
    }
    return (
        <main className="home">
            <HeroSection />
            <CategorySection onSelect={onSelectCategory} />
            <ProductCard />
        </main>
    );
}