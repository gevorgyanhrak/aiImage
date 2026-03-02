import { useEffect } from 'react';

const FullstoryScript = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = '/scripts/fullstory.js';
    script.async = true;
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return null;
};

export default FullstoryScript;
