import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useFetch } from '../../hook/useFetch';
import { load, setLoading, setError } from '../../store/store';

const API_URL = 'http://localhost:3001';

export default function DataLoader() {
    const dispatch = useDispatch();

    const { data: products, loading: loadingProd, error: errProd } = useFetch(
        `${API_URL}/products`
    );
    const { data: categories, loading: loadingCat, error: errCat } = useFetch(
        `${API_URL}/categories`
    );

    useEffect(() => {
        if (products) dispatch(load({ products }));
    }, [products, dispatch]);

    useEffect(() => {
        if (categories) dispatch(load({ categories }));
    }, [categories, dispatch]);

    useEffect(() => {
        dispatch(setLoading(loadingProd || loadingCat));
    }, [loadingProd, loadingCat, dispatch]);

    useEffect(() => {
        const err = errProd || errCat;
        if (err) dispatch(setError(err));
    }, [errProd, errCat, dispatch]);

    return null;
}