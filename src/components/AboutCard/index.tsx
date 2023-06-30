import AboutButton from "../AboutButton";
import Image from "next/image";
export type AboutCardProps = {
  direction: "left" | "right";
  title: string;
  text: string;

  link: string;
  video: string;
};
const AboutCard = ({
  direction,
  title,
  text,
  link,
  video,
  src,
}: AboutCardProps) => {
  const colStart =
    direction === "left"
      ? "xl:col-start-1"
      : "xl:col-start-2";

  return (
    <div className="grid-rows grid w-80 grid-rows-[209px_48px_auto_48px] gap-x-16 gap-y-4 xl:w-full xl:w-min xl:grid-cols-[480px_480px] xl:grid-rows-[48px_auto_48px]">
      <h3 className="text-3xl font-semibold">{title}</h3>
      <p className="w-full font-text text-xl">{text} </p>
      <AboutButton
        text="Learn More"
        link={link}
        className="h-12 w-40 bg-primary-500 text-white xl:row-start-3"
      />
      <div
        className={`${colStart} row-start-1 xl:row-end-4`}
      >
        {src ? (
          <Image
            alt="some cows"
            className="h-[180px] w-[320px] xl:h-[270px] xl:w-[480px]"
            width="480"
            height="270"
            src={src}
          />
        ) : (
          <iframe
            className="h-[180px] w-[320px] xl:h-[270px] xl:w-[480px]"
            width="480"
            height="279"
            src={video}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          ></iframe>
        )}
      </div>
    </div>
  );
};

export default AboutCard;
