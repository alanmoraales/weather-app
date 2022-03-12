import { useState, useEffect } from "react";

interface IUseFetch<T> {
  initialData: T;
  fetcher: () => Promise<T>;
  dependencies?: ReadonlyArray<unknown>;
  shouldFetch?: boolean;
}

const useFetch = <T>({
  initialData,
  fetcher,
  dependencies = [],
  shouldFetch = true,
}: IUseFetch<T>) => {
  const [data, setData] = useState<T>(initialData);
  const [isFetching, setIsFetching] = useState(false);
  const [hasError, setHasError] = useState(false);

  const fetchData = async () => {
    try {
      setIsFetching(true);
      const fetchedData = await fetcher();
      setData(fetchedData);
      setHasError(false);
    } catch (error) {
      setHasError(true);
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    if (shouldFetch) {
      fetchData();
    }
  }, [...dependencies]);

  return {
    data,
    isFetching,
    hasError,
    fetchData,
  };
};

export default useFetch;
