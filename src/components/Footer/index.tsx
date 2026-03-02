const footerLinks = [
  { label: 'Terms of Use', href: '#', target: '_blank' },
  { label: 'Privacy Policy', href: '#', target: '_blank' },
  { label: 'Do Not Sell', href: '#', target: '_blank' },
  { label: 'Internet-Based Advertising', href: '#', target: '_blank' },
  { label: 'Community Guidelines', href: '#', target: '_blank' },
  { label: 'DMCA', href: '#', target: '_blank' },
  { label: 'Security Policy', href: '#', target: '_blank' },
  { label: 'Accessibility', href: '#', target: '_blank' },
];

const Footer = () => {
  return (
    <footer data-pulse-section="footer" data-pulse-group="footer" className="w-full py-10 gap-6 text-sm text-foreground font-hrakai bg-footer-background">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 px-6 text-center">
        <nav aria-label="Footer links">
          <ul className="flex flex-wrap justify-center gap-6">
            {footerLinks.map(({ label, href, target }) => (
              <li key={label}>
                <a
                  target={target}
                  className="inline-flex h-4 justify-center text-center font-hrakai text-sm font-medium leading-4 tracking-normal text-footer-text transition-colors hover:text-foreground"
                  href={href}
                  data-pulse-name={label}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <p className="text-xs text-footer-text md:text-sm">&copy; 2026 hrakAi</p>
      </div>
    </footer>
  );
};

export default Footer;
