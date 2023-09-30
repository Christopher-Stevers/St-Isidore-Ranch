// box management, todo extract magic strings, then extract to db records.

// products
const BONELESSRIBEYE = `Boneless Ribeye Steak 
( 8 oz. )`;
const NYSTRIP = "NY Strip Steak ( 8 oz. )";
const SIRLOIN = "Sirloin Steak ( 8 oz. )";
const HAMBURGER = "1/4 lb. Hamburger Patties";
const TENDERLOIN = "Tenderloin Steak ( 6 oz. )";
const BLADEROAST = "Blade Roast ( 2 lb. )";
const GROUNDBEEF = "Ground Beef ( 1 lb. )";
const STEWMEAT = "Stew Meat ( 1 lb. )";
const BONEINSHORTRIBS = "Bone-In Short Ribs";
const LONDONBROIL = "London Broil ( 2 lb. )";
const CHUCKROAST = "Chuck Roast ( 2 lb. )";
const TOPROUND = "Top Round Steak ( 1 lb. )";
const BOTTOMROUND = "Bottom Round Steak ( 1 lb. )";
const LIVER = "Liver ( 1 lb. )";
const LOREM_IPSUM =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod, nisl eget aliquam ultricies, nunc nunc aliquet nunc, vitae aliquam nun";

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
  description: string;
  src: string;
  boxSize: number;
  items: Item[];

  constructor() {
    this.description = LOREM_IPSUM;
    this.description = LOREM_IPSUM;
    this.title = "Grilling Bundle";
    this.totalPrice = 27999;
    this.src = "/boxPics/grilledBeef.jpg";
    this.boxSize = 0;
    this.items = [
      {
        quantity: 4,
        name: BONELESSRIBEYE,
      },
      {
        quantity: 2,
        name: NYSTRIP,
      },
      {
        quantity: 2,
        name: SIRLOIN,
      },

      {
        quantity: 16,
        name: HAMBURGER,
      },
    ];
  }
}
class EverythingBundle implements Box {
  totalPrice: number;
  title: string;
  description: string;
  src: string;
  boxSize: number;
  items: Item[];

