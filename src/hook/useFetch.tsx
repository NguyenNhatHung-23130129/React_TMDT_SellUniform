import { useState, useEffect } from 'react';

export function useFetch(url: string) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {

        fetch(url)
            .then(res => res.json())
            .then(json => {
                setData(json);
                setLoading(false);

            })
            .catch(err=>{
                setData(null);
                setError(err.message|| "Lỗi API");

                }
            )

    }, [url]);

    return { data, loading, error };
}