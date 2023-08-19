type Box = {
  title: string;
  totalPrice: number;
  src: string;
  boxSize: number;
  items: Item[];
};
export type Item = {
  quantity: number;
  name: string;
};

class BarbecueBox implements Box {
  totalPrice: number;
  title: string;
  src: string;
  boxSize: number;
  items: Item[];
  constructor() {
    this.title = "Barbecue Box";
    this.totalPrice = 150;
    this.src = "/barbecue_box.jpg";
    this.boxSize = 0;
    this.items = [
      { quantity: 8, name: "Hamburger Patties" },
      {
        quantity: 4,
        name: "T-Bone Steaks",
      },
      {
        quantity: 4,
        name: "Sirloin Steaks",
      },
      {
        quantity: 4,
        name: "Wing Steaks",
      },
    ];
  }
}
class SamplerBox implements Box {
  totalPrice: number;
  title: string;
  src: string;
  boxSize: number;
  items: Item[];
  constructor() {
    this.title = "Sampler Box";
    this.totalPrice = 100;
    this.src = "/sampler_box.jpg";
    this.boxSize = 0;
    this.items = [
      { quantity: 2, name: "Sirloin Steaks" },
      {
        quantity: 1,
        name: "Blade Roast",
      },
      {
        quantity: 2,
        name: "Ground Beef (1lb packages)",
      },
      {
        quantity: 4,
        name: "Hamburger Patties",
      },
    ];
  }
}
class GroundBeefBox implements Box {
  totalPrice: number;
  src: string;
  title: string;
  boxSize: number;
  items: Item[];
  constructor() {
    this.totalPrice = 300;
    this.title = "Ground Beef Box";
    this.boxSize = 0;
    this.src = "/ground_beef_box.jpg";
    this.items = [
      { quantity: 30, name: "Ground Beef (1lb packages)" },
    ];
  }
}
class DeluxeBox implements Box {
  title: string;
  totalPrice: number;
  src: string;
  boxSize: number;
  items: Item[];
  constructor() {
    this.title = "Deluxe Box";
    this.totalPrice = 300;
    this.boxSize = 0;
    this.src = "/deluxe_box.jpg";

    this.items = [
      {
        quantity: 2,
        name: "Prime Rib Roast",
      },
      {
        quantity: 4,
        name: "Fillet Steak",
      },
      {
        quantity: 4,
        name: "Porterhouse Steak",
      },
    ];
  }
}

class FamilyBox implements Box {
  title: string;
  totalPrice: number;
  boxSize: number;
  items: Item[];
  orderId: string;
  src: string;
  constructor() {
    this.title = "Family Box";
    this.totalPrice = 300;
    this.boxSize = 0;
    this.src = "/family_box.jpg";
    this.items = [
      { quantity: 4, name: "Sirloin Steaks" },
      {
        quantity: 2,
        name: "Blade Roast",
      },
      {
        quantity: 4,
        name: "Ground Beef (1lb packages)",
      },
      {
        quantity: 8,
        name: "Hamburger Patties",
      },
    ];
    this.orderId = "1";
  }
}

export const getBoxFromClass = (title: string) => {
  switch (title) {
    case "Ground Beef Box":
      return new GroundBeefBox();
    case "Deluxe Box":
      return new DeluxeBox();
    case "Family Box":
      return new FamilyBox();
    case "Barbeque Box":
      return new BarbecueBox();
    case "Sample Box":
      return new SamplerBox();
    default:
      throw new Error("Invalid box title");
  }
};

export const createdBoxes = [
  new GroundBeefBox(),
  new DeluxeBox(),
  new FamilyBox(),
  new BarbecueBox(),
  new SamplerBox(),
];
