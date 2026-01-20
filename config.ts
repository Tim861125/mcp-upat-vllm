import { config } from "dotenv";
config();
const appConfig = {
  upatUrl: process.env.UPAT_URL ?? "http://localhost:3008/mcp",
  vllmApiUrl: process.env.VLLM_API_URL ?? "http://localhost:8000",
  vllmModel: process.env.VLLM_MODEL ?? "gpt-4o-mini",
};

export default appConfig;
