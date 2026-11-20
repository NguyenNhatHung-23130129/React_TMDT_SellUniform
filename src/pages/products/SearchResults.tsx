import { useState } from 'react';
import { useSearchParams } from 'react-router';
import { useSelector } from 'react-redux';
import { type RootState } from '../../store/store';
import { ProductCard } from '../../components/product/ProductCard';
import { SidebarFilter } from '../../components/shop/SidebarFilter';
import './SearchResults.scss';

export const SearchResults = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const initCat = Number(searchParams.get('cat')) || 0;
    const keyword = (searchParams.get('q') || '').trim().toLowerCase();
    const [page, setPage] = useState(1);
    const LIMIT = 20;

    const products = useSelector((state: RootState) => state.data.products);
    const loading = useSelector((state: RootState) => state.data.loading);
    const error = useSelector((state: RootState) => state.data.error);
    const [cat, setCat] = useState<number>(initCat);
    const [tab, setTab] = useState<number>(0);
    const [selectedSize, setSelectedSize] = useState('');
    const [selectedColor, setSelectedColor] = useState('');
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [sort, setSort] = useState('default');

    if (loading && products.length === 0) {
        return <p style={{ textAlign: 'center', padding: '40px' }}>Đang tải sản phẩm...</p>;
    }
    if (error && products.length === 0) {
        return <p style={{ textAlign: 'center', color: 'red' }}>Lỗi: {error}</p>;
    }
    const list = products.filter(p =>
            (!keyword || p.name.toLowerCase().includes(keyword)) &&
            (!cat || Number(p.categoryId) === cat) &&
            (!tab || Number(p.tabId) === tab) &&
            (!selectedSize || p.sizes?.includes(selectedSize)) &&
            (!minPrice || Number(p.price) >= Number(minPrice)) &&
            (!maxPrice || Number(p.price) <= Number(maxPrice))
        )
        .slice()
        .sort((a: any, b: any) => {
            if (sort === 'price-asc') return Number(a.price) - Number(b.price);
            if (sort === 'price-desc') return Number(b.price) - Number(a.price);
            if (sort === 'name') return String(a.name).localeCompare(String(b.name));
            return 0;
        });
    const totalPages = Math.ceil(list.length / LIMIT);
    const paginatedList = list.slice((page - 1) * LIMIT, page * LIMIT);

    const handleReset = () => {
        setCat(0);
        setTab(0);
        setSelectedSize('');
        setMinPrice('');
        setMaxPrice('');
        setSort('default');
        setSearchParams({});
    };

    const hasFilters = cat || tab || selectedSize || minPrice || maxPrice || sort !== 'default';

    return (
        <div className="search-page">

                <h2 className="search-title">
                    Đang lọc: <strong>
                    {[keyword && `"${keyword}"`, cat && `Danh mục ${cat}`, tab && `Loại ${tab}`, selectedSize, (minPrice || maxPrice) && `${minPrice || 0}đ - ${maxPrice || '∞'}`].filter(Boolean).join(' - ') || 'Tất cả'}
                </strong> ({list.length} sản phẩm)
                </h2>
                <div className="main-layout">
                    <SidebarFilter
                        selectedCat={cat} selectedTab={tab} selectedSize={selectedSize} selectedColor={selectedColor}
                        onChangeCat={setCat} onChangeTab={setTab} onChangeSize={setSelectedSize}
                        onChangeColor={setSelectedColor}
                        onReset={handleReset}
                    />
                    <div className="content">
                        <div className="filter-toolbar">
                            <label>
                                Sắp xếp:
                                <select value={sort} onChange={(e) => setSort(e.target.value)}>
                                    <option value="default">Mặc định</option>
                                    <option value="price-asc">Giá tăng dần</option>
                                    <option value="price-desc">Giá giảm dần</option>
                                    <option value="name">Tên A-Z</option>
                                </select>
                            </label>
                            <label>
                                Giá từ:
                                <input type="number" min={0} value={minPrice} onChange={(e) => setMinPrice(e.target.value)} placeholder="0" />
                            </label>
                            <label>
                                đến:
                                <input type="number" min={0} value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} placeholder="∞" />
                            </label>
                            {hasFilters && (
                                <button type="button" className="clear-filters-btn" onClick={handleReset}>Xóa bộ lọc</button>
                            )}
                        </div>
                        <div className="product-grid">
                            {paginatedList.map(p => <ProductCard key={p.id} product={p}/>)}
                        </div>

                        {totalPages > 1 && (
                            <div className="pagination">
                                <div className="pages">
                                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(num => (
                                        <button key={num} className={page === num ? 'active' : ''}
                                            onClick={() => setPage(num)}>{num}</button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

        </div>
    );
};