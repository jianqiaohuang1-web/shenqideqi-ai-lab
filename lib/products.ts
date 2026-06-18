// 神奇的奇 AI Lab - AI 实验配置
// 当前只使用 mock 数据，不接真实 AI、Supabase、登录或文件上传。

export type DemoType =
  | "interview"
  | "contract"
  | "competitor"
  | "character"

export interface ResultBlock {
  title: string
  items: string[]
  tone?: "default" | "warn" | "success"
}

export interface WorkflowStep {
  title: string
  description: string
}

export interface ProductThinking {
  hypothesis: string
  mvpStatus: string[]
  nextPlans: string[]
}

export interface Product {
  id: string
  slug: string
  name: string
  subtitle: string
  description: string
  targetUser: string
  painPoint: string
  hypothesis: string
  status: "验证中" | "MVP 搭建中" | "Demo 可体验"
  tags: string[]
  detailUrl: string
  demoUrl: string | null
  demoAvailable: boolean
  background: string
  whyAI: string
  workflow: WorkflowStep[]
  currentVersion: string[]
  nextSteps: string[]
  targetUsers: { title: string; description: string }[]
  features: { title: string; description: string }[]
  thinking: ProductThinking
  demoType: DemoType
  mockResult: ResultBlock[]
  icon: string
  accent: "blue" | "violet" | "cyan" | "emerald"
}

