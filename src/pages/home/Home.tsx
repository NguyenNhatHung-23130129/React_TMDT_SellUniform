import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllData, type AppDispatch, type RootState } from '../../store/store';
import HeroSection from './HeroSection';
import CategorySection from './CategorySection';
import ProductCard from './ProductCard';

export default function Home({ onSelectCategory }: { onSelectCategory: (catId: number) => void }) {
    const dispatch = useDispatch<AppDispatch>();
    const status = useSelector((state: RootState) => state.data.status);

    useEffect(() => {
        if (status === 'idle') dispatch(fetchAllData());
    }, [status, dispatch]);

    if (status === 'idle' || status === 'loading') {
        return <p style={{textAlign: 'center', padding: '100px 0'}}>Đang tải dữ liệu từ Fake API...</p>;
    }

    return (
        <main className="home">
            <HeroSection />
            <CategorySection onSelect={onSelectCategory} />
            <ProductCard />
        </main>
    );
}