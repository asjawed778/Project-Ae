import { useState, useEffect } from "react";

const useDebouncing = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Cleanup the timeout on every render
    return () => {
      clearTimeout(handler);
    };
  }, [value]);

  return debouncedValue;
};

export default useDebouncing;
