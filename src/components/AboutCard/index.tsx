import AboutButton from "../AboutButton";
export type AboutCardProps = {
  direction: "left" | "right";
  title: string;
  text: string;

  link: string;
  video: string;
};
const AboutCard = ({ direction, title, text, link, video }: AboutCardProps) => {
  const colStart = direction === "left" ? "col-start-1" : "col-start-2";

  return (
    <div className="grid grid-cols-[480px_480px] grid-rows-[48px_auto_48px] gap-x-16">
      <h3 className="text-3xl font-semibold">{title}</h3>
      <p className="font-text text-xl">{text} </p>
      <AboutButton
        text="Learn More"
        link={link}
        className="row-start-3 h-12 w-40 bg-primary-500 text-white"
      />
      <div className={`${colStart} row-start-1 row-end-4`}>
        <iframe
          width="480"
          height="279"
          src={video}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        ></iframe>
      </div>
    </div>
  );
};

export default AboutCard;
