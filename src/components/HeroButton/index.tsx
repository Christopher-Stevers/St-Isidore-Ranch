import FancyButton, { type ButtonProps } from "../FancyButton";

const HeroButton = ({ text, link, className }: ButtonProps) => {
  return (
    <FancyButton
      text={text}
      link={link}
      className={`${className} h-24 w-60 text-3xl`}
    />
  );
};

export default HeroButton;
