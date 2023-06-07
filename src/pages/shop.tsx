import { useState } from "react";
import LayoutSecondary from "~/layouts/layoutSecondary";
import ProductCard from "~/components/ProductCard";

export default function Page() {
  const [search, setSearch] = useState("");
  const handleSearch = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setSearch(e.target.value);
  };
  const productCardsProps = [
    {
      title: "Barbecue Box",
      src: "/grilling_box.jpg",
      price: 150,
      contents: [
        {
          id: "id",

          quantity: 8,
          productClass: "Hamburger Patties",
          productClassId: "prckID",
        },

        {
          id: "iddidnt",

          quantity: 4,
          productClass: "T-Bone Steaks",
          productClassId: "steackId",
        },
        {
          id: "iddidnt",

          quantity: 4,
          productClass: "Sirloin Steaks",
          productClassId: "steackId",
        },
        {
          id: "iddidnt",

          quantity: 4,
          productClass: "Wing Steaks",
          productClassId: "steackId",
        },
      ],
    },
    {
      title: "Family Box",
      src: "/family_box.jpg",
      price: 180,
      contents: [
        {
          id: "id",

          quantity: 4,
          productClass: "Sirloin Steaks",
          productClassId: "prckID",
          src: "/meat.jpg",
        },

        {
          id: "iddidnt",

          quantity: 2,
          productClass: "Blade Roast",
          productClassId: "steackId",
        },
        {
          id: "iddidnt",

          quantity: 4,
          productClass: "Ground Beef (1lb packages)",
          productClassId: "steackId",
        },
        {
          id: "iddidnt",

          quantity: 8,
          productClass: "Hamburger Patties",
          productClassId: "steackId",
        },
      ],
    },

    {
      title: "Sampler Box",
      src: "/sampler_beef.jpg",
      price: 100,
      contents: [
        {
          id: "id",

          quantity: 2,
          productClass: "Sirloin Steaks",
          productClassId: "prckID",
          src: "/meat.jpg",
        },

        {
          id: "iddidnt",

          quantity: 1,
          productClass: "Blade Roast",
          productClassId: "steackId",
        },
        {
          id: "iddidnt",

          quantity: 2,
          productClass: "Ground Beef (1lb packages)",
          productClassId: "steackId",
        },
        {
          id: "iddidnt",

          quantity: 4,
          productClass: "Hamburger Patties",
          productClassId: "steackId",
        },
      ],
    },

    {
      title: "Deluxe Box",
      src: "/deluxe_box.jpg",
      price: 440,
      contents: [
        {
          id: "id",

          quantity: 2,
          productClass: "Prime Rib Roast",
          productClassId: "prckID",
          src: "/deluxe_box.jpg",
        },

        {
          id: "iddidnt",

          quantity: 4,
          productClass: "Fillet Steak",
          productClassId: "steackId",
        },
        {
          id: "iddidnt",

          quantity: 4,
          productClass: "Porterhouse Steak",
          productClassId: "steackId",
        },
      ],
    },
    {
      title: "Ground Beef Box",
      src: "/ground_beef.jpg",
      price: 120,
      contents: [
        {
          id: "id",

          quantity: 10,
          productClass: "Ground Beef (1lb packages)",
          productClassId: "prckID",
          src: "/ground_beef.jpg",
        },

        {
          id: "iddidnt",

          quantity: 4,
          productClass: "Hamburger Patties",
          productClassId: "steackId",
        },
      ],
    },
  ];
  return (
    <LayoutSecondary>
      <div className="w-full justify-self-start p-12 lg:col-span-2 xl:col-span-3">
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
          const isContentsMatch = elem.contents
            .map((elem) => elem.productClass)
            .join(" ")
            .toLowerCase()
            .includes(search.toLowerCase());
          return isTitleMatch || isContentsMatch;
        })
        .map((props) => {
          const { title, contents, src, price } = props;
          return (
            <ProductCard
              key={title}
              price={price}
              title={title}
              src={src}
              contents={contents}
            />
          );
        })}
    </LayoutSecondary>
  );
}
