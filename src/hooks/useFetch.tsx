import { useEffect, useState } from "react";

const useFetch = (url: string) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const abortController = new AbortController();

    fetch(url, {signal: abortController.signal})
      .then((res) => {
        if (res.ok) return res.json();
        throw Error("could not fetch the data for that resource");
      })
      .then((data) => {
        setData(data);
        setIsLoading(false);
        setError(null);
      })
      .catch((err) => {
        if(err.name === "AbortError")return;
        setError(err.message);
        setIsLoading(false);
      });
      // will pause fetch when we navigate away and wont' update state
      return ()=> abortController.abort();
  }, [url]);

  return { isLoading, error, data };
};

export default useFetch;
