import { useState, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import type { RootState } from '../store/store';
import './SearchAutocomplete.scss';

const normalizeSearchText = (value: string) =>
  value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[đĐ]/g, 'd')
    .toLowerCase();

export const SearchAutocomplete = () => {
  const products = useSelector((state: RootState) => state.data.products);
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState('');

  const results = useMemo(() => {
    const query = normalizeSearchText(inputValue.trim());
    if (!query) return [];

    const queryWords = query.split(/\s+/);
    return products
      .filter((product) => {
        const normalizedName = normalizeSearchText(product.name);
        return queryWords.every((word) => normalizedName.includes(word));
      })
      .sort((left, right) => {
        const leftName = normalizeSearchText(left.name);
        const rightName = normalizeSearchText(right.name);
        return Number(!leftName.startsWith(query)) - Number(!rightName.startsWith(query));
      })
      .slice(0, 5);
  }, [inputValue, products]);

  return (
    <div className="search-autocomplete-wrapper">
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && inputValue.trim()) {
            navigate(`/search?q=${encodeURIComponent(inputValue.trim())}`);
            setInputValue('');
          }
        }}
        placeholder="Tìm kiếm sản phẩm..."
        className="search-input"
      />

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
