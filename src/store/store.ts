import { configureStore, createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { mockProducts, categories } from '../data/mockProducts';

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

export const fetchProducts = createAsyncThunk<Product[]>('products/fetch', async () => {
    return new Promise<Product[]>((resolve) => setTimeout(() => resolve(mockProducts as Product[]), 300));
});

const productsSlice = createSlice({
    name: 'products',
    initialState: { items: [] as Product[], status: 'idle' as 'idle' | 'loading' | 'succeeded' | 'failed' },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => { state.status = 'loading'; })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.items = action.payload;
                state.status = 'succeeded';
            })
            .addCase(fetchProducts.rejected, (state) => { state.status = 'failed'; });
    }
});

export const fetchAllData = createAsyncThunk('data/fetchAll', async () => {
    return new Promise<{ categories: typeof categories; products: Product[] }>((resolve) =>
        setTimeout(() => resolve({ categories, products: mockProducts as Product[] }), 300)
    );
});

const dataSlice = createSlice({
    name: 'data',
    initialState: { categories: [] as typeof categories, products: [] as Product[], status: 'idle' as 'idle' | 'loading' | 'succeeded' | 'failed' },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllData.pending, (state) => { state.status = 'loading'; })
            .addCase(fetchAllData.fulfilled, (state, action) => {
                state.categories = action.payload.categories;
                state.products = action.payload.products;
                state.status = 'succeeded';
            })
            .addCase(fetchAllData.rejected, (state) => { state.status = 'failed'; });
    }
});

export const store = configureStore({ reducer: { products: productsSlice.reducer, data: dataSlice.reducer } });
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;