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

const productsSlice = createSlice({
    name: 'products',
    initialState: { items: [] as Product[] },
    reducers: {
        loadProducts: (state, action) => {
            state.items = action.payload;
        }
    }
});

const dataSlice = createSlice({
    name: 'data',
    initialState: {
        categories: [] as any[],
        products: [] as Product[],
        orders: [] as any[]
    },
    reducers: {
        load: (state, action) => {
            state.categories = action.payload.categories;
            state.products = action.payload.products;
            state.orders = action.payload.orders || [];
        }
    }
});

export const { loadProducts } = productsSlice.actions;
export const { load } = dataSlice.actions;

export const store = configureStore({
    reducer: {
        products: productsSlice.reducer,
        data: dataSlice.reducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;