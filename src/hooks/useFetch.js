import {useState, useEffect} from 'react';

const useFetch = (url) => {
    const [data, setData] = useState(null);
    const [isPending, setIsPending] = useState(false);
    const [isError, setIsError] = useState(null);

    useEffect(() => {
        const controler = new AbortController()
        const fetchData = async () => {
            setIsPending(true)

            try {
                const response = await fetch(url, {signal: controler.signal});
                console.log(response);

                if(!response.ok) {
                throw new Error(response.statusText);
                }

                const json = await response.json();

                setIsPending(false);
                setData(json);
                setIsError(null);
            }

            catch(err) {
                if(err.name == "AbortError") {
                    console.log("the fetch was aborted");
                } else {
                    setIsPending(false)
                    setIsError("could not fetch data");
                    console.log(err.message);
                }
            }
        }
        fetchData();

        return () => {
            controler.abort();
        }

    }, [url]);
    return {data, isPending, isError}
}

export default useFetch;