import { createTRPCRouter } from "~/server/api/trpc";
import { userRouter } from "~/server/api/routers/user";
import { productClassRouter } from "~/server/api/routers/productClass";
import { productRouter } from "~/server/api/routers/product";
import { orderRouter } from "~/server/api/routers/order";
import { paymentsRouter } from "~/server/api/routers/payments";
import { addressRouter } from "~/server/api/routers/address";
import { emailRouter } from "~/server/api/routers/email";
import { couponRouter } from "~/server/api/routers/coupons";

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
  payments: paymentsRouter,
  address: addressRouter,
  email: emailRouter,
  coupon: couponRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
