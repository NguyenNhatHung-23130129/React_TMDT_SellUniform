import { filterOpts } from '../../data/mockProducts';
import './SidebarFilter.scss';

export const SidebarFilter = ({selectedCat = 0, selectedTab = 0, selectedSize = '', selectedColor = '', onChangeCat, onChangeTab, onChangeSize, onChangeColor, onReset}: any) => (
    <aside className="sidebar">
        <h3>Bộ Lọc</h3>
        <div className="filter-group">
            <h4>Danh mục ngành nghề</h4>
            {filterOpts.categories.map(c => (
                <label key={c.id}>
                    <input type="radio" name="nganh" checked={selectedCat === c.id} onChange={() => onChangeCat?.(c.id)}/>{c.title}
                </label>
            ))}
        </div>
        <div className="filter-group">
            <h4>Loại trang phục</h4>
            {filterOpts.tabs.slice(1).map(t => (
                <label key={t.id}>
                    <input type="radio" name="loai" checked={selectedTab === t.id} onChange={() => onChangeTab?.(t.id)}/>{t.title}
                </label>
            ))}
        </div>
        <div className="filter-group">
            <h4>Kích thước có sẵn</h4>
            <div className="sizes-grid">
                {filterOpts.sizes.map(s => (
                    <button key={s} className={selectedSize === s ? 'active' : ''} onClick={() => onChangeSize?.(s === selectedSize ? '' : s)}>{s}</button>
                ))}
            </div>
        </div>
        <div className="filter-group">
            <h4>Màu sắc</h4>
            <div className="colors-flex">
                {filterOpts.colors.map(c => (
                    <span key={c} style={{backgroundColor: c}} className={`color-dot ${selectedColor === c ? 'active' : ''}`} onClick={() => onChangeColor?.(c === selectedColor ? '' : c)} />
                ))}
            </div>
        </div>
        <button className="btn-outline" onClick={onReset}>Xóa Lọc</button>
    </aside>
);