import { useState, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import MiniSearch from 'minisearch';
import type { RootState } from '../store/store';
import './SearchAutocomplete.scss';

export const SearchAutocomplete = () => {
    const products = useSelector((state: RootState) => state.data.products);
    const navigate = useNavigate();
    const [inputValue, setInputValue] = useState('');

    const searchIndex = useMemo(() => {
        const index = new MiniSearch({
            fields: ['name'],
            storeFields: ['id', 'name'],
            searchOptions: {
                prefix: true,
                fuzzy: 0.25,
            }
        });
        index.addAll(products);
        return index;
    }, [products]);

    const results = inputValue.trim() ? searchIndex.search(inputValue).slice(0, 5) : [];

    return (
        <div className="search-autocomplete-wrapper">
            <input type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === 'Enter' && inputValue.trim()) {
                        navigate(`/search?q=${encodeURIComponent(inputValue.trim())}`);
                        setInputValue('');}}}
                placeholder="Tìm kiếm sản phẩm..."
                className="search-input"/>

            {results.length > 0 && (
                <ul className="search-popup">
                    {results.map((item: any) => (
                        <li key={item.id} className="search-item"
                            onMouseDown={() => {navigate(`/product/${item.id}`);setInputValue('');
                            }}>{item.name}</li>
                    ))}
                </ul>
            )}
        </div>
    );
};