import { createTRPCRouter } from "~/server/api/trpc";
import { userRouter } from "~/server/api/routers/user";
import { productClassRouter } from "~/server/api/routers/productClass";
import { productRouter } from "~/server/api/routers/product";
import { orderRouter } from "~/server/api/routers/order";
import { stripeRouter } from "~/server/api/routers/stripe";
import { addressRouter } from "~/server/api/routers/address";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  user: userRouter,
  productClass: productClassRouter,
  product: productRouter,
  order: orderRouter,
  stripe: stripeRouter,
  address: addressRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
