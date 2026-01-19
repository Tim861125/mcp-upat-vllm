import { callVllm } from "../llm/vllm";
import { mcpClient } from "../mcp/client";
import { getLlmTools } from "../mcp/tools";

interface ToolCall {
  id: string;
  type: "function";
  function: {
    name: string;
    arguments: string; // JSON string
  };
}

function parseTextToolCalls(content: string): ToolCall[] {
    const toolCallRegex = /<tool_call>\s*\n?([\s\S]*?)\s*\n?<\/tool_call>/g;
    const results: ToolCall[] = [];
    let match;

    while ((match = toolCallRegex.exec(content)) !== null) {
      try {
        if (!match[1]) continue;
        const parsed = JSON.parse(match[1]);
        results.push({
          id: `call_${Date.now()}_${results.length}`,
          type: "function",
          function: {
            name: parsed.name,
            arguments: JSON.stringify(parsed.arguments || {}),
          },
        });
      } catch (error) {
        console.error("Failed to parse text tool call:", error);
      }
    }

    return results;
  }

export async function runAgent(userInput: string) {
  const messages: any[] = [
    { role: "system", content: "You are a helpful assistant." },
    { role: "user", content: userInput }
  ];

  const tools = await getLlmTools();

  while (true) {
    console.log("Messages so far:\n", JSON.stringify(messages, null, 2));
    const llmRes = await callVllm(messages, tools) as any;
    const msg = llmRes.choices[0].message;
    console.log("LLM Response:\n", JSON.stringify(msg, null, 2));

    if (msg.content && !msg.tool_calls?.length) {
      const parsedToolCalls = parseTextToolCalls(msg.content);

      if (parsedToolCalls.length > 0) {
        msg.tool_calls = parsedToolCalls;
        msg.content = null;
      }
    }
    console.log("LLM Response fix:\n", JSON.stringify(msg, null, 2));
    // ✅ 沒有 tool call → 結束
    if (!msg.tool_calls || msg.tool_calls.length === 0) {
      return msg.content;
    }

    // ✅ 有 tool call → 執行
    for (const call of msg.tool_calls) {
      const result = await mcpClient.callTool({
        name: call.function.name,
        arguments: JSON.parse(call.function.arguments)
      });

      messages.push({
        role: "tool",
        tool_name: call.function.name,
        content: JSON.stringify(result)
      });
    }
  }
}
