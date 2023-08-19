import React, { useState } from "react";
import { createdBoxes } from "~/utils/boxManagement";
import LayoutShared from "~/components/shared/LayoutShared";
import ProductCard from "./ProductCard";
import Search from "./Search";
const Shop = () => {
  const [search, setSearch] = useState("");
  const searchedBoxes = createdBoxes.filter((elem) => {
    const isTitleMatch = elem.title
      .toLowerCase()
      .includes(search.toLowerCase());
    const isContentsMatch = elem.items
      .map((elem) => elem.name)
      .join(" ")
      .toLowerCase()
      .includes(search.toLowerCase());
    return isTitleMatch || isContentsMatch;
  });
  return (
    <LayoutShared title={"Shop"}>
      <div className="grid grid-cols-[320px] content-center justify-center justify-items-center gap-16 lg:grid-cols-[repeat(2,_320px)] xl:grid-cols-[repeat(3,_320px)] ">
        <Search searchState={[search, setSearch]} />
        {searchedBoxes.map((props) => {
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
      </div>
    </LayoutShared>
  );
};

export default Shop;
