import HeroSection from './HeroSection';
import CategorySection from './CategorySection';
import ProductCard from './ProductCard';

export default function Home({ onSelectCategory }: { onSelectCategory: (catId: number) => void }) {
    return (
        <main className="home">
            <HeroSection />
            <CategorySection onSelect={onSelectCategory} />
            <ProductCard />
        </main>
    );
}