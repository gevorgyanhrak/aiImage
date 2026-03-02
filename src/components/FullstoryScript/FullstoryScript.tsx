import Script from 'next/script';

const FullstoryScript = () => {
  return <Script src="/scripts/fullstory.js" strategy="lazyOnload" />;
};

export default FullstoryScript;
