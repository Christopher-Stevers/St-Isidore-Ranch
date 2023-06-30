import { useState } from "react";
import LayoutSecondary from "~/layouts/LayoutSecondary";
import ProductCard from "~/components/ProductCard";
import {
  BarbecueBox,
  DeluxeBox,
  FamilyBox,
  GroundBeefBox,
  SamplerBox,
} from "~/utils/boxTemplates";

export default function Page() {
  const [search, setSearch] = useState("");
  const handleSearch = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setSearch(e.target.value);
  };
  const productCardsProps = [
    new FamilyBox(),
    new BarbecueBox(),
    new DeluxeBox(),
    new GroundBeefBox(),
    new SamplerBox(),
  ];
  return (
    <LayoutSecondary title={"Products"}>
      <div className="w-full justify-self-start py-12 lg:col-span-2 xl:col-span-3">
        <input
          onChange={handleSearch}
          defaultValue="search"
          className="w-full rounded-full border border-black p-2 px-4 text-lg"
        />
      </div>
      {productCardsProps
        .filter((elem) => {
          const isTitleMatch = elem.title
            .toLowerCase()
            .includes(search.toLowerCase());
          const isContentsMatch = elem.items
            .map((elem) => elem.name)
            .join(" ")
            .toLowerCase()
            .includes(search.toLowerCase());
          return isTitleMatch || isContentsMatch;
        })
        .map((props) => {
          const { title, items, src, totalPrice } = props;
          return (
            <ProductCard
              key={title}
              totalPrice={totalPrice}
              title={title}
              src={src}
              items={items}
            />
          );
        })}
      <ProductCard
        key={"Call me"}
        totalPrice={0}
        title={"Custom Box"}
        src={"/telephone.jpg"}
        items={[]}
      />
    </LayoutSecondary>
  );
}
