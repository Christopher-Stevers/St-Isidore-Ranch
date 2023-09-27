// box management, todo extract magic strings, then extract to db records.

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
    this.totalPrice = 27999;
    this.src = "/boxPics/grilledBeef.jpg";
    this.boxSize = 0;
    this.items = [
      {
        quantity: 4,
        name: `Boneless Ribeye Steak 
( 8 oz. )`,
      },
      {
        quantity: 2,
        name: "NY Strip Steak ( 8 oz. )",
      },
      {
        quantity: 2,
        name: "Sirloin Steak ( 8 oz. )",
      },

      {
        quantity: 16,
        name: "1/4 lb. Hamburger Patties",
      },
    ];
  }
}
class EverythingBundle implements Box {
  totalPrice: number;
  title: string;
  src: string;
  boxSize: number;
  items: Item[];
  constructor() {
    this.title = "Everything Bundle";
    this.totalPrice = 25999;
    this.src = "/boxPics/everythingBeef.jpg";
    this.boxSize = 0;
    this.items = [
      {
        quantity: 4,
        name: "NY Strip Steak ( 8 oz. )",
      },
      {
        quantity: 2,
        name: "Sirloin Steak ( 8 oz. )",
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
    this.totalPrice = 10000;
    this.title = `Ground Beef Bundle 
( Small )`;
    this.boxSize = 0;
    this.src = "/boxPics/groundBeef.jpg";
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
    this.totalPrice = 20000;
    this.title = `Ground Beef Bundle 
( Medium )`;
    this.boxSize = 0;
    this.src = "/boxPics/groundBeef.jpg";
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
    this.totalPrice = 30000;
    this.title = `Ground Beef Bundle 
( Large )`;
    this.boxSize = 0;
    this.src = "/boxPics/groundBeef.jpg";
    this.items = [
      {
        quantity: 40,
        name: "Ground Beef ( 1 lb. )",
      },
    ];
  }
}
class PrimeSteaksBox implements Box {
  title: string;
  totalPrice: number;
  src: string;
  boxSize: number;
  items: Item[];
  constructor() {
    this.title = "Prime Steaks";
    this.totalPrice = 56999;
    this.boxSize = 0;
    this.src = "/boxPics/steakBeef.jpg";

    this.items = [
      {
        quantity: 6,
        name: `Boneless Ribeye Steak 
( 8 oz. )`,
      },
      { quantity: 6, name: "Tenderloin Steak ( 6 oz. )" },
      { quantity: 6, name: "Sirloin Steak ( 8 oz. )" },
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
    this.totalPrice = 19599;
    this.boxSize = 0;
    this.src = "/boxPics/roastBeef.jpg";
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
    this.totalPrice = 3999;
    this.boxSize = 0;
    this.src = "/boxPics/pattyBeef.jpg";
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
    this.totalPrice = 132776;
    this.boxSize = 0;
    this.src = "/boxPics/sideBeef.jpg";
    this.items = [
      {
        quantity: 4,
        name: `Boneless Ribeye Steak 
( 8 oz. )`,
      },
      {
        quantity: 4,
        name: "NY Strip Steak ( 8 oz. )",
      },
      {
        quantity: 2,
        name: "Tenderloin Steak ( 6 oz. )",
      },
      {
        quantity: 4,
        name: "Sirloin Steak ( 8 oz. )",
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
      { quantity: 3, name: "London Broil ( 2 lb. )" },

      { quantity: 2, name: "Bottom Round Roast ( 2 lb. )" },
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
    this.totalPrice = 66388;
    this.boxSize = 0;
    this.src = "/boxPics/sideBeef.jpg";
    this.items = [
      {
        quantity: 2,
        name: `Boneless Ribeye Steak 
( 8 oz. )`,
      },
      {
        quantity: 2,
        name: "NY Strip Steak ( 8 oz. )",
      },
      {
        quantity: 2,
        name: "Sirloin Steak ( 8 oz. )",
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
    case "Everything Bundle":
      return new EverythingBundle();
    case `Ground Beef Bundle 
( Small )`:
      return new GroundBeefBoxSM();
    case `Ground Beef Bundle 
( Medium )`:
      return new GroundBeefBoxMD();
    case `Ground Beef Bundle 
( Large )`:
      return new GroundBeefBoxLG();
    case "Prime Steaks":
      return new PrimeSteaksBox();
    case "Oven Bundle":
      return new OvenBundle();
    case "Hamburger Patties":
      return new HamburgerPatties();
    case "1/4 Beef":
      return new QuarterBeefBundle();
    case "1/8 Beef":
      return new EightBeefBundle();
    default:
      throw new Error(`${title} not found`);
  }
};

export const createdBoxes = [new PrimeSteaksBox()];
/*
  new GrillingBundle(),
  new EverythingBundle(),
  new OvenBundle(),
  new HamburgerPatties(),
  new GroundBeefBoxSM(),
  new GroundBeefBoxMD(),
  new GroundBeefBoxLG(),
  new EightBeefBundle(),
  new QuarterBeefBundle(),
*/
