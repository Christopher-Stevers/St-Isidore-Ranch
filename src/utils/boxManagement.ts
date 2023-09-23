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

class GrillingBundle implements Box {
  totalPrice: number;
  title: string;
  src: string;
  boxSize: number;
  items: Item[];
  constructor() {
    this.title = "Grilling Bundle";
    this.totalPrice = 150;
    this.src = "/barbecue_box.jpg";
    this.boxSize = 0;
    this.items = [
      { quantity: 4, name: "10 oz. Boneless Ribeye Steak" },
      {
        quantity: 4,
        name: "10 oz. NY Strip Steak",
      },
      {
        quantity: 2,
        name: "6 oz. Tenderloin Steak",
      },
      {
        quantity: 4,
        name: "8 oz. Sirloin Steak",
      },
      {
        quantity: 16,
        name: "1/4 lb. Hamburger Patties",
      },
    ];
  }
}
class SamplerBundle implements Box {
  totalPrice: number;
  title: string;
  src: string;
  boxSize: number;
  items: Item[];
  constructor() {
    this.title = "Sampler Bundle";
    this.totalPrice = 100;
    this.src = "/sampler_box.jpg";
    this.boxSize = 0;
    this.items = [
      {
        quantity: 2,
        name: "10 oz. NY Strip Steak",
      },
      {
        quantity: 4,
        name: "8 oz. Sirloin Steak",
      },
      {
        quantity: 2,
        name: "Bottom Round Steak ( 1 lb. )",
      },
      {
        quantity: 1,
        name: "Blade Roast ( 2 lb. )",
      },
      {
        quantity: 4,
        name: "Ground Beef ( 1 lb. )",
      },
      {
        quantity: 1,
        name: "Stewing Beef ( 1 lb. )",
      },
    ];
  }
}
class GroundBeefBoxSM implements Box {
  totalPrice: number;
  src: string;
  title: string;
  boxSize: number;
  items: Item[];
  constructor() {
    this.totalPrice = 300;
    this.title = "Small Ground Beef Bundle";
    this.boxSize = 0;
    this.src = "/ground_beef_box.jpg";
    this.items = [
      {
        quantity: 10,
        name: "Ground Beef ( 1 lb. )",
      },
    ];
  }
}
class GroundBeefBoxMD implements Box {
  totalPrice: number;
  src: string;
  title: string;
  boxSize: number;
  items: Item[];
  constructor() {
    this.totalPrice = 300;
    this.title = "Medium Ground Beef Bundle";
    this.boxSize = 0;
    this.src = "/ground_beef_box.jpg";
    this.items = [
      {
        quantity: 25,
        name: "Ground Beef ( 1 lb. )",
      },
    ];
  }
}
class GroundBeefBoxLG implements Box {
  totalPrice: number;
  src: string;
  title: string;
  boxSize: number;
  items: Item[];
  constructor() {
    this.totalPrice = 300;
    this.title = "Large Ground Beef Bundle";
    this.boxSize = 0;
    this.src = "/ground_beef_box.jpg";
    this.items = [
      {
        quantity: 40,
        name: "Ground Beef ( 1 lb. )",
      },
    ];
  }
}
class PremiumSteaksBox implements Box {
  title: string;
  totalPrice: number;
  src: string;
  boxSize: number;
  items: Item[];
  constructor() {
    this.title = "Premium Steaks Bundle";
    this.totalPrice = 300;
    this.boxSize = 0;
    this.src = "/deluxe_box.jpg";

    this.items = [
      { quantity: 6, name: "10 oz. Boneless Ribeye Steak" },
      { quantity: 6, name: "6 oz. Tenderloin Steak" },
      { quantity: 6, name: "8 oz. Sirloin Steak" },
    ];
  }
}

class OvenBundle implements Box {
  title: string;
  totalPrice: number;
  boxSize: number;
  items: Item[];
  orderId: string;
  src: string;
  constructor() {
    this.title = "Oven Bundle";
    this.totalPrice = 300;
    this.boxSize = 0;
    this.src = "/family_box.jpg";
    this.items = [
      { quantity: 2, name: "London Broil ( 1 lb. )" },
      {
        quantity: 2,
        name: "Blade Roast ( 2 lb. )",
      },
      {
        quantity: 2,
        name: "Chuck Roast ( 2 lb. )",
      },
      {
        quantity: 3,
        name: "Bone-In Short Ribs",
      },
    ];
    this.orderId = "1";
  }
}
class HamburgerPatties implements Box {
  title: string;
  totalPrice: number;
  boxSize: number;
  items: Item[];
  orderId: string;
  src: string;
  constructor() {
    this.title = "Hamburger Patties";
    this.totalPrice = 300;
    this.boxSize = 0;
    this.src = "/family_box.jpg";
    this.items = [{ quantity: 8, name: "1/4 patties" }];
    this.orderId = "1";
  }
}

