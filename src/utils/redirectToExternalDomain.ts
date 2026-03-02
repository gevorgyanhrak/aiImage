type Params = {
  href: string;
  target: '_blank' | '_self';
};

const redirectToExternalDomain = ({ href, target = '_self' }: Params) => {
  const link = document.createElement('a');
  link.href = href;
  link.target = target;
  link.click();
  link.remove();
};

export default redirectToExternalDomain;
