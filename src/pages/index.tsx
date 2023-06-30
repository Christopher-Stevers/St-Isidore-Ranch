import LayoutMain from "~/layouts/layoutMain";
import AboutCard from "~/components/AboutCard";

export default function Page() {
  const loremIpsum = `Our cattle are 100% grassfed. The cows care for their calves for the first 6 months of their lives. After that, they are fed a diet of pasture, baleage(fermented forages) and hay. We use no hormones or antibiotics. We believe that the best way to raise a cow is to let it live a happy life.`;
  const defaultProps = {
    direction: "left",
    title: "Our Cows",
    text: loremIpsum,
    link: "",
    video: "https://www.youtube.com/embed/lIkwIEXWx8c",
    src: "/mangerCows.jpg",
  };
  const defaultProps1 = {
    direction: "left",
    title: "Our Beef",
    text: "To guarantee top-notch quality, we uphold rigorous standards of health and animal welfare throughout our operations. After our animals have reached maturity, they are processed by a provincially licensed butcher. Finally, we deliver the beef right to your doorstep using a refrigerated courier service.",
    link: "",
    video: "https://www.youtube.com/embed/lIkwIEXWx8c",
    src: "/vacuumSteak.avif",
  };
  const defaultProps2 = {
    direction: "left",
    title: "Our Vision",
    text: "We are believe that grassfed beef should be an integral part of any sustainable farm. When you recieve a box of our meat, you can be sure that your purchase supports the future of food and the environment.",
    link: "https://www.youtube.com/watch?v=jAuQybTleQE",
    video: "https://www.youtube.com/embed/jAuQybTleQE",
  };

  const aboutCardsProps = [
    defaultProps,
    defaultProps1,
    defaultProps2,
  ];

  return (
    <LayoutMain>
      {aboutCardsProps.map((props, index) => {
        const { title, text, link, video, src } = props;
        const direction =
          index % 2 === 0 ? "left" : "right";
        return (
          <AboutCard
            key={title}
            direction={direction}
            title={title}
            text={text}
            link={link}
            video={video}
            src={src}
          />
        );
      })}
    </LayoutMain>
  );
}
