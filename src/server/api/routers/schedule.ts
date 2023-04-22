import { TRPCError } from "@trpc/server";
import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

export const scheduleRouter = createTRPCRouter({
  create: publicProcedure
    .input(z.object({ title: z.string() }))
    .mutation(async ({ ctx, input }) => {
      if (!ctx.session?.user) {
        throw new TRPCError({ code: "UNAUTHORIZED", message: "Not logged in" });
      }
      return ctx.prisma.schedule.create({
        data: {
          title: input.title,
          userId: ctx.session?.user?.id ?? "",
        },
      });
    }),
  list: publicProcedure.query(async ({ ctx }) => {
    if (!ctx.session?.user) {
      throw new TRPCError({ code: "UNAUTHORIZED", message: "Not logged in" });
    }
    return ctx.prisma.schedule.findMany({
      where: {
        userId: ctx.session.user.id,
      },
    });
  }),
  delete: protectedProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      if (!ctx.session?.user) {
        throw new TRPCError({ code: "UNAUTHORIZED", message: "Not logged in" });
      }
      const match = await ctx.prisma.schedule.findFirstOrThrow({
        where: { userId: ctx.session.user.id, id: Number(input.id) },
      });
      return ctx.prisma.schedule.delete({ where: { id: match.id } });
    }),
});
