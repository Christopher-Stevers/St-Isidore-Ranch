import React from "react";
import Image from "next/image";
import Link from "next/link";
import Instagram from "~/components/svg/socialLogos/Instagram";
import Discord from "~/components/svg/socialLogos/Discord";
import Facebook from "~/components/svg/socialLogos/Facebook";
import YouTube from "~/components/svg/socialLogos/Youtube";
import Twitter from "~/components/svg/socialLogos/Twitter";
import Social, { type SocialType } from "~/components/Social";

type WebsiteLink = {
  name: string;
  link: string;
};

const HeaderMain: React.FC = () => {
  const socials: SocialType[] = [
    {
      name: "Instagram",
      link: "https://www.instagram.com/chris.stevers/",
      SocialIcon: Instagram,
    },
    {
      name: "Facebook",
      link: "https://www.instagram.com/chris.stevers/",
      SocialIcon: Facebook,
    },
    {
      name: "YouTube",
      link: "https://www.instagram.com/chris.stevers/",
      SocialIcon: YouTube,
    },
    {
      name: "Twitter",
      link: "https://www.instagram.com/chris.stevers/",
      SocialIcon: Twitter,
    },
    {
      name: "Discord",
      link: "https://www.instagram.com/chris.stevers/",
      SocialIcon: Discord,
    },
  ];
  const websiteLinks: WebsiteLink[] = [
    {
      name: "Contact",
      link: "/contact",
    },
    {
      name: "Shop",
      link: "/shop",
    },
    {
      name: "Checkout",
      link: "/checkout",
    },
  ];
  return (
    <>
      <footer className="center grid w-full grid-cols-[360px_360px] content-center  items-center justify-center gap-y-8 gap-x-2 bg-primary-500 px-32 py-8 text-backdrop-500">
        <div className="flex flex-col gap-2 self-start">
          {websiteLinks.map((link: WebsiteLink) => {
            return (
              <Link
                key={`website-link-link`}
                className="text-2xl font-semibold hover:underline"
                href={link.link}
              >
                {link.name}
              </Link>
            );
          })}
        </div>
        <div className="flex flex-col gap-2">
          {socials.map((social: SocialType) => {
            return (
              <Social
                link={social.link}
                SocialIcon={social.SocialIcon}
                name={social.name}
              />
            );
          })}
        </div>
        <div className="col-span-2 flex content-center items-center justify-center gap-2 self-center">
          Made in{" "}
          <Image
            className="h-4 w-4"
            width="16"
            height="16"
            alt="canada emoji"
            src="/canada.png"
          />
          by{" "}
          <Link
            href="https://devstevers.com"
            className="font-semibold underline"
          >
            CStevers Development{" "}
          </Link>
        </div>
      </footer>
    </>
  );
};
export default HeaderMain;
