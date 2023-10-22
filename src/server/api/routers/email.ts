import {
  createTRPCRouter,
  publicProcedure,
} from "~/server/api/trpc";
import { z } from "zod";
import emailWrapper from "~/server/helpers/emailWrapper";
import { env } from "~/env.mjs";

export const emailRouter = createTRPCRouter({
  emailMe: publicProcedure
    .input(
      z.object({
        name: z.string(),
        email: z.string(),
        message: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      await emailWrapper({
        email: env.EMAIL_USERNAME ?? "",
        subject: "New Message",
        htmlMessage: `<p>New message from ${input.name} at ${input.email} </p><p> ${input.message} </p>`,
        message: `New message from ${input.name} at ${input.email} ${input.message}`,
      });
    }),
});
