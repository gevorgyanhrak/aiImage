import type { HTMLAttributes } from 'react';

type HeadingTag = 'h1' | 'h2' | 'h3' | 'p';

type SectionTextProps = {
  as: HeadingTag;
  text: string;
  className?: string;
} & HTMLAttributes<HTMLHeadingElement>;

const SectionText = ({ as, text, className, ...rest }: SectionTextProps) => {
  const Component = as;

  return (
    <Component className={className} {...rest}>
      {text}
    </Component>
  );
};

export default SectionText;
