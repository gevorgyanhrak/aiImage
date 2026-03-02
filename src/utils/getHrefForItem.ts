const getRedirectionUrl = ({ category, itemSlug }: { category?: string; itemSlug?: string }) => {
  const pathname: string[] = [];
  if (category) pathname.push(category);
  if (itemSlug) pathname.push(itemSlug);
  return `/${pathname.join('/')}`;
};

export default getRedirectionUrl;
