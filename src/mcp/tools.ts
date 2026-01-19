import { mcpClient } from "./client.js";

export async function getLlmTools() {
  const result = await mcpClient.listTools();
  const toolsArray = result.tools ?? [];
  return toolsArray.map(t => ({
  type: "function",
  function: {
      name: t.name,
      description: t.description,
      parameters: t.inputSchema
  }
  }));
}
