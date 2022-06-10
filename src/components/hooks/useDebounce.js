import React, { useEffect, useState } from 'react';

const useDebounce = (value, delay = 500) => {
  const [debounce, setDebounce] = useState(value);
  useEffect(() => {
    const handleDebounce = setTimeout(() => {
      setDebounce(value);
    }, delay);
    return () => {
      clearTimeout(handleDebounce);
    };
  }, [value]);

  return debounce;
};

export default useDebounce;
