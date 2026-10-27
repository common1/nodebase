// import prisma from "@/lib/db";
import { createAnthropic } from "@ai-sdk/anthropic";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { createOpenAI } from "@ai-sdk/openai";
import { generateText, type LanguageModel } from "ai";
import { inngest } from "./client";

const google = createGoogleGenerativeAI();
const openai = createOpenAI();
const anthropic = createAnthropic();

// Different flash versions
// gemini-3.8-flash       Too long
// gemini-3.6-flash      7.9 sec, 8.4 sec, 7.5 sec  * Use this
// gemini-3.5-flash       15 sec, 9.2 sec
// gemini-3.1-flash-lite  32 sec, 7.8 sec
// gemini-3.5-flash-lite  9 sec,  16,7 sec
export const execute = inngest.createFunction(
  { id: "execute-ai" },
  { event: "execute/ai" },
  async ({ event, step }) => {
    await step.sleep("pretend", "5s");

    const { steps: geminiSteps } = await step.ai.wrap(
      "gemini-generate-text",
      generateText,
      {
        model: google("gemini-3.6-flash"),
        system: "You are a helpful assistant.",
        prompt: "What is 2 + 2?",
      },
    );

    // const { steps: openaiSteps } = await step.ai.wrap(
    //   "openai-generate-text",
    //   generateText,
    //   {
    //     model: openai("gpt-4") as unknown as LanguageModel,
    //     system: "You are a helpful assistant.",
    //     prompt: "What is 2 + 2?",
    //   },
    // );

    // const { steps: anthropicSteps } = await step.ai.wrap(
    //   "anthropic-generate-text",
    //   generateText,
    //   {
    //     model: anthropic("claude-sonnet-4-5") as unknown as LanguageModel,
    //     system: "You are a helpful assistant.",
    //     prompt: "What is 2 + 2?",
    //   },
    // );

    return {
      geminiSteps,
      // openaiSteps,
      // anthropicSteps,
    };
  },
);
