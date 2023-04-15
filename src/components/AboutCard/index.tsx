import AboutButton from "../AboutButton";

const AboutCard = () => {
  return (
    <div className="grid max-w-[480px] grid-rows-[48px_auto_20px] gap-4">
      <h3 className="text-3xl font-semibold">The Grass-Fed Difference</h3>
      <p className="font-text text-xl">
        This is a simple hero unit, a simple jumbotron-style component for
        calling extra attention to featured content or information.
      </p>
      <AboutButton
        text="Learn More"
        link="/about"
        className="h-12 w-40 bg-primary-500 text-white"
      />
    </div>
  );
};

export default AboutCard;
