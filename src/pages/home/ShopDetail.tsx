import { useState } from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../../store/store';
import { ProductCard } from '../../components/product/ProductCard';
import { SidebarFilter } from '../../components/shop/SidebarFilter';
import { tabs } from '../../data/mockProducts';
import './ShopDetail.scss';

export const ShopDetail = () => {
    const products = useSelector((state: RootState) => state.data.products);

    const [selectedTab, setSelectedTab] = useState<number>(0);
    const [selectedCat, setSelectedCat] = useState<number>(0);
    const [selectedSize, setSelectedSize] = useState('');
    const [selectedColor, setSelectedColor] = useState('');

    const list = products.filter((p) =>
        (!selectedCat || Number(p.categoryId) === selectedCat) &&
        (!selectedTab || Number(p.tabId) === selectedTab) &&
        (!selectedSize || (p.sizes && p.sizes.includes(selectedSize))) &&
        (!selectedColor || (p.colors && p.colors.includes(selectedColor)))
    );

    const handleReset = () => {
        setSelectedCat(0);
        setSelectedTab(0);
        setSelectedSize('');
        setSelectedColor('');
    };

    return (
        <div className="shop-page">
            <div className="banner">
                <div className="bg-img" />
                <div className="shop-card">
                    <div className="left">
                        <img className="avatar" src="/src/assets/hero.png" alt="logo" />
                        <div>
                            <h2>VietUniform Official<span className="badge">Chính Hãng</span></h2>
                            <p className="green">52.000 người theo dõi</p>
                            <p className="desc">Kho Sỉ & Lẻ Đồng Phục Việt Nam | In/Thêu Logo lấy ngay</p>
                        </div>
                    </div>
                    <div className="right">
                        <button className="btn-blue">Theo Dõi Shop</button>
                        <button className="btn-white">Chat Trực Tiếp</button>
                    </div>
                </div>
            </div>
            <div className="main-layout">
                <SidebarFilter
                    selectedCat={selectedCat} selectedTab={selectedTab}
                    selectedSize={selectedSize} selectedColor={selectedColor}
                    onChangeCat={setSelectedCat} onChangeTab={setSelectedTab}
                    onChangeSize={setSelectedSize} onChangeColor={setSelectedColor}
                    onReset={handleReset}
                />
                <div className="content">
                    <div className="nav-tags">
                        {tabs.map((tag) => (
                            <button
                                key={tag.id}
                                className={selectedTab === tag.id ? 'active' : ''}
                                onClick={() => setSelectedTab(tag.id)}>{tag.title}
                            </button>
                        ))}
                    </div>
                    <div className="sort-bar">
                        <span>Hiển thị <strong>{list.length}</strong> sản phẩm may sẵn</span>
                    </div>
                    <div className="product-grid">
                        {list.map((p) => <ProductCard key={p.id} product={p} />)}
                    </div>
                </div>
            </div>
        </div>
    );
};