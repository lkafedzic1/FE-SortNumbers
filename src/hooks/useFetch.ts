import { useState } from "react";
import { DEFAULT_FETCH_OPTIONS } from "../api/config";

type UseFetchProps = {
  url: string; 
  method?: "GET" | "POST" | "PUT" | "DELETE";
};

type FetchParams = {
  input?: Record<string, unknown>;
  fetchOptions?: RequestInit;
};

export function useFetch<T>({ url, method = "GET" }: UseFetchProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);

  const commonFetch = async ({ input, fetchOptions = {} }: FetchParams): Promise<T | null> => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(url, {
        method,
        ...DEFAULT_FETCH_OPTIONS,
        ...fetchOptions,
        body: method === "POST" || method === "PUT" || method === "DELETE" ? JSON.stringify(input) : undefined,
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      const result = await response.json();
      setData(result);
      return result;
    } catch (error) {
      setError(error instanceof Error ? error.message : "An unknown error occurred");
      console.error("Fetch error:", error);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, data, error, commonFetch };
}
