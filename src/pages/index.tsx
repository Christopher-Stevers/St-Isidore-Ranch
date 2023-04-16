import LayoutMain from "~/layouts/layoutMain";
import AboutCard from "~/components/AboutCard";

export default function Page() {
  const loremIpsum = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl nec aliquam aliquam, nunc nisl aliquet nisl, eget aliquam nunc justo eget nisl. N`;
  const defaultProps = {
    direction: "left",
    title: "Title",
    text: loremIpsum,
    link: "/about",
    video: "https://www.youtube.com/embed/lIkwIEXWx8c",
  };

  const aboutCardsProps = [defaultProps, defaultProps, defaultProps];

  return (
    <LayoutMain>
      {aboutCardsProps.map((props, index) => {
        const { title, text, link, video } = props;
        const direction = index % 2 === 0 ? "left" : "right";
        return (
          <AboutCard
            key={title}
            direction={direction}
            title={title}
            text={text}
            link={link}
            video={video}
          />
        );
      })}
    </LayoutMain>
  );
}