export const mockProducts: Product[] = [
  {
    id: "p-interview",
    slug: "interview",
    name: "职得面",
    subtitle:
      "基于简历和目标岗位 JD，帮求职者看懂岗位要求、调整简历匹配方向，把过往经历转化成招聘方更容易理解的表达，并提前准备针对性面试。",
    description:
      "基于简历和目标岗位 JD，帮求职者看懂岗位要求、调整简历匹配方向，把过往经历转化成招聘方更容易理解的表达，并提前准备针对性面试。",
    targetUser:
      "强需求求职者、转型求职者、低经验 / 价格敏感用户、ChatGPT 替代用户",
    painPoint:
      "看不懂岗位要求\n知道 JD 写了什么，但判断不出岗位真正想要什么人。\n\n简历匹配不清\n不知道哪些经历该突出，也不会针对不同岗位调整表达。\n\n经历价值提炼弱\n做过事，但讲不出能力、结果和个人贡献。\n\n准备内容太通用\n题库和通用 AI 生成的问题，和个人简历及目标岗位关联不强。\n\n追问容易卡住\n一被问到项目细节、难点复盘和个人贡献，就容易讲散或答不上来。",
    hypothesis:
      "AI 是否能基于简历和岗位 JD，帮助求职者把过往经历转化成更有针对性的面试表达，从而提升面试准备效率和表达质量。",
    status: "MVP 搭建中",
    tags: ["求职", "简历分析", "岗位 JD", "面试准备"],
    detailUrl: "/experiments/interview",
    demoUrl: "https://zhidemian.shenqideqi.cn/",
    demoAvailable: true,
    background:
      "很多求职者在准备面试时，习惯先去网上找通用面试题反复刷题。但真正影响面试表现的，往往不是有没有看过题，而是能不能把自己的过往经历、项目经验和岗位要求讲清楚、讲具体、讲出价值。\n\n很多候选人其实经历并不差，甚至做过不少有含金量的项目，但在面试时容易出现表达散、重点不突出、和岗位要求对不上、讲不出结果和思考的情况。最后导致面试官没有感知到他的真实能力，求职结果也受到影响。",
    whyAI:
      "AI 擅长处理和重组文本信息，适合用来拆解 JD、分析简历匹配度、提炼经历亮点，并生成针对性的面试问题。\n\n「职得面」不会替用户编造经历，而是把用户已有经历重新组织成招聘方更容易理解的表达，再通过面试追问帮助用户提前发现表达漏洞。",
    targetUsers: [
      {
        title: "强需求求职者",
        description:
          "明确目标岗位但投递反馈不理想，需要根据 JD 判断匹配度，并针对岗位调整简历和面试准备。",
      },
      {
        title: "转型求职者",
        description:
          "想转向产品、AI 产品或产品运营方向，但不确定自己是否匹配，也不知道经历该如何重新包装。",
      },
      {
        title: "低经验 / 价格敏感用户",
        description:
          "经历普通、项目不够亮眼，需要把执行类工作提炼成岗位能理解的能力表达。",
      },
      {
        title: "ChatGPT 替代用户",
        description:
          "已经会用通用 AI 准备求职，对普通功能不敏感，但可作为后续高阶追问和深度面试准备的验证对象。",
      },
    ],
    features: [
      { title: "岗位要求提取", description: "从 JD 中提取岗位核心要求。" },
      { title: "经历匹配", description: "从用户经历中匹配相关项目和能力点。" },
      { title: "亮点梳理", description: "帮助用户提炼项目亮点、结果和思考。" },
      { title: "表达优化", description: "生成面试问题、回答思路和表达优化建议。" },
    ],
    workflow: [
      {
        title: "输入材料",
        description: "用户上传原始简历，并填写目标岗位信息和目标 JD。",
      },
      {
        title: "解析 JD",
        description:
          "AI 拆解岗位职责、任职要求、核心能力要求和理想候选人画像，帮助用户看懂岗位真正要什么。",
      },
      {
        title: "诊断简历",
        description:
          "AI 分析原始简历的问题，包括表达是否清晰、项目是否突出、能力是否匹配岗位要求。",
      },
      {
        title: "匹配分析",
        description:
          "对比简历与 JD，判断用户和目标岗位的匹配程度，找出匹配优势、能力缺口和高风险问题。",
      },
      {
        title: "经历追问",
        description:
          "围绕用户简历中的项目经历，模拟面试官可能追问的细节、难点、个人贡献和结果复盘。",
      },
      {
        title: "简历优化",
        description:
          "根据 JD 要求和匹配分析结果，改写简历中的项目经历、能力表达和关键描述，让简历更贴合目标岗位。",
      },
      {
        title: "生成最终简历",
        description:
          "输出一版针对目标岗位优化后的简历内容，方便用户复制、调整和投递。",
      },
      {
        title: "面试准备",
        description:
          "基于目标 JD 和优化后的简历，生成高频面试问题、项目追问和回答思路，帮助用户提前准备。",
      },
      {
        title: "导出结果",
        description:
          "汇总 JD 解析、匹配诊断、简历优化结果和面试准备材料，形成完整的单岗位准备结果。",
      },
    ],
    currentVersion: [
      "已完成详情页内容结构替换。",
      "当前先展示产品想法、用户痛点和核心流程。",
      "暂未接入真实模型，结果来自本地 mock 数据。",
    ],
    nextSteps: [
      "接入真实 AI 生成求职准备内容。",
      "增加简历亮点提炼和岗位匹配评分。",
      "支持用户围绕结果继续修改和练习。",
    ],
    thinking: {
      hypothesis:
        "AI 是否能基于简历和岗位 JD，帮助求职者把过往经历转化成更有针对性的面试表达，从而提升面试准备效率和表达质量。",
      mvpStatus: [
        "已完成详情页内容结构替换。",
        "当前先展示产品想法、用户痛点和核心流程。",
      ],
      nextPlans: [
        "接入真实 AI。",
        "增加岗位匹配评分。",
        "支持继续修改和练习。",
      ],
    },
    demoType: "interview",
    icon: "messages",
    accent: "blue",
    mockResult: [
      {
        title: "高频面试问题",
        items: [
          "请结合一个项目，说明你如何判断需求优先级。",
          "你如何衡量一个功能上线后的效果？",
          "遇到资源不足时，你如何取舍范围？",
        ],
      },
      {
        title: "回答建议",
        items: [
          "建议使用 STAR 结构，并补充可量化结果。",
          "突出为什么这样决策，而不只是做了什么。",
        ],
        tone: "success",
      },
    ],
  },
  {
    id: "p-contract",
    slug: "contract",
    name: "AI 合同审批助手",
    subtitle: "辅助识别合同初审中的风险点，并输出可讨论的修改建议。",
    description:
      "面向合同初审场景，把风险识别、条款解释和修改建议整理成更易读的审批辅助信息。",
    targetUser: "中小企业经营者、业务负责人、法务和商务团队",
    painPoint: "合同初审耗时，风险点容易漏看，业务方和法务之间沟通成本高。",
    hypothesis:
      "AI 能否承担合同初审前的结构化风险提示，让人工审批更聚焦关键问题。",
    status: "MVP 搭建中",
    tags: ["合同初审", "风险识别", "企业工具", "审批辅助"],
    detailUrl: "/experiments/contract",
    demoUrl: null,
    demoAvailable: false,
    background:
      "合同审批经常发生在业务推进的最后阶段，时间紧、上下文多。业务方想尽快签约，法务需要谨慎审查，双方很容易在风险理解上产生信息差。",
    whyAI:
      "合同文本包含大量固定结构和可归类风险。AI 适合先做条款提取、风险归类和解释，把人工注意力留给真正需要判断的部分。",
    targetUsers: [
      {
        title: "中小企业负责人",
        description: "缺少专职法务时，需要先了解合同里的明显风险。",
      },
      {
        title: "企业法务 / 风控",
        description: "希望减少重复初审，把精力放到高风险条款。",
      },
      {
        title: "采购 / 商务团队",
        description: "需要在签约前理解条款对交付和付款的影响。",
      },
    ],
    features: [
      { title: "风险归类", description: "按主体、付款、交付、违约等维度组织风险。" },
      { title: "条款解释", description: "把专业条款转成业务方能理解的说明。" },
      { title: "修改建议", description: "对高风险条款给出可讨论的修改方向。" },
    ],
    workflow: [
      { title: "输入合同文本", description: "先以文本粘贴方式模拟合同输入。" },
      { title: "补充业务背景", description: "说明合同类型、交易目标和关注点。" },
      { title: "生成风险清单", description: "按风险等级输出重点条款和原因。" },
      { title: "给出修改方向", description: "生成供业务和法务讨论的建议。" },
    ],
    currentVersion: [
      "已完成内容结构和详情页表达。",
      "文件上传、真实解析和模型调用暂不接入。",
      "当前仅保留 mock 数据作为产品流程占位。",
    ],
    nextSteps: [
      "补充合同类型与风险规则库。",
      "接入文档解析能力后再验证真实合同文本。",
      "增加原文定位和条款高亮。",
    ],
    thinking: {
      hypothesis:
        "AI 能否承担合同初审前的结构化风险提示，让人工审批更聚焦关键问题。",
      mvpStatus: [
        "已完成内容结构和详情页表达。",
        "当前仅保留 mock 数据作为产品流程占位。",
      ],
      nextPlans: [
        "补充风险规则库。",
        "接入文档解析能力。",
        "增加原文定位。",
      ],
    },
    demoType: "contract",
    icon: "fileCheck",
    accent: "cyan",
    mockResult: [
      {
        title: "主要风险",
        items: [
          "付款节点与验收节点没有绑定，可能产生回款风险。",
          "违约责任只约束一方，建议补充对等条款。",
        ],
        tone: "warn",
      },
    ],
  },
  {
    id: "p-competitor",
    slug: "competitor",
    name: "AI 竞品分析助手",
    subtitle: "把竞品资料整理成对比维度、机会点和产品建议。",
    description:
      "面向产品调研场景，把分散的竞品信息转换成结构统一、便于决策的分析报告。",
    targetUser: "产品经理、运营市场团队、早期创业者",
    painPoint: "竞品资料分散，分析框架不稳定，输出质量依赖个人经验。",
    hypothesis:
      "AI 能否把资料整理、横向对比和机会判断变成更标准化的产品分析流程。",
    status: "MVP 搭建中",
    tags: ["产品经理", "竞品分析", "市场调研", "结构化报告"],
    detailUrl: "/experiments/competitor",
    demoUrl: null,
    demoAvailable: false,
    background:
      "竞品分析经常从一堆网页、截图、文档和主观判断开始。真正困难的不是写报告，而是把信息放进稳定的分析框架里，形成可复用的判断。",
    whyAI:
      "AI 擅长从非结构化资料中提取要点，并按照预设维度重组信息。它可以作为产品经理的分析起点，而不是替代最终判断。",
    targetUsers: [
      {
        title: "产品经理",
        description: "需要快速产出有结构的竞品分析。",
      },
      {
        title: "运营 / 市场团队",
        description: "需要理解竞品策略、卖点和差异。",
      },
      {
        title: "创业团队",
        description: "需要在立项前判断市场机会和切入点。",
      },
    ],
    features: [
      { title: "维度拆解", description: "围绕目标自动建议分析维度。" },
      { title: "对比整理", description: "把竞品资料整理成横向对比结构。" },
      { title: "机会判断", description: "输出差异点、空白点和产品建议。" },
    ],
    workflow: [
      { title: "输入分析目标", description: "说明要研究的市场、产品或问题。" },
      { title: "输入竞品资料", description: "粘贴竞品介绍、定价、功能等信息。" },
      { title: "生成对比报告", description: "输出对比表、差异点和机会点。" },
      { title: "补充人工判断", description: "由产品经理继续筛选和修正结论。" },
    ],
    currentVersion: [
      "已完成 mock 报告结构。",
      "支持展示对比、差异、机会点和建议。",
      "暂未接入外部资料抓取。",
    ],
    nextSteps: [
      "接入真实 AI 生成结构化报告。",
      "支持自定义分析维度。",
      "增加报告导出能力。",
    ],
    thinking: {
      hypothesis:
        "AI 能否把资料整理、横向对比和机会判断变成更标准化的产品分析流程。",
      mvpStatus: [
        "已完成 mock 报告结构。",
        "支持展示对比、差异、机会点和建议。",
      ],
      nextPlans: [
        "接入真实 AI。",
        "支持自定义维度。",
        "增加报告导出。",
      ],
    },
    demoType: "competitor",
    icon: "chart",
    accent: "violet",
    mockResult: [
      {
        title: "机会点",
        items: [
          "中小团队市场存在轻量化产品空间。",
          "AI 工作流可以作为差异化入口。",
        ],
        tone: "success",
      },
    ],
  },
  {
    id: "p-agent",
    slug: "agent",
    name: "AI 角色智能体实验",
    subtitle: "验证角色型 AI Agent 的人设稳定性和多轮互动体验。",
    description:
      "围绕角色设定、上下文管理和对话风格，探索互动型智能体的产品可能性。",
    targetUser: "AI 互动体验设计者、内容产品团队、对角色 Agent 感兴趣的用户",
    painPoint: "角色型对话容易失去人设，回答像百科，长期互动缺少连续感。",
    hypothesis:
      "AI 能否通过角色设定、Prompt 和上下文策略，形成更稳定、更有沉浸感的互动体验。",
    status: "验证中",
    tags: ["AI Agent", "角色设定", "Prompt", "多轮对话"],
    detailUrl: "/experiments/agent",
    demoUrl: null,
    demoAvailable: false,
    background:
      "角色型 AI 的难点不只是能聊天，而是能在多轮互动中保持身份、语气和边界。这个实验把一个具体角色当作载体，验证人设稳定和互动节奏。",
    whyAI:
      "角色互动依赖生成式表达、上下文理解和风格保持。AI 是这个方向的核心能力，但产品体验需要通过规则、记忆和反馈机制持续调校。",
    targetUsers: [
      {
        title: "AI 体验设计者",
        description: "需要验证角色设定和对话边界。",
      },
      {
        title: "内容 / 娱乐产品团队",
        description: "探索角色互动、陪伴和剧情式体验。",
      },
      {
        title: "普通体验用户",
        description: "想尝试更有角色感的 AI 对话。",
      },
    ],
    features: [
      { title: "角色 Prompt", description: "设定语气、边界和行为方式。" },
      { title: "上下文策略", description: "保持多轮对话里的连续性。" },
      { title: "体验反馈", description: "观察角色是否稳定、是否出戏。" },
    ],
    workflow: [
      { title: "设定角色", description: "定义身份、语气、能力范围和禁区。" },
      { title: "发起对话", description: "用户用自然语言和角色互动。" },
      { title: "观察表现", description: "记录人设稳定性和上下文连续性。" },
      { title: "迭代 Prompt", description: "根据反馈调整角色策略。" },
    ],
    currentVersion: [
      "已完成人设与对话体验的产品说明。",
      "多轮对话当前仍以 mock 结果表达。",
      "暂未接入真实模型和长期记忆。",
    ],
    nextSteps: [
      "接入真实多轮对话模型。",
      "增加角色配置面板。",
      "建立人设一致性的评估指标。",
    ],
    thinking: {
      hypothesis:
        "AI 能否通过角色设定、Prompt 和上下文策略，形成更稳定、更有沉浸感的互动体验。",
      mvpStatus: [
        "已完成人设与对话体验的产品说明。",
        "多轮对话当前仍以 mock 结果表达。",
      ],
      nextPlans: [
        "接入真实多轮对话模型。",
        "增加角色配置面板。",
        "建立评估指标。",
      ],
    },
    demoType: "character",
    icon: "bot",
    accent: "emerald",
    mockResult: [
      {
        title: "示例对话",
        items: [
          "你：帮我评估一下这次产品改版的风险。",
          "机甲顾问 Agent：收到。我会先扫描关键链路，再给出风险优先级。",
        ],
      },
    ],
  },
]

export function getProductBySlug(slug: string): Product | undefined {
  return mockProducts.find((product) => product.slug === slug)
}

export function getAllSlugs(): string[] {
  return mockProducts.map((product) => product.slug)
}
