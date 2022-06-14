import React, { useEffect, useState } from 'react';

//debounce
export const useDebounce = (value, delay = 500) => {
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

//formatDate
export const useFormatDate = (time) => {
  let newTime = Number(time);
  const Now = Date.now();
  let timeStamp = (Now - newTime) / 1000;

  if (timeStamp > 86400 * 12 * 10) {
    const createDay = new Date(newTime);
    return `${createDay.getDate()}/${
      createDay.getMonth() + 1
    }/${createDay.getFullYear()}`;
  } else if (timeStamp > 86400 * 12) {
    const year = Math.floor((timeStamp / 86400) * 12);
    return `Hơn ${year} năm `;
  } else if (timeStamp > 86400) {
    const month = Math.floor(timeStamp / 86400);
    return `Hơn ${month} tháng `;
  } else if (timeStamp > 3600) {
    const day = Math.floor(timeStamp / 3600);
    return `Hơn ${day} ngày `;
  } else if (timeStamp > 60) {
    const min = Math.floor(timeStamp / 60);
    return `Hơn ${min} phút `;
  } else {
    return `Vài giây trước`;
  }
};

//WindowSize
export const useWindowSize = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return windowWidth;
};
