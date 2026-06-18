// Mock API 层：当前不接真实 AI、不接 Supabase、不做登录和文件上传。

import { getProductBySlug, type ResultBlock } from "./products"

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export interface InterviewReportInput {
  resume: string
  jd: string
}

export async function generateInterviewReport(
  _input: InterviewReportInput,
): Promise<ResultBlock[]> {
  await delay(600)
  return getProductBySlug("interview")?.mockResult ?? []
}

export interface ContractReviewInput {
  fileName?: string
  context: string
}

export async function reviewContract(
  _input: ContractReviewInput,
): Promise<ResultBlock[]> {
  await delay(600)
  return getProductBySlug("contract")?.mockResult ?? []
}

export interface CompetitorReportInput {
  goal: string
  competitors: string
  material: string
}

export async function generateCompetitorReport(
  _input: CompetitorReportInput,
): Promise<ResultBlock[]> {
  await delay(600)
  return getProductBySlug("competitor")?.mockResult ?? []
}

export interface AgentMessage {
  role: "user" | "agent"
  content: string
}

export async function sendAgentMessage(
  _history: AgentMessage[],
  _message: string,
): Promise<AgentMessage> {
  await delay(500)
  return {
    role: "agent",
    content: "收到。我会先保持角色设定，再根据上下文给出下一步建议。",
  }
}

export interface FeedbackInput {
  productSlug: string
  reaction?: "up" | "down" | null
  comment?: string
}

export async function submitFeedback(
  _input: FeedbackInput,
): Promise<{ ok: boolean; message: string }> {
  await delay(400)
  return { ok: true, message: "已收到反馈，后续会用于实验迭代。" }
}
