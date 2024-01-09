import { Hono } from "hono";
import { logger } from "hono/logger";
import { secureHeaders } from "hono/secure-headers";
import { showRoutes } from "hono/dev";

const app = new Hono();

// add the middleware to your router
app.use("*", logger());
app.use("*", secureHeaders());

app.get("/", (c) => c.text("Hello Hono!"));
app.get("/hey", (c) => c.text("hey Hono!"));
showRoutes(app);

export default app;
