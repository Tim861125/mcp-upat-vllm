import { Client } from '@modelcontextprotocol/sdk/client';
import { StreamableHTTPClientTransport } from '@modelcontextprotocol/sdk/client/streamableHttp.js';

export const mcpClient = new Client(
  { name: "bun-agent", version: "1.0.7" },
  { capabilities: {} }
);

export async function initMcp() {
  const transport = new StreamableHTTPClientTransport(new URL("http://localhost:3008/mcp"));

  await mcpClient.connect(transport);
}