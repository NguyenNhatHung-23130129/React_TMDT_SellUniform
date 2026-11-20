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

const dataSlice = createSlice({
    name: 'data',
    initialState: {
        categories: [] as Category[],
        products: [] as Product[],
        orders: [] as any[],
        loading: true,
        error: null as string | null,
    },
    reducers: {
        load: (state, action) => {
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
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
    },
});

export const { load, setLoading, setError } = dataSlice.actions;

export const store = configureStore({
    reducer: {
        data: dataSlice.reducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
