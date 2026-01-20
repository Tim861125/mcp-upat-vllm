import { Client } from '@modelcontextprotocol/sdk/client';
import { StreamableHTTPClientTransport } from '@modelcontextprotocol/sdk/client/streamableHttp.js';
import appConfig from '../../config';

export const mcpClient = new Client(
  { name: "bun-agent", version: "1.0.7" },
  { capabilities: {} }
);

export async function initMcp() {
  const url = appConfig.upatUrl
  const transport = new StreamableHTTPClientTransport(new URL(url));

  await mcpClient.connect(transport);
}