import { useEffect, useState } from "react";

export function useLocalStorage(
  key: string,
  initialValue: string
): [string, (value: string) => void] {
  if (typeof window !== "undefined") {
    initialValue = localStorage.getItem(key) ?? initialValue;
  }
  const [storedValue, setStoredValue] = useState(initialValue);

  useEffect(() => {
    if (storedValue) {
      localStorage.setItem(key, storedValue);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
}
