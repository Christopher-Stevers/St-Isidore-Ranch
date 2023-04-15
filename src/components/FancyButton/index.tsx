import Link from "next/link";

export type ButtonProps = {
  text: string;
  link: string;
  className: string;
};

const HeroButton = ({ text, link, className }: ButtonProps) => {
  return (
    <Link
      className={`flex items-center justify-center font-sans font-bold ${className}`}
      href={link}
    >
      {text}
    </Link>
  );
};

export default HeroButton;
