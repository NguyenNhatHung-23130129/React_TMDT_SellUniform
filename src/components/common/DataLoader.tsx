import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useFetch } from '../../hook/useFetch';
import { load, setLoading, setError } from '../../store/store';
import { API_URL } from '../../config/api';

export default function DataLoader() {
    const dispatch = useDispatch();

    const { data: products, loading: loadingProd, error: errProd } = useFetch(`${API_URL}/products`);
    const { data: categories, loading: loadingCat, error: errCat } = useFetch(`${API_URL}/categories`);

     useEffect(() => {
        if (products) dispatch(load({ products } as any));
    }, [products, dispatch]);

    useEffect(() => {
        if (categories) dispatch(load({ categories } as any));
    }, [categories, dispatch]);


    useEffect(() => {
        dispatch(setLoading((loadingProd || loadingCat) as any));
    }, [loadingProd, loadingCat, dispatch]);

    useEffect(() => {
        const err = errProd || errCat;
        if (err) dispatch(setError(err as any));
    }, [errProd, errCat, dispatch]);

    return null;
}