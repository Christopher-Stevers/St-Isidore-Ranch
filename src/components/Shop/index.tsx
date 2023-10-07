import React, { useState } from "react";
import { BoxGroups } from "~/utils/boxManagement";
import LayoutShared from "~/components/shared/LayoutShared";
import ProductCard from "./ProductCard";
import Search from "./Search";
const Shop = () => {
  const [search, setSearch] = useState("");
  const searchedBoxGroups = BoxGroups.filter((elem) => {
    const groupName = elem.name;
    const childBoxesNames = elem.Boxes.map(
      (elem) => elem.title,
    );
    const childProductsNames = elem.Boxes.map((elem) =>
      elem.items.map((elem) => elem.name),
    ).flat();
    const searchableStrings = [
      groupName,
      ...childBoxesNames,
      ...childProductsNames,
    ];
    const isMatch = searchableStrings
      .join(" ")
      .toLowerCase()
      .includes(search.toLowerCase());
    return isMatch;
  });
  console.log(searchedBoxGroups, "searchedBoxGroups");
  return (
    <LayoutShared title={"Shop"}>
      <div className="grid grid-cols-[320px] content-center justify-center justify-items-center gap-16 lg:grid-cols-[repeat(2,_320px)] xl:grid-cols-[repeat(3,_320px)] ">
        <Search searchState={[search, setSearch]} />
      </div>
      <div className="grid grid-cols-[320px] content-center justify-center justify-items-center gap-16 lg:grid-cols-[repeat(2,_320px)] xl:grid-cols-[repeat(3,_320px)] ">
        {searchedBoxGroups.map((boxGroup) => {
          return (
            <ProductCard
              key={boxGroup.name}
              boxGroup={boxGroup}
            />
          );
        })}
        <ProductCard />
      </div>
    </LayoutShared>
  );
};

export default Shop;
