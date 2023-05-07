import { ChatOpenAI } from "langchain/chat_models/openai";
import { CallbackManager } from "langchain/callbacks";
import { HumanChatMessage } from "langchain/schema";
import { initializeAgentExecutorWithOptions } from "langchain/agents";
import { SerpAPI } from "langchain/tools";
import { NextRequest, NextResponse } from 'next/server';

const model = new ChatOpenAI({ temperature: 0 });
const tools = [
  new SerpAPI(process.env.SERPAPI_API_KEY, {
    location: "Miami,Florida,United States",
    hl: "en",
    gl: "us",
  }),
];

const handler = async (req: NextRequest, res:NextResponse) => {
  const body = req.body;
  console.log(req.body);
  const executor = await initializeAgentExecutorWithOptions(tools, model, {
    agentType: "zero-shot-react-description",
  });
  console.log("Loaded agent.");

  const input = {input:body};

  const result = await executor.call(input);
  console.log(result);
  res.status(200).json(result.output);


}

export default handler;
