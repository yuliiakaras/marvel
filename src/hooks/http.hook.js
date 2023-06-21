import { useState, useCallback } from "react";

export const useHttp = () => {

    const [currentProcess, setCurrentProcess] = useState('waiting');

    const request = useCallback (async (url, method = 'GET', body = null, headers = {'Content-Type' : 'application/json'}) => {

        setCurrentProcess('loading');
        try {
            const response = await fetch(url, {method, body, headers});

            if(!response.ok) {
                throw new Error(`Couldn't fetch ${url}, status: ${response.status}`);
            }

            const data = await response.json();

            return data;

        } catch (error) {
            setCurrentProcess('error');
            throw error;
        }

    }, [])

    const clearError = useCallback(() => {
        setCurrentProcess('loading');
    }, []);
    return {request, clearError, currentProcess, setCurrentProcess};
}