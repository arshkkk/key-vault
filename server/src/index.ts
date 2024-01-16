import { trpc } from "@elysiajs/trpc";
import { initTRPC } from "@trpc/server";
import { Elysia } from "elysia";
import { z } from "zod";
import { queryHandler } from "./service/query";

const t = initTRPC.create();
const procedure = t.procedure;

const router = t.router({
  runQuery: procedure.input(z.string()).mutation(({ input }) => {
    return queryHandler.handleQuery(input);
  }),
});

export type Router = typeof router;

const app = new Elysia().use(trpc(router)).listen(3000);
