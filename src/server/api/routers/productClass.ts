import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

export const productClassRouter = createTRPCRouter({

hello: publicProcedure
.input(z.object({ text: z.string() }))
.query(({ input }) => {
  return {
	greeting: `Hello ${input.text}`,
  };
}),

addProductClass: protectedProcedure
.input(z.object({ text: z.string() }))
.mutation(({ ctx, input }) => {
  return ctx.prisma.productClass.create({
	data: {
	  name: input.text,
	},
  });
}),

removeProductClass: protectedProcedure
.input(z.object({ id: z.string() }))
.mutation(({ ctx, input }) => {
  return ctx.prisma.productClass.delete({
	where: {
	  id: input.id,
	},
  });
}),

getProductClasses: publicProcedure.query(({ ctx }) => {
return ctx.prisma.productClass.findMany();
}),

getAll: publicProcedure.query(({ ctx }) => {
return ctx.prisma.user.findMany();
}),

getSecretMessage: protectedProcedure.query(() => {
return "you can now see this secret message!";
}),
});
  
  