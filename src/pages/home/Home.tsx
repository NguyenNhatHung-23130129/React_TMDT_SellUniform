import HeroSection from './HeroSection.tsx';
import CategorySection from './CategorySection.tsx';
import ProductCard from './ProductCard.tsx';

import Header from '../../components/layout/Header.tsx';
import Footer from '../../components/layout/Footer.tsx'

export default function Home() {
  return (
    <main className="home">
        <Header/>
        <HeroSection />
        <CategorySection />
        <ProductCard />
        <Footer />
    </main>
  );
}
