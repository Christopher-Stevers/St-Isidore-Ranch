import LayoutSecondary from "~/layouts/layoutSecondary";
import ProductCard from "~/components/ProductCard";

export default function Page() {
  const loremIpsum = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl nec aliquam aliquam, nunc nisl aliquet nisl, eget aliquam nunc justo eget nisl. N`;
  const defaultProps = {
    title: "Title",
    text: loremIpsum,
    src: "/meat.png",
    video: "https://www.youtube.com/embed/lIkwIEXWx8c",
  };


  const productCardsProps = [

    {
      title: "Family Box",
      src: "/meat.png",
      contents: [
        {

          id: "id",

          quantity: 4,
          productClass: "Porck Chops",
          productClassId: "prckID",
          src: "/meat.png"
        },

        {

          id: "iddidnt",

          quantity: 4,
          productClass: "Steaj Chops",
          productClassId: "steackId"
        }
      ]

    }
  ]
  return (
    <LayoutSecondary>
      <div className="p-12 lg:col-span-2 xl:col-span-3 justify-self-start w-full">
        <input defaultValue="search" className="w-full text-lg p-2 border border-black rounded-full" />
      </div>
      {productCardsProps.map((props, index) => {
        const { title, contents, src } = props;
        return (
          <ProductCard
            key={title}
            title={title}
            src={src}
            contents={contents}
          />
        );
      })}
    </LayoutSecondary>
  );
}
