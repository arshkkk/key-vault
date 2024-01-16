import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
import { Router } from "../server/src";
import inquirer from "inquirer";
import { createSpinner } from "nanospinner";

const client = createTRPCProxyClient<Router>({
  links: [httpBatchLink({ url: "http://localhost:3000/trpc" })],
});

let isQuit = false;
while (!isQuit) {
  const { command } = await inquirer.prompt<{ command: string }>([
    { message: ">", name: "command", type: "input" },
  ]);

  if (command === "quit") {
    isQuit = true;
    process.exit(1);
  }

  const spinner = createSpinner("loading...").start();
  const { reason, success, queryType, value, exists } =
    await client.runQuery.mutate(command);

  if (success) {
    switch (queryType) {
      case "set":
        spinner.success({ text: "OK" });
        break;

      case "get":
        !value
          ? spinner.success({ text: "doesn't exist" })
          : spinner.success({ text: value?.toString?.() });
        break;

      case "has":
        spinner.success({ text: exists ? "exists" : "doesn't exist" });
        break;

      case "remove":
        spinner.success({ text: "OK" });
        break;
    }
  } else {
    spinner.error({ text: reason || "Something doesn't seem right! :(" });
  }
}
