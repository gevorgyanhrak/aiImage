import { Link } from 'react-router';
import { TEST_IDS } from './constants/testIds';
import { Button } from '../ui/button';

type CardLinkProps = {
  href: string;
  title: string;
};

const CardLink = ({ href, title }: CardLinkProps) => {
  return (
    <Link to={href} className="flex items-center" aria-label={`Visit ${title} now`} data-testid={TEST_IDS.CARD_LINK}>
      <Button variant="link" className="p-0">
        <span>Visit now</span>
        <span>→</span>
      </Button>
    </Link>
  );
};

export default CardLink;
