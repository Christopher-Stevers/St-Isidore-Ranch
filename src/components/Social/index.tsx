import Link from "next/link";

export type SocialType = {
  name: string;
  link: string;
  SocialIcon: React.FC<{ className: string }>;
};

const Social = ({ link, name, SocialIcon }: SocialType) => {
  return (
    <Link
      key={name}
      href={link}
      className="flex h-10 w-full content-center items-center gap-2 "
    >
      <SocialIcon className=" h-10 h-full fill-backdrop-500" />
    </Link>
  );
};

export default Social;
