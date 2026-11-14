import { useState } from 'react';
import { useSearchParams } from 'react-router';
import { useSelector } from 'react-redux';
import type { RootState } from '../../store/store';
import { ProductCard } from '../../components/product/ProductCard';
import { SidebarFilter } from '../../components/shop/SidebarFilter';
import './SearchResults.scss';

export const SearchResults = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const initCat = Number(searchParams.get('cat')) || 0;
    const keyword = (searchParams.get('q') || '').trim().toLowerCase();

    const products = useSelector((state: RootState) => state.data.products);

    const [cat, setCat] = useState<number>(initCat);
    const [tab, setTab] = useState<number>(0);
    const [selectedSize, setSelectedSize] = useState('');
    const [selectedColor, setSelectedColor] = useState('');

    const list = products.filter(p =>
        (!keyword || p.name.toLowerCase().includes(keyword)) &&
        (!cat || Number(p.categoryId) === cat) &&
        (!tab || Number(p.tabId) === tab) &&
        (!selectedSize || (p.sizes && p.sizes.includes(selectedSize))) &&
        (!selectedColor || (p.colors && p.colors.includes(selectedColor)))
    );

    const handleReset = () => {
        setCat(0);
        setTab(0);
        setSelectedSize('');
        setSelectedColor('');
        setSearchParams({});
    };

    return (
        <div className="search-page">
            <div className="container">
                <h2 className="search-title">
                    Đang lọc: <strong>{[keyword && `"${keyword}"`, cat && `Danh mục ${cat}`, tab && `Loại ${tab}`, selectedSize, selectedColor].filter(Boolean).join(' - ') || 'Tất cả'}</strong> ({list.length} sản phẩm)
                </h2>
                <div className="main-layout">
                    <SidebarFilter
                        selectedCat={cat} selectedTab={tab} selectedSize={selectedSize} selectedColor={selectedColor}
                        onChangeCat={setCat} onChangeTab={setTab} onChangeSize={setSelectedSize} onChangeColor={setSelectedColor}
                        onReset={handleReset}
                    />
                    <div className="content">
                        <div className="product-grid">
                            {list.map(p => <ProductCard key={p.id} product={p} />)}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};