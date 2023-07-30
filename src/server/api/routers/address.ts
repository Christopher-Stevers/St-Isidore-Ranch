import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
} from "~/server/api/trpc";

export const addressRouter = createTRPCRouter({
  upsertAddress: publicProcedure
    .input(
      z.object({
        id: z.string().optional(),
        orderId: z.string(),
        name: z.string().optional(),
        address1: z.string().optional(),
        address2: z.string().optional(),
        city: z.string().optional(),
        state: z.string().optional(),
        postalCode: z.string().optional(),
        phone: z.string().optional(),
        country: z.string().optional(),
        email: z.string().optional(),
      }),
    )

    .mutation(async ({ ctx: { prisma }, input }) => {
      const data: {
        name?: string;
        address1?: string;
        address2?: string;
        city?: string;
        state?: string;
        postalCode?: string;
        phone?: string;
        country?: string;
        email?: string;
      } = {};
      if (input.name) data.name = input.name;
      if (input.address1) data.address1 = input.address1;
      if (input.address2) data.address2 = input.address2;
      if (input.city) data.city = input.city;
      if (input.state) data.state = input.state;
      if (input.postalCode)
        data.postalCode = input.postalCode;
      if (input.phone) data.phone = input.phone;
      if (input.country) data.country = input.country;
      if (input.email) data.email = input.email;
      const order = await prisma.order.findUnique({
        where: { id: input.orderId },
      });
      console.log(
        "currentAddress",

        input.orderId,
      );
      if (order?.addressId) {
        return prisma.address.update({
          where: {
            id: order.addressId,
          },
          data,
        });
      }
      return prisma.address.create({
        data: {
          ...data,
          orders: {
            connect: [{ id: input.orderId }],
          },
        },
      });
    }),
});
