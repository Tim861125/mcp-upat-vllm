import { initMcp } from "./mcp/client";
import { runAgent } from "./agent/toolLoop";

await initMcp();

const result = await runAgent(
  "請給我美國、台灣、日本，在檢索句為 TAC:(LED) 的專利筆數，佔比各是多少？"
);

console.log(result);
