import {categories, tabs, filterOpts} from '../../data/mockProducts';
import './SidebarFilter.scss';


export const SidebarFilter = ({selectedCat = '', selectedTab = '', selectedSize = '', selectedColor = '',
                                  onChangeCat, onChangeTab, onChangeSize, onChangeColor, onReset}: any) => (
    <aside className="sidebar">
        <h3>Bộ lọc</h3>

        <div className="filter-group">
            <h4>Danh mục ngành nghề</h4>
            {categories.map(c => (
                <label key={c.title}>
                    <input type="radio" name="nganh" checked={selectedCat === c.title}
                           onChange={() => onChangeCat?.(c.title)}/>
                    {c.title}
                </label>
            ))}
        </div>

        <div className="filter-group">
            <h4>Loại trang phục</h4>
            {tabs.slice(1).map(t => (
                <label key={t}>
                    <input type="radio" name="loai" checked={selectedTab === t} onChange={() => onChangeTab?.(t)}/>
                    {t}
                </label>
            ))}
        </div>

        <div className="filter-group">
            <h4>Kích thước sẵn kho</h4>
            <div className="sizes-grid">
                {filterOpts.sizes.map(s => (
                    <button key={s} className={selectedSize === s ? 'active' : ''}
                            onClick={() => onChangeSize?.(s === selectedSize ? '' : s)}>{s}</button>
                ))}
            </div>
        </div>

        <div className="filter-group">
            <h4>Màu sắc</h4>
            <div className="colors-flex">
                {filterOpts.colors.map(c => (
                    <span key={c} style={{backgroundColor: c}} className={`color-dot ${selectedColor === c ? 'active' : ''}`}
                        onClick={() => onChangeColor?.(c === selectedColor ? '' : c)} />))}
            </div>
        </div>

        <div className="filter-group">
            <h4>Khoảng giá</h4>
            {filterOpts.prices.map(p => (
                <label key={p}><input type="radio" name="gia"/> {p}</label>
            ))}
        </div>

        <button className="btn-primary"><i className="fa-solid fa-check"></i>Áp Dụng Bộ Lọc</button>
        <button className="btn-outline" onClick={onReset}>Xóa bộ lọc</button>
    </aside>
);