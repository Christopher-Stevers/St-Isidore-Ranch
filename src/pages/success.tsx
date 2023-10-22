import LayoutShared from "~/components/shared/LayoutShared";
import Image from "next/image";
import Link from "next/link";

const Success = () => {
  return (
    <div>
      <LayoutShared title="Thank you!">
        <div className=" w-full  px-4  lg:px-32">
          <div className="flex flex-wrap items-center justify-center gap-x-32 md:flex-nowrap">
            <div>
              <h2 className=" py-4 font-display text-4xl">
                Thanks for you Purchase!
              </h2>
              <div className="max-w-xl py-4 text-xl">
                You will recieve email confirmation of your
                order within one business day, and you order
                will be shipped within seven business days.
                Any issues with your order? Please call me
                at 519-703-6780.
              </div>
            </div>
            <Link
              className="aspect-square max-w-fit flex-1"
              href="/"
            >
              <Image
                src="/logo_transparent.png"
                alt="picture of a box"
                width={320}
                height={320}
              />
            </Link>
          </div>
        </div>
      </LayoutShared>
    </div>
  );
};
export default Success;