class QuarterBeefBundle implements Box {
  title: string;
  totalPrice: number;
  boxSize: number;
  items: Item[];
  orderId: string;
  src: string;
  constructor() {
    this.title = "1/4 Beef";
    this.totalPrice = 300;
    this.boxSize = 0;
    this.src = "/family_box.jpg";
    this.items = [
      { quantity: 4, name: "10 oz. Boneless Ribeye Steak" },
      {
        quantity: 4,
        name: "10 oz. NY Strip Steak",
      },
      {
        quantity: 2,
        name: "6 oz. Tenderloin Steak",
      },
      {
        quantity: 4,
        name: "8 oz. Sirloin Steak",
      },
      { quantity: 2, name: "London Broil ( 2 lb. )" },
      {
        quantity: 2,
        name: "Blade Roast ( 2 lb. )",
      },
      {
        quantity: 2,
        name: "Chuck Roast ( 2 lb. )",
      },
      {
        quantity: 6,
        name: "Stew Meat ( 1 lb. )",
      },
      {
        quantity: 4,
        name: "Bone-In Short Ribs",
      },
      { quantity: 6, name: "Top Round Steak ( 1 lb. )" },

      { quantity: 4, name: "Bottom Round Steak ( 1 lb. )" },
      {
        quantity: 32,
        name: "Ground Beef ( 1 lb. )",
      },
      {
        quantity: 1,
        name: "Liver ( 1 lb. )",
      },
    ];
    this.orderId = "1";
  }
}
class EightBeefBundle implements Box {
  title: string;
  totalPrice: number;
  boxSize: number;
  items: Item[];
  orderId: string;
  src: string;
  constructor() {
    this.title = "1/8 Beef";
    this.totalPrice = 300;
    this.boxSize = 0;
    this.src = "/family_box.jpg";
    this.items = [
      { quantity: 2, name: "10 oz. Boneless Ribeye Steak" },
      {
        quantity: 2,
        name: "10 oz. NY Strip Steak",
      },
      {
        quantity: 2,
        name: "8 oz. Sirloin Steak",
      },
      { quantity: 1, name: "London Broil ( 2 lb. )" },
      {
        quantity: 1,
        name: "Blade Roast ( 2 lb. )",
      },
      {
        quantity: 1,
        name: "Chuck Roast ( 2 lb. )",
      },
      {
        quantity: 3,
        name: "Stew Meat ( 1 lb. )",
      },
      {
        quantity: 2,
        name: "Bone-In Short Ribs",
      },
      { quantity: 4, name: "Top Round Steak ( 1 lb. )" },

      { quantity: 2, name: "Bottom Round Steak ( 1 lb. )" },
      {
        quantity: 16,
        name: "Ground Beef ( 1 lb. )",
      },
      {
        quantity: 1,
        name: "Liver ( 1 lb. )",
      },
    ];
    this.orderId = "1";
  }
}

export const getBoxFromClass = (title: string) => {
  switch (title) {
    case "Grilling Bundle":
      return new GrillingBundle();
    case "Sampler Bundle":
      return new SamplerBundle();
    case "Small Ground Beef Bundle":
      return new GroundBeefBoxSM();
    case "Medium Ground Beef Bundle":
      return new GroundBeefBoxMD();
    case "Large Ground Beef Bundle":
      return new GroundBeefBoxLG();
    case "Premium Steaks Bundle":
      return new PremiumSteaksBox();
    case "Oven Bundle":
      return new OvenBundle();
    case "Hamburger Patties":
      return new HamburgerPatties();
    case "1/4 Beef":
      return new QuarterBeefBundle();
    case "1/8 Beef":
      return new EightBeefBundle();
    default:
      throw new Error("Box not found");
  }
};

export const createdBoxes = [
  new GrillingBundle(),
  new SamplerBundle(),
  new GroundBeefBoxSM(),
  new GroundBeefBoxMD(),
  new GroundBeefBoxLG(),
  new PremiumSteaksBox(),
  new OvenBundle(),
  new HamburgerPatties(),
  new QuarterBeefBundle(),
  new EightBeefBundle(),
];
