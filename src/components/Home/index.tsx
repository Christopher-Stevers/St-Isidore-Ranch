import LayoutMain from "./AboutCard/Layout";
import AboutCard from "./AboutCard";
import cardContent from "./cardContent";
import TranslateAndFade from "~/components/shared/TranslateAndFade";

const HomePage = () => {
  return (
    <LayoutMain>
      <div id="about"></div>
      {cardContent.map((props, index) => {
        const { title, text, link, video, src } = props;
        const direction =
          index % 2 === 0 ? "left" : "right";
        return (
          <TranslateAndFade direction={direction}>
            <AboutCard
              key={title}
              direction={direction}
              title={title}
              text={text}
              link={link}
              video={video}
              src={src}
            />
          </TranslateAndFade>
        );
      })}
    </LayoutMain>
  );
};

export default HomePage;
