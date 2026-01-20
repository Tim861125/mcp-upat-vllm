import appConfig from "../../config";

export async function callVllm(messages: any[], tools?: any[]) {
  const res = await fetch(`${appConfig.vllmApiUrl}/v1/chat/completions`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: appConfig.vllmModel,
      messages,
      tools,
      tool_choice: "auto"
    })
  });

  return res.json();
}
