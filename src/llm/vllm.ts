export async function callVllm(messages: any[], tools?: any[]) {
  const res = await fetch("http://192.168.50.91:8000/v1/chat/completions", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "cpatonn/Qwen3-30B-A3B-Instruct-2507-AWQ-4bit",
      messages,
      tools,
      tool_choice: "auto"
    })
  });

  return res.json();
}
