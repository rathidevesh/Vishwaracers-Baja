import React, { useEffect, useRef } from 'react';

function ScrollAnimation({ children, animationClass }) {
  const divRef = useRef(null);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5,
    };

    const handleIntersection = (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          divRef.current.classList.add(animationClass);
          observer.unobserve(entry.target);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, options);
    observer.observe(divRef.current);

    return () => {
      observer.disconnect();
    };
  }, [animationClass]);

  return <div ref={divRef}>{children}</div>;
}

export default ScrollAnimation;
