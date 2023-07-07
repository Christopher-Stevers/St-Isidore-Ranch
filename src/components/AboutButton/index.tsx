import FancyButton, {
  type ButtonProps,
} from "../FancyButton";

const AboutButton = ({
  text,
  link,
  className,
}: ButtonProps) => {
  return (
    <FancyButton
      text={text}
      link={link}
      className={`${className} p-4`}
    />
  );
};
export default AboutButton;
