import { useState, useEffect } from 'react';

export function useFetch(url: string) {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<any>(null);

    useEffect(() => {
        fetch(url)
            .then((res) => {
                if (!res.ok) throw new Error('Lỗi API');
                return res.json();
            })
            .then((json) => {
                setData(json);
                setLoading(false);
            })
            .catch((err) => {
                setData(null);
                setError(err?.message || 'Lỗi API');
                setLoading(false);
            });
    }, [url]);

    return { data, loading, error };
}