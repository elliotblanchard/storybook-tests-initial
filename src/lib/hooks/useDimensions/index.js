import { useEffect, useState } from 'react';

const useDimensions = () => {
  if (typeof window === 'undefined') {
    return {};
  }
  const [width, setWidth] = useState(window.innerWidth * (window.visualViewport?.scale || 1));
  const [height, setHeight] = useState(window.innerHeight * (window.visualViewport?.scale || 1));

  useEffect(() => {
    const onResize = () => {
      window.requestAnimationFrame(() => {
        setWidth(window.innerWidth * (window.visualViewport?.scale || 1));
        setHeight(window.innerHeight * (window.visualViewport?.scale || 1));
      });
    };

    window.addEventListener('resize', onResize, false);

    return () => {
      window.removeEventListener('resize', onResize);
    };
  });

  return { height, width };
}

export default useDimensions;
