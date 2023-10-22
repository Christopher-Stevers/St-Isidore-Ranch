import LayoutMain from "./AboutCard/Layout";
import AboutCard from "./AboutCard";
import cardContent from "./cardContent";
import TranslateAndFade from "~/components/shared/TranslateAndFade";

const HomePage = () => {
  return (
    <LayoutMain>
      {cardContent.map((props, index) => {
        const { title, text, link, video, src, btnText } =
          props;
        const direction =
          index % 2 === 0 ? "left" : "right";
        return (
          <TranslateAndFade
            key={index}
            direction={direction}
          >
            <AboutCard
              direction={direction}
              title={title}
              text={text}
              link={link}
              video={video}
              src={src}
              btnText={btnText}
            />
          </TranslateAndFade>
        );
      })}
    </LayoutMain>
  );
};

export default HomePage;
