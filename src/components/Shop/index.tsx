import React, { useState } from "react";
import { BoxGroups } from "~/utils/boxManagement";
import LayoutShared from "~/components/shared/LayoutShared";
import ProductCard from "./ProductCard";
import Search from "./Search";
const Shop = () => {
  const [roastChecked, setRoastChecked] = useState(false);
  const [steakChecked, setSteakChecked] = useState(false);
  const [groundChecked, setGroundChecked] = useState(false);
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
    const searchableString = searchableStrings
      .join(" ")
      .toLowerCase();
    const isMatchText = searchableString.includes(
      search.toLowerCase(),
    );
    const isMatchCategory =
      (roastChecked &&
        searchableString.includes("roast")) ||
      (steakChecked &&
        searchableString.includes("steak") &&
        !searchableString.includes("oven")) ||
      (groundChecked &&
        searchableString.includes("ground")) ||
      (!roastChecked && !steakChecked && !groundChecked);
    return isMatchText && isMatchCategory;
  }).sort((a, b) => {
    const aName = a.name.toLowerCase();
    const bName = b.name.toLowerCase();
    if (groundChecked) {
      const firstFirst =
        aName.includes("ground") &&
        !bName.includes("ground");
      return firstFirst ? -1 : 1;
    }
    const aHas = aName.includes(search.toLowerCase());
    const bHas = bName.includes(search.toLowerCase());
    if (aHas && !bHas) return 1;
    if (!aHas && bHas) return -1;

    return 1;
  });
  const handleRoastChange = () => {
    setRoastChecked(!roastChecked);
  };
  const handleSteakChange = () => {
    setSteakChecked(!steakChecked);
  };
  const handleGroundChange = () => {
    setGroundChecked(!groundChecked);
  };
  return (
    <LayoutShared title={"Shop"}>
      <div className="grid grid-cols-[320px] content-center justify-center justify-items-center gap-16 gap-y-4 pb-4 lg:grid-cols-[repeat(2,_320px)] xl:grid-cols-[repeat(3,_320px)] ">
        <Search searchState={[search, setSearch]} />
        <div className=" w-full bg-primary-500 px-4 font-bold text-white lg:col-span-2 xl:col-span-3">
          <div className=" flex flex-col justify-between py-4 lg:flex-row">
            <div className="flex gap-4">
              <label htmlFor="steaks">Steaks</label>
              <input
                className="accent-black"
                onChange={handleSteakChange}
                checked={steakChecked}
                type="checkbox"
                name="steaks"
                id="steaks"
              />
            </div>
            <div className="flex gap-4">
              <label htmlFor="roasts">Roasts</label>
              <input
                className="accent-black"
                onChange={handleRoastChange}
                checked={roastChecked}
                type="checkbox"
                name="roasts"
                id="roasts"
              />
            </div>
            <div className="flex gap-4">
              <label htmlFor="pork">Ground & Stewing</label>
              <input
                className="accent-black"
                onChange={handleGroundChange}
                checked={groundChecked}
                type="checkbox"
                name="pork"
                id="pork"
              />
            </div>
          </div>
        </div>
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
