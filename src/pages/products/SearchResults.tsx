import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, type RootState, type AppDispatch } from '../../store/store';
import { ProductCard } from '../../components/product/ProductCard';
import { SidebarFilter } from '../../components/shop/SidebarFilter';
import './SearchResults.scss';

export const SearchResults = () => {
    const [searchParams] = useSearchParams();
    const initCat = Number(searchParams.get('cat')) || 0;

    const dispatch = useDispatch<AppDispatch>();
    const { items, status } = useSelector((state: RootState) => state.products);

    const [cat, setCat] = useState<number>(initCat);
    const [tab, setTab] = useState<number>(0);
    const [selectedSize, setSelectedSize] = useState('');
    const [selectedColor, setSelectedColor] = useState('');

    useEffect(() => {
        if (status === 'idle') dispatch(fetchProducts());
    }, [status, dispatch]);

    const list = items.filter(p =>
        (!cat || p.categoryId === cat) &&
        (!tab || p.tabId === tab) &&
        (!selectedSize || (p.sizes && p.sizes.includes(selectedSize))) &&
        (!selectedColor || (p.colors && p.colors.includes(selectedColor)))
    );

    const handleReset = () => { setCat(0); setTab(0); setSelectedSize(''); setSelectedColor(''); };

    return (
        <div className="search-page">
            <div className="container">
                <h2 className="search-title">
                    Đang lọc: <strong>{[cat, tab, selectedSize, selectedColor].filter(Boolean).join(' - ') || 'Tất cả'}</strong> ({list.length} sản phẩm)
                </h2>
                <div className="main-layout">
                    <SidebarFilter
                        selectedCat={cat} selectedTab={tab} selectedSize={selectedSize} selectedColor={selectedColor}
                        onChangeCat={setCat} onChangeTab={setTab} onChangeSize={setSelectedSize} onChangeColor={setSelectedColor}
                        onReset={handleReset}
                    />
                    <div className="content">
                        {status === 'idle' || status === 'loading' ? (
                            <p style={{textAlign: 'center', padding: '40px'}}>Đang tải dữ liệu...</p>
                        ) : (
                            <div className="product-grid">
                                {list.map(p => <ProductCard key={p.id} product={p} />)}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};