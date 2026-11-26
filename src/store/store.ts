import { configureStore, createSlice } from '@reduxjs/toolkit';

export interface Product {
    id: number;
    categoryId: number;
    tabId: number;
    name: string;
    price: number;
    oldPrice: number;
    image: string;
    colors: string[];
    sizes: string[];
}

export interface Category {
    id: number;
    title: string;
    desc: string;
    image: string;
}

const loadFavoritesFromStorage = (): number[] => {
        const stored = localStorage.getItem('favoriteProductIds');
        return stored ? JSON.parse(stored) : [];
};

const dataSlice = createSlice({
    name: 'data',
    initialState: {
        categories: [] as Category[],
        products: [] as Product[],
        orders: [] as any[],
        favorites: loadFavoritesFromStorage() as number[],
        loading: true,
        error: null as string | null,
    },
    reducers: {
        load: (state: any, action: any) => {
            if (action.payload.categories) {
                state.categories = action.payload.categories;
            }
            if (action.payload.products) {
                state.products = action.payload.products;
            }
            if (action.payload.orders) {
                state.orders = action.payload.orders;
            }
            state.loading = false;
        },
        setLoading: (state: any, action: any) => {
            state.loading = action.payload;
        },
        setError: (state: any, action: any) => {
            state.error = action.payload;
            state.loading = false;
        },
        toggleFavorite: (state: any, action:any) => {
            const productId = action.payload;
            const index = state.favorites.indexOf(productId);
            if (index === -1) {
                state.favorites.push(productId);
            } else {
                state.favorites.splice(index, 1);
            }
            localStorage.setItem('favoriteProductIds', JSON.stringify(state.favorites));
        },
        setFavorites: (state: any, action: any) => {
            state.favorites = action.payload;
            localStorage.setItem('favoriteProductIds', JSON.stringify(state.favorites));
        },
    },
});

export const { load, setLoading, setError, toggleFavorite, setFavorites } = dataSlice.actions;

export const store = configureStore({
    reducer: {
        data: dataSlice.reducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
