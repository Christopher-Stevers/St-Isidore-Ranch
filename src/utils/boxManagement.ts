// box management, todo extract magic strings, then extract to db records.
const LOREM_IPSUM = "";
// products
const BONELESSRIBEYE = "Boneless Ribeye Steak ( 8 oz. )";
const NYSTRIP = "NY Strip Steak ( 8 oz. )";
const SIRLOIN = "Sirloin Steak ( 8 oz. )";
// const HAMBURGER = "1/4 lb. Hamburger Patties";
const TENDERLOIN = "Tenderloin Steak ( 5 oz. )";
const BLADEROAST = "Blade Roast ( 2 lb. )";
const GROUNDBEEF = "Ground Beef ( 1 lb. )";
const STEWMEAT = "Stew Meat ( 1 lb. )";
const BONEINSHORTRIBS = "Bone-In Short Ribs ( 12 oz. )";
const LONDONBROIL = "London Broil ( 2 lb. )";
const STEAKROAST = "Steak Roast ( 2 lb. )";
const SIRLOIN_TIP = "Sirloin Tip Roast ( 2 lb. )";

class Box {
  totalPrice: number;
  title: string;
  description: string;
  src: string;
  boxSize: number;
  slug: string;
  variant: string | null;

  items: Item[];

  constructor(params: {
    description: string;
    title: string;
    src: string;
    slug: string;
    variant: string;
    totalPrice: number;
    boxSize: number;
    items: Item[];
  }) {
    const {
      description,
      title,
      src,
      slug,
      variant,
      totalPrice,
      boxSize,
      items,
    } = params;
    this.description = description;
    this.title = title;
    this.src = src;
    this.slug = slug;
    this.variant = variant;
    this.totalPrice = totalPrice;
    this.boxSize = boxSize;
    this.items = items;
  }
}
export type Item = {
  quantity: number;
  name: string;
};

export class SmallGrillingBundle extends Box {
  constructor() {
    super({
      description: LOREM_IPSUM,
      title: "Grilling Bundle",
      src: "/boxPics/grilledBeef.jpg",
      slug: "sm-grilling-bundle",
      variant: "small",
      totalPrice: 16999,
      boxSize: 0,
      items: [
        {
          quantity: 2,
          name: BONELESSRIBEYE,
        },
        {
          quantity: 2,
          name: NYSTRIP,
        },

        {
          quantity: 4,
          name: GROUNDBEEF,
        },
      ],
    });
  }
}

export class LargeGrillingBundle extends Box {
  constructor() {
    super({
      description: LOREM_IPSUM,
      title: "Grilling Bundle",
      src: "/boxPics/grilledBeef.jpg",
      slug: "lg-grilling-bundle",
      variant: "large",
      totalPrice: 27999,
      boxSize: 0,
      items: [
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
          quantity: 4,
          name: GROUNDBEEF,
        },
      ],
    });
  }
}

class LargeEverythingBundle extends Box {
  constructor() {
    super({
      description: LOREM_IPSUM,
      title: "Everything Bundle",
      totalPrice: 25999,
      variant: "large",
      src: "/boxPics/everythingBeef.jpg",
      boxSize: 0,
      slug: "lg-everything-bundle",
      items: [
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
      ],
    });
  }
}
class SmallEverythingBundle extends Box {
  constructor() {
    super({
      description: LOREM_IPSUM,
      title: "Everything Bundle",
      totalPrice: 15999,
      variant: "small",
      src: "/boxPics/everythingBeef.jpg",
      boxSize: 0,
      slug: "sm-everything-bundle",
      items: [
        {
          quantity: 2,
          name: NYSTRIP,
        },
        {
          quantity: 1,
          name: BONEINSHORTRIBS,
        },
        {
          quantity: 1,
          name: BLADEROAST,
        },
        {
          quantity: 2,
          name: GROUNDBEEF,
        },
      ],
    });
  }
}
class GroundBeefBoxMD implements Box {
  totalPrice: number;
  src: string;
  title: string;
  description: string;
  boxSize: number;
  slug: string;
  variant: string;
  items: Item[];