  constructor() {
    this.description = LOREM_IPSUM;
    this.title = "Everything Bundle";
    this.totalPrice = 25999;
    this.src = "/boxPics/everythingBeef.jpg";
    this.boxSize = 0;
    this.items = [
      {
        quantity: 4,
        name: NYSTRIP,
      },
      {
        quantity: 2,
        name: SIRLOIN,
      },
      {
        quantity: 1,
        name: BLADEROAST,
      },
      {
        quantity: 4,
        name: GROUNDBEEF,
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
  description: string;
  boxSize: number;
  items: Item[];

  constructor() {
    this.description = LOREM_IPSUM;
    this.totalPrice = 10000;
    this.title = `Ground Beef Bundle 
( Small )`;
    this.boxSize = 0;
    this.src = "/boxPics/groundBeef.jpg";
    this.items = [
      {
        quantity: 10,
        name: GROUNDBEEF,
      },
    ];
  }
}
class GroundBeefBoxMD implements Box {
  totalPrice: number;
  src: string;
  title: string;
  description: string;
  boxSize: number;
  items: Item[];

  constructor() {
    this.description = LOREM_IPSUM;
    this.totalPrice = 20000;
    this.title = `Ground Beef Bundle 
( Medium )`;
    this.boxSize = 0;
    this.src = "/boxPics/groundBeef.jpg";
    this.items = [
      {
        quantity: 25,
        name: GROUNDBEEF,
      },
    ];
  }
}
class GroundBeefBoxLG implements Box {
  totalPrice: number;
  src: string;
  title: string;
  description: string;
  boxSize: number;
  items: Item[];

  constructor() {
    this.description = LOREM_IPSUM;
    this.totalPrice = 30000;
    this.title = `Ground Beef Bundle 
( Large )`;
    this.boxSize = 0;
    this.src = "/boxPics/groundBeef.jpg";
    this.items = [
      {
        quantity: 40,
        name: GROUNDBEEF,
      },
    ];
  }
}
class PrimeSteaksBox implements Box {
  title: string;
  description: string;
  totalPrice: number;
  src: string;
  boxSize: number;
  items: Item[];

  constructor() {
    this.description = LOREM_IPSUM;
    this.title = "Prime Steaks";
    this.totalPrice = 56999;
    this.boxSize = 0;
    this.src = "/boxPics/steakBeef.jpg";

    this.items = [
      {
        quantity: 6,
        name: BONELESSRIBEYE,
      },
      { quantity: 6, name: TENDERLOIN },
      { quantity: 6, name: SIRLOIN },
    ];
  }
}

class OvenBundle implements Box {
  title: string;
  description: string;
  totalPrice: number;
  boxSize: number;
  items: Item[];
  orderId: string;
  src: string;

  constructor() {
    this.description = LOREM_IPSUM;
    this.title = "Oven Bundle";
    this.totalPrice = 19599;
    this.boxSize = 0;
    this.src = "/boxPics/roastBeef.jpg";
    this.items = [
      { quantity: 2, name: "London Broil ( 1 lb. )" },
      {
        quantity: 2,
        name: BLADEROAST,
      },
      {
        quantity: 2,
        name: CHUCKROAST,
      },
      {
        quantity: 3,
        name: BONEINSHORTRIBS,
      },
    ];
    this.orderId = "1";
  }
}
class HamburgerPatties implements Box {
  title: string;
  description: string;
  totalPrice: number;
  boxSize: number;
  items: Item[];
  orderId: string;
  src: string;
  constructor() {
    this.description = LOREM_IPSUM;
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
  description: string;
  totalPrice: number;
  boxSize: number;
  items: Item[];
  orderId: string;
  src: string;

  constructor() {
    this.description = LOREM_IPSUM;
    this.title = "1/4 Beef";
    this.totalPrice = 132776;
    this.boxSize = 0;
    this.src = "/boxPics/sideBeef.jpg";
    this.items = [
      {
        quantity: 4,
        name: BONELESSRIBEYE,
      },
      {
        quantity: 4,
        name: NYSTRIP,
      },
      {
        quantity: 2,
        name: TENDERLOIN,
      },
      {
        quantity: 4,
        name: SIRLOIN,
      },
      { quantity: 2, name: LONDONBROIL },
      {
        quantity: 2,
        name: BLADEROAST,
      },
      {
        quantity: 2,
        name: CHUCKROAST,
      },
      {
        quantity: 6,
        name: STEWMEAT,
      },
      {
        quantity: 4,
        name: BONEINSHORTRIBS,
      },
      { quantity: 3, name: LONDONBROIL },

      { quantity: 2, name: "Bottom Round Roast ( 2 lb. )" },
      {
        quantity: 32,
        name: GROUNDBEEF,
      },
      {
        quantity: 1,
        name: LIVER,
      },
    ];
    this.orderId = "1";
  }
}
class EightBeefBundle implements Box {
  title: string;
  description: string;
  totalPrice: number;
  boxSize: number;
  items: Item[];
  orderId: string;
  src: string;

  constructor() {
    this.description = LOREM_IPSUM;
    this.title = "1/8 Beef";
    this.totalPrice = 66388;
    this.boxSize = 0;
    this.src = "/boxPics/sideBeef.jpg";
    this.items = [
      {
        quantity: 2,
        name: BONELESSRIBEYE,
      },
      {
        quantity: 2,
        name: NYSTRIP,
      },
      {
        quantity: 2,
        name: SIRLOIN,
      },
      { quantity: 1, name: LONDONBROIL },
      {
        quantity: 1,
        name: BLADEROAST,
      },
      {
        quantity: 1,
        name: CHUCKROAST,
      },
      {
        quantity: 3,
        name: STEWMEAT,
      },
      {
        quantity: 2,
        name: BONEINSHORTRIBS,
      },
      { quantity: 4, name: TOPROUND },

      { quantity: 2, name: BOTTOMROUND },
      {
        quantity: 16,
        name: GROUNDBEEF,
      },
      {
        quantity: 1,
        name: LIVER,
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

export const createdBoxes = [
  new PrimeSteaksBox(),
  new GrillingBundle(),
  new EverythingBundle(),
  new OvenBundle(),
  new HamburgerPatties(),
  new GroundBeefBoxSM(),
  new GroundBeefBoxMD(),
  new GroundBeefBoxLG(),
  new EightBeefBundle(),
  new QuarterBeefBundle(),
];
/*
 */
