import { useSelector } from 'react-redux';
import type { RootState } from '../../store/store';
import { tabs, sizes } from '../../data/mockProducts';
import './SidebarFilter.scss';

export const SidebarFilter = ({
                                  selectedCat = 0, selectedTab = 0, selectedSize = '',
                                  onChangeCat, onChangeTab, onChangeSize, onReset
                              }: any) => {
    const apiCategories = useSelector((state: RootState) => state.data.categories);


    return (
        <aside className="sidebar">
            <h3>Bộ lọc</h3>
            <div className="filter-group">
                <h4>Danh mục ngành nghề</h4>
                {apiCategories.map((c: any) => (
                    <label key={c.id}>
                        <input
                            type="radio"
                            name="nganh"
                            checked={selectedCat === Number(c.id)}
                            onChange={() => onChangeCat?.(Number(c.id))}
                        />
                        {c.title}
                    </label>
                ))}
            </div>
            <div className="filter-group">
                <h4>Loại trang phục</h4>
                {tabs.slice(1).map(t => (
                    <label key={t.id}>
                        <input
                            type="radio"
                            name="loai"
                            checked={selectedTab === t.id}
                            onChange={() => onChangeTab?.(t.id)}/>{t.title}
                    </label>
                ))}
            </div>
            <div className="filter-group">
                <h4>Kích thước sẵn</h4>
                <div className="sizes-grid">
                    {sizes.map(s => (
                        <button
                            key={s}
                            className={selectedSize === s ? 'active' : ''}
                            onClick={() => onChangeSize?.(s === selectedSize ? '' : s)}>{s}
                        </button>
                    ))}
                </div>
            </div>

            <button className="btn-outline" onClick={onReset}>Xóa bộ lọc</button>
        </aside>
    );
};