  constructor() {
    this.description = LOREM_IPSUM;
    this.totalPrice = 10000;
    this.variant = "small";
    this.slug = "md-ground-beef-bundle";
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
class GroundBeefBoxLG implements Box {
  totalPrice: number;
  src: string;
  title: string;
  description: string;
  boxSize: number;
  slug: string;
  variant: string;
  items: Item[];

  constructor() {
    this.description = LOREM_IPSUM;
    this.variant = "large";
    this.totalPrice = 22000;
    this.slug = "lg-ground-beef-bundle";
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
class GroundBeefBoxXL implements Box {
  totalPrice: number;
  src: string;
  title: string;
  description: string;
  boxSize: number;
  slug: string;
  variant: string;
  items: Item[];

  constructor() {
    this.description = LOREM_IPSUM;
    this.totalPrice = 30000;
    this.variant = "XL";
    this.title = `Ground Beef Bundle 
( Large )`;
    this.slug = "xl-ground-beef-bundle";
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
class LargePrimeSteaksBox implements Box {
  title: string;
  description: string;
  totalPrice: number;
  src: string;
  boxSize: number;
  slug: string;
  variant: string;
  items: Item[];

  constructor() {
    this.description =
      "A box full of our finest steaks for your grilling pleasure!";
    this.title = "Prime Steaks";
    this.totalPrice = 56999;
    this.slug = "lg-prime-steaks";
    this.boxSize = 0;
    this.src = "/boxPics/steakBeef.jpg";
    this.variant = "large";

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
class MediumPrimeSteaksBox implements Box {
  title: string;
  description: string;
  totalPrice: number;
  src: string;
  boxSize: number;
  slug: string;
  variant: string;
  items: Item[];

  constructor() {
    this.description =
      "A box full of our finest steaks for your grilling pleasure!";
    this.title = "Prime Steaks";
    this.totalPrice = 38999;
    this.slug = "md-prime-steaks";
    this.boxSize = 0;
    this.src = "/boxPics/steakBeef.jpg";
    this.variant = "medium";

    this.items = [
      {
        quantity: 4,
        name: BONELESSRIBEYE,
      },
      { quantity: 4, name: TENDERLOIN },
      { quantity: 4, name: SIRLOIN },
    ];
  }
}
class SmallPrimeSteaksBox implements Box {
  title: string;
  description: string;
  totalPrice: number;
  src: string;
  boxSize: number;
  slug: string;
  variant: string;
  items: Item[];

  constructor() {
    this.description =
      "A box full of our finest steaks for your grilling pleasure!";
    this.title = "Prime Steaks";
    this.totalPrice = 19999;
    this.slug = "sm-prime-steaks";
    this.boxSize = 0;
    this.src = "/boxPics/steakBeef.jpg";
    this.variant = "small";

    this.items = [
      {
        quantity: 2,
        name: BONELESSRIBEYE,
      },
      { quantity: 2, name: TENDERLOIN },
      { quantity: 2, name: SIRLOIN },
    ];
  }
}

class SmallOvenBundle implements Box {
  title: string;
  description: string;
  totalPrice: number;
  boxSize: number;
  slug: string;
  variant: string;
  items: Item[];
  orderId: string;
  src: string;

  constructor() {
    this.description = LOREM_IPSUM;
    this.title = "Oven Bundle";
    this.totalPrice = 19599;
    this.boxSize = 0;
    this.slug = "sm-oven-bundle";
    this.variant = "small";
    this.src = "/boxPics/roastBeef.jpg";
    this.items = [
      { quantity: 1, name: LONDONBROIL },
      {
        quantity: 2,
        name: BLADEROAST,
      },
      {
        quantity: 2,
        name: STEAKROAST,
      },
      {
        quantity: 3,
        name: BONEINSHORTRIBS,
      },
    ];
    this.orderId = "1";
  }
}
class LargeOvenBundle implements Box {
  title: string;
  description: string;
  totalPrice: number;
  boxSize: number;
  slug: string;
  variant: string;
  items: Item[];
  orderId: string;
  src: string;

  constructor() {
    this.description = LOREM_IPSUM;
    this.title = "Oven Bundle";
    this.totalPrice = 379.99;
    this.boxSize = 0;
    this.slug = "oven-bundle";
    this.variant = "Large";
    this.src = "/boxPics/roastBeef.jpg";
    this.items = [
      { quantity: 2, name: LONDONBROIL },
      {
        quantity: 4,
        name: BLADEROAST,
      },
      {
        quantity: 4,
        name: STEAKROAST,
      },
      {
        quantity: 6,
        name: BONEINSHORTRIBS,
      },
    ];
    this.orderId = "1";
  }
}
class SmallHamburgerPatties implements Box {
  title: string;
  description: string;
  totalPrice: number;
  boxSize: number;
  slug: string;
  variant: string;
  items: Item[];
  orderId: string;
  src: string;
  constructor() {
    this.description = LOREM_IPSUM;
    this.title = "Hamburger Patties";
    this.variant = "small";
    this.totalPrice = 2599;
    this.slug = "sm-hamburger-patties";
    this.boxSize = 0;
    this.src = "/boxPics/pattyBeef.jpg";
    this.items = [{ quantity: 8, name: "1/4 patties" }];
    this.orderId = "1";
  }
}
class LargeHamburgerPatties implements Box {
  title: string;
  description: string;
  totalPrice: number;
  boxSize: number;
  slug: string;
  variant: string;
  items: Item[];
  orderId: string;
  src: string;
  constructor() {
    this.description = LOREM_IPSUM;
    this.title = "Hamburger Patties";
    this.variant = "large";
    this.totalPrice = 6999;
    this.slug = "lg-hamburger-patties";
    this.boxSize = 0;
    this.src = "/boxPics/pattyBeef.jpg";
    this.items = [{ quantity: 16, name: "1/4 patties" }];
    this.orderId = "1";
  }
}

class QuarterBeefBundle implements Box {
  title: string;
  description: string;
  totalPrice: number;
  boxSize: number;
  slug: string;
  variant: null;
  items: Item[];
  orderId: string;
  src: string;

  constructor() {
    this.description = LOREM_IPSUM;
    this.title = "1/4 Beef";
    this.totalPrice = 125796;
    this.boxSize = 0;
    this.variant = null;
    this.src = "/boxPics/sideBeef.jpg";
    this.slug = "1-4-beef";
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
        quantity: 4,
        name: TENDERLOIN,
      },
      {
        quantity: 4,
        name: SIRLOIN,
      },

      { quantity: 1, name: SIRLOIN_TIP },
      {
        quantity: 1,
        name: BLADEROAST,
      },
      {
        quantity: 2,
        name: STEAKROAST,
      },
      {
        quantity: 4,
        name: STEWMEAT,
      },
      {
        quantity: 2,
        name: BONEINSHORTRIBS,
      },
      { quantity: 3, name: LONDONBROIL },
      {
        quantity: 32,
        name: GROUNDBEEF,
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
  slug: string;
  variant: null;
  items: Item[];
  orderId: string;
  src: string;

  constructor() {
    this.description = LOREM_IPSUM;
    this.title = "1/8 Beef";
    this.totalPrice = 66388;
    this.slug = "1-8-beef";
    this.boxSize = 0;
    this.variant = null;
    this.src = "/boxPics/sideBeef.jpg";
    this.items = [
      { quantity: 2, name: TENDERLOIN },
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
        name: SIRLOIN_TIP,
      },
      {
        quantity: 1,
        name: STEAKROAST,
      },
      {
        quantity: 3,
        name: STEWMEAT,
      },
      {
        quantity: 16,
        name: GROUNDBEEF,
      },
    ];
    this.orderId = "1";
  }
}

export const getBoxFromSlug = (slug: string) => {
  switch (slug) {
    case "sm-grilling-bundle":
      return new SmallGrillingBundle();
    case "lg-grilling-bundle":
      return new LargeGrillingBundle();
    case "sm-everything-bundle":
      return new SmallEverythingBundle();
    case "lg-everything-bundle":
      return new LargeEverythingBundle();
    case "sm-prime-steaks":
      return new SmallPrimeSteaksBox();
    case "md-prime-steaks":
      return new MediumPrimeSteaksBox();
    case "lg-prime-steaks":
      return new LargePrimeSteaksBox();
    case "sm-oven-bundle":
      return new SmallOvenBundle();
    case "oven-bundle":
      return new LargeOvenBundle();
    case "sm-hamburger-patties":
      return new SmallHamburgerPatties();
    case "lg-hamburger-patties":
      return new LargeHamburgerPatties();
    case "xl-ground-beef-bundle":
      return new GroundBeefBoxXL();
    case "lg-ground-beef-bundle":
      return new GroundBeefBoxLG();
    case "md-ground-beef-bundle":
      return new GroundBeefBoxMD();
    case "sm-ground-beef-bundle":
      return new GroundBeefBoxMD();
    case "1-4-beef":
      return new QuarterBeefBundle();
    case "1-8-beef":
      return new EightBeefBundle();
    default:
      return new GroundBeefBoxMD();
  }
};
export type BoxGroupType = {
  name: string;
  slug: string;
  description: string;
  src: string;
  Boxes: Box[];
};
export class BoxGroup implements BoxGroupType {
  name: string;
  Boxes: [Box, ...Box[]];
  priceMax: number;
  priceMin: number;
  slug: string;
  src: string;
  description: string;

  constructor(params: {
    name: string;
    slug: string;
    Boxes: [Box, ...Box[]];
    description: string;
    src: string;
  }) {
    const { name, slug, Boxes, description, src } = params;
    this.name = name;
    this.description = description;
    this.Boxes = Boxes;
    this.src = src;
    this.priceMax = Math.max(
      ...Boxes.map((box) => box.totalPrice),
    );
    this.priceMin = Math.min(
      ...Boxes.map((box) => box.totalPrice),
    );
    this.slug = slug;
  }
}
const GroundBeefBoxGroup = new BoxGroup({
  name: "Ground Beef",
  slug: "ground-beef",
  Boxes: [
    new GroundBeefBoxMD(),
    new GroundBeefBoxLG(),
    new GroundBeefBoxXL(),
  ],

  description: "Load up on ground beef!",
  src: "/boxPics/groundBeef.jpg",
});
const GrilingBoxGroup = new BoxGroup({
  name: "Grilling Bundle",
  slug: "grilling",
  Boxes: [
    new SmallGrillingBundle(),
    new LargeGrillingBundle(),
  ],
  description: "Everything you need for a backyard BBQ!",
  src: "/boxPics/grilledBeef.jpg",
});
const OvenBoxGroup = new BoxGroup({
  name: "Oven Bundle",
  slug: "oven",
  Boxes: [new SmallOvenBundle(), new LargeOvenBundle()],
  description:
    "A mix of roasting and slow-cooker cuts, perfect for families",
  src: "/boxPics/roastBeef.jpg",
});
const PrimeSteaksBoxGroup = new BoxGroup({
  name: "Prime Steaks",
  slug: "prime-steaks",
  Boxes: [
    new SmallPrimeSteaksBox(),
    new MediumPrimeSteaksBox(),
    new LargePrimeSteaksBox(),
  ],
  description: "Our very best steaks in one box!",
  src: "/boxPics/steakBeef.jpg",
});
const EverythingBoxGroup = new BoxGroup({
  name: "Everything Bundle",
  slug: "everything",
  Boxes: [
    new SmallEverythingBundle(),
    new LargeEverythingBundle(),
  ],
  description:
    "Not sure what you're looking for? Try a little bit of everything!",
  src: "/boxPics/everythingBeef.jpg",
});
const QuarterBeefBundleGroup = new BoxGroup({
  name: "Quarter of a Beef",
  slug: "quarter-beef",
  Boxes: [new QuarterBeefBundle()],
  description:
    "A quarter of a beef - approximately 60 lbs of meat, perfect for a family of 4",
  src: "/boxPics/sideBeef.jpg",
});
const EightBeefBundleGroup = new BoxGroup({
  name: "Eighth of a Beef",
  slug: "eighth-beef",
  Boxes: [new EightBeefBundle()],
  description:
    "Don't have a lot of freezer space? Try an eighth of a beef - approximately 30 lbs of meat, great for individuals and small families",
  src: "/boxPics/sideBeef.jpg",
});
const HamburgerPattiesGroup = new BoxGroup({
  name: "Hamburger Patties",
  slug: "hamburger-patties",
  Boxes: [
    new SmallHamburgerPatties(),
    new LargeHamburgerPatties(),
  ],
  description: "1/4 lb. patties, perfect for the grill!",
  src: "/boxPics/pattyBeef.jpg",
});
export const BoxGroups = [
  GrilingBoxGroup,
  OvenBoxGroup,
  PrimeSteaksBoxGroup,
  EverythingBoxGroup,

  GroundBeefBoxGroup,
  HamburgerPattiesGroup,
  QuarterBeefBundleGroup,
  EightBeefBundleGroup,
];
export const BoxGroupGroundFirst = [
  GroundBeefBoxGroup,
  GrilingBoxGroup,
  OvenBoxGroup,
  PrimeSteaksBoxGroup,
  EverythingBoxGroup,

  HamburgerPattiesGroup,
  QuarterBeefBundleGroup,
  EightBeefBundleGroup,
];
export const getBoxGroupFromSlug = (slug: string) => {
  switch (slug) {
    case "ground-beef":
      return GroundBeefBoxGroup;
    case "grilling":
      return GrilingBoxGroup;
    case "oven":
      return OvenBoxGroup;
    case "prime-steaks":
      return PrimeSteaksBoxGroup;
    case "everything":
      return EverythingBoxGroup;
    case "eighth-beef":
      return EightBeefBundleGroup;
    case "quarter-beef":
      return QuarterBeefBundleGroup;
    case "hamburger-patties":
      return HamburgerPattiesGroup;
    default:
      throw new Error(`${slug} not found`);
  }
};

/*
 */
