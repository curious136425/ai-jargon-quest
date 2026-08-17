import type { Level } from '../types/game'

export const levels: Level[] = [
  {
    id: 'l01-ai-assistant',
    order: 1,
    zoneId: 'dialogue-valley',
    zoneName: '对话谷',
    name: 'AI Assistant',
    zhName: 'AI 助手',
    termKind: 'product',
    termKindLabel: '应用词',
    kind: 'concept',
    problem:
      '小妖把十几篇网页丢在收藏夹里。她想找个能听懂日常语言、帮她整理资料的入口，却分不清 ChatGPT 和 AI 是什么关系。',
    simpleExplanation: 'AI 助手就是你能直接对话、请它帮忙的 AI 应用。',
    accurateExplanation:
      'AI 助手是面向用户的应用，它通常把模型、界面、规则和工具组合起来。ChatGPT 是 AI 助手的一种，AI 则是更大的概念。',
    story: [
      '小妖打开 ChatGPT，把一篇刚收藏的文章贴进去。',
      '她请它用三句话讲给零基础的人听，屏幕很快给出一份短摘要。',
      '她第一次有了一个可以一起整理资料的搭档。',
    ],
    analogy:
      '像手机上的导航软件。你操作的是软件，路线计算来自它背后的能力。',
    confusion:
      'AI 助手是你正在使用的产品。模型是它可能调用的核心能力，两者可以分开理解。',
    abilityCard: {
      id: 'card-dialogue-entry',
      name: '对话入口',
      description: '找到一个能接住日常语言和实际任务的 AI 应用。',
      icon: '💬',
    },
    interaction: {
      type: 'scenario',
      prompt: '小妖现在想先找一个能直接对话并整理文章的入口。她应该打开什么？',
      answerId: 'l01-use-assistant',
      options: [
        {
          id: 'l01-use-assistant',
          text: '一个 AI 助手应用',
          feedback: '答对了。小妖先进入应用，再通过它调用模型和工具。',
        },
        {
          id: 'l01-model-list',
          text: '一份写着模型名字的清单',
          feedback: '模型名字说明背后可能用了什么能力，清单本身不能接住任务。',
        },
        {
          id: 'l01-article-folder',
          text: '一个装满网页的收藏夹',
          feedback: '收藏夹能放资料，却不会理解请求或帮她整理。',
        },
      ],
    },
  },
  {
    id: 'l02-model',
    order: 2,
    zoneId: 'dialogue-valley',
    zoneName: '对话谷',
    name: 'Model',
    zhName: '模型',
    termKind: 'common',
    termKindLabel: '基础词',
    kind: 'concept',
    problem:
      '小妖看到同一个 AI 助手里有几个模型选项。她想知道，换了模型为什么速度和效果会变。',
    simpleExplanation: 'Model 是 AI 助手背后负责处理输入、生成结果的核心。',
    accurateExplanation:
      '模型是从数据中训练出的数学系统。它接收输入并计算输出，不同模型在能力、速度和成本上会有差别。',
    story: [
      '小妖先用轻量模型概括一篇短文，很快得到答案。',
      '她换了另一个模型处理一份长笔记，结果更完整，却等得更久。',
      '她把模型记成了助手背后的不同引擎。',
    ],
    analogy:
      '像相机 App 里的不同镜头。界面还是那个 App，选用的镜头会改变成像效果。',
    confusion:
      '应用负责让人使用，模型负责处理输入。一个应用可以提供多个模型，一个模型也能被多个应用调用。',
    abilityCard: {
      id: 'card-model-recognition',
      name: '模型识别',
      description: '看懂应用和模型各自负责什么。',
      icon: '🧠',
    },
    interaction: {
      type: 'scenario',
      prompt: '下面哪个东西最接近 Model？',
      answerId: 'l02-trained-system',
      options: [
        {
          id: 'l02-trained-system',
          text: '负责把输入计算成输出的已训练系统',
          feedback: '答对了。模型接收输入，再根据训练得到的参数生成输出。',
        },
        {
          id: 'l02-send-button',
          text: '聊天窗口里的发送按钮',
          feedback: '发送按钮属于应用界面，它只负责把你的内容送出去。',
        },
        {
          id: 'l02-article-file',
          text: '小妖保存的一篇文章',
          feedback: '文章可以成为输入或资料，它本身不会计算并生成答案。',
        },
      ],
    },
  },
  {
    id: 'l03-prompt',
    order: 3,
    zoneId: 'dialogue-valley',
    zoneName: '对话谷',
    name: 'Prompt',
    zhName: '提示词',
    termKind: 'common',
    termKindLabel: '基础词',
    kind: 'concept',
    problem:
      '小妖只写下“整理一下”，AI 给出的结果又长又散。她需要把眼前的任务交代清楚。',
    simpleExplanation: 'Prompt 是你这一次交给 AI 的话和要求。',
    accurateExplanation:
      'Prompt 是发送给模型的输入，可以包含任务、问题、材料、示例和输出要求。清楚的 Prompt 能减少猜测，仍不能保证结果一定正确。',
    story: [
      '小妖重新输入“请从这三篇笔记中找出共同主题，整理成五条清单”。',
      '这次答案刚好能贴进她的学习记录。',
      '她把这句话存进了自己的提问本。',
    ],
    analogy:
      '像在打印店下单。说清要印什么、印几份、用什么尺寸，店员才好照着做。',
    confusion:
      'Prompt 负责提出这次要求。Context 还包括模型当前能看到的对话、文件片段和其他信息。',
    abilityCard: {
      id: 'card-clear-request',
      name: '清楚提问',
      description: '把任务和想要的结果交代明白。',
      icon: '📝',
    },
    interaction: {
      type: 'chip-builder',
      prompt: '小妖要让 AI 整理三篇笔记。选出两块信息，补全这条 Prompt。',
      frame: '请帮我把这三篇笔记……',
      selectionMode: 'unordered',
      requiredChipIds: ['l03-find-theme', 'l03-five-items'],
      chips: [
        {
          id: 'l03-find-theme',
          text: '找出共同主题',
          feedback: '这块说明要做什么，是有用的任务信息。',
        },
        {
          id: 'l03-five-items',
          text: '整理成五条清单',
          feedback: '这块说明结果要长什么样，是有用的输出要求。',
        },
        {
          id: 'l03-purple',
          text: '记住我喜欢紫色',
          feedback: '这次任务用不到颜色偏好，放进去只会添杂音。',
        },
        {
          id: 'l03-weather',
          text: '顺便猜猜今天的天气',
          feedback: '这是另一个任务，会让整理目标变散。',
        },
      ],
      retryFeedback: '有一块信息和整理笔记无关，换一块再试。',
      successFeedback: '这条 Prompt 已经说清了任务和输出样子。',
    },
  },
  {
    id: 'l04-context',
    order: 4,
    zoneId: 'dialogue-valley',
    zoneName: '对话谷',
    name: 'Context',
    zhName: '上下文',
    termKind: 'common',
    termKindLabel: '基础词',
    kind: 'concept',
    problem:
      '小妖让 AI 判断文章是否适合新手，却只发了标题。AI 没看到正文，也不知道读者是谁。',
    simpleExplanation: 'Context 是 AI 这次回答时能够用到的全部信息。',
    accurateExplanation:
      'Context 是当前请求中提供给模型的信息总和，常见来源有指令、对话内容、文件片段和工具结果。它受容量限制，也不会自动变成跨对话的永久记忆。',
    story: [
      '小妖把文章全文和“读者刚开始学 AI”一起放进当前对话。',
      'AI 标出三处难懂的段落，并改成更直白的说法。',
      '同一句问题配上不同资料，答案也跟着变了。',
    ],
    analogy:
      '像请朋友帮你挑衣服。朋友看见场合、天气和衣柜，才有足够信息做判断。',
    confusion:
      'Context 管眼前这次回答。Memory 保存的是系统跨任务留下的部分信息，具体范围由产品功能决定。',
    abilityCard: {
      id: 'card-useful-context',
      name: '带齐资料',
      description: '让 AI 看见完成当前任务所需的信息。',
      icon: '🎒',
    },
    interaction: {
      type: 'chip-builder',
      prompt: '小妖想判断一篇文章是否适合 AI 新手。选出最需要的两块 Context。',
      frame: '这篇文章适合我的读者吗？',
      selectionMode: 'unordered',
      requiredChipIds: ['l04-full-article', 'l04-audience'],
      chips: [
        {
          id: 'l04-full-article',
          text: '文章全文',
          feedback: 'AI 需要看见正文，才能判断内容和表达难度。',
        },
        {
          id: 'l04-audience',
          text: '读者是刚接触 AI 的成年人',
          feedback: '这块说明要替谁判断，能帮助 AI 把握难度。',
        },
        {
          id: 'l04-breakfast',
          text: '小妖上周早餐吃了面包',
          feedback: '早餐和这次文章判断没有关系。',
        },
        {
          id: 'l04-cover-color',
          text: '另一个项目使用了蓝色封面',
          feedback: '另一个项目的封面颜色不能帮助 AI 判断文章难度。',
        },
      ],
      retryFeedback: '当前任务还缺一块真正有用的信息，再换一块。',
      successFeedback: '现在 AI 既看得到文章，也知道要替谁判断。',
    },
  },
  {
    id: 'l05-token',
    order: 5,
    zoneId: 'dialogue-valley',
    zoneName: '对话谷',
    name: 'Token',
    zhName: '文本单位',
    termKind: 'technical',
    termKindLabel: '技术词',
    kind: 'concept',
    problem:
      '长笔记发到一半，助手提示内容太多。小妖第一次注意到，AI 计算文字有自己的计量方式。',
    simpleExplanation: 'Token 是模型处理文字时使用的小块。',
    accurateExplanation:
      '模型会按自己的分词方式把文本切成 Token。一个 Token 可能是一个字、词的一部分、标点或其他字符组合，具体切法会随模型和语言变化。输入和输出都会占用 Token。',
    story: [
      '小妖把一本长 PDF 一口气贴进对话，内容没能全部放进去。',
      '她改成按章节处理，每章先做摘要，再汇总主题。',
      '资料终于顺利整理完。',
    ],
    analogy:
      '像搬家时把物品装进箱子。箱子的数量取决于东西怎么分装，不能简单按物品件数计算。',
    confusion:
      'Token 不固定等于一个汉字，也不固定等于一个单词。字符数只能帮助估算。',
    abilityCard: {
      id: 'card-token-awareness',
      name: '容量意识',
      description: '知道长资料需要切分，也要给回答留下空间。',
      icon: '🧩',
    },
    workbenchReward: {
      id: 'module-dialogue',
      name: '对话模块',
      description: '小妖已经能选择助手、识别模型，并带着清楚的要求和资料展开对话。',
      icon: '💬',
    },
    interaction: {
      type: 'scenario',
      prompt: '下面哪种说法最准确？',
      answerId: 'l05-text-chunks',
      options: [
        {
          id: 'l05-text-chunks',
          text: 'Token 是模型处理文本时使用的小块',
          feedback: '答对了。具体怎么切分，会受到语言和模型的影响。',
        },
        {
          id: 'l05-one-character',
          text: '每个 Token 永远等于一个汉字',
          feedback: 'Token 没有这种固定换算。字、标点和字符组合都可能采用不同切法。',
        },
        {
          id: 'l05-game-coin',
          text: 'Token 是答题赢来的游戏金币',
          feedback: '游戏里可以把它画成小方块，真实含义仍是模型处理文本时使用的单位。',
        },
      ],
    },
  },
  {
    id: 'l06-workspace',
    order: 6,
    zoneId: 'data-forest',
    zoneName: '资料森林',
    name: 'Workspace',
    zhName: '工作空间',
    termKind: 'product',
    termKindLabel: '产品词',
    kind: 'concept',
    problem:
      '小妖的聊天在三个窗口，文件躺在下载目录，规则写在便签里。她每次继续整理，都要重新找一遍。',
    simpleExplanation: 'Workspace 是围绕一个目标，把聊天、文件和规则放在一起的工作空间。',
    accurateExplanation:
      'Workspace 是产品用来组织长期任务的容器，常见内容包括对话、资料、说明和协作成员。不同产品可能把类似功能叫作 Project、Space 或 Workspace，范围并不完全一样。',
    story: [
      '小妖新建了“AI 学习台”工作空间，把文章、笔记和整理规则都放进去。',
      '第二天打开时，她从昨天的资料继续往下做。',
      '桌面上那堆临时文件也少了。',
    ],
    analogy:
      '像为一门课准备专用书桌。课本、作业和课程表都放在这张桌上，换一天也接得上。',
    confusion:
      'Workspace 负责把相关东西集中管理。它能否记住跨对话信息，还要看产品有没有相应的 Memory 功能。',
    abilityCard: {
      id: 'card-workspace-order',
      name: '项目归位',
      description: '让同一个长期目标的聊天、文件和规则待在一起。',
      icon: '🗂️',
    },
    interaction: {
      type: 'scenario',
      prompt: '哪种做法最像建立 Workspace？',
      answerId: 'l06-group-project',
      options: [
        {
          id: 'l06-group-project',
          text: '为 AI 学习台建一个空间，集中放聊天、文件和规则',
          feedback: '答对了。这个空间围绕同一个长期目标组织资料。',
        },
        {
          id: 'l06-new-chat',
          text: '每次开新聊天，再临时到各处找文件',
          feedback: '这样仍会让资料散在不同地方，继续任务时还得重新收集。',
        },
        {
          id: 'l06-rename-model',
          text: '给当前模型换一个名字',
          feedback: '模型名称不会替你组织聊天、文件和项目规则。',
        },
      ],
    },
  },
  {
    id: 'l07-memory',
    order: 7,
    zoneId: 'data-forest',
    zoneName: '资料森林',
    name: 'Memory',
    zhName: '记忆',
    termKind: 'product',
    termKindLabel: '产品功能词',
    kind: 'concept',
    problem:
      '小妖每次整理文章都要重复说明“给零基础读者写，保留原文来源”。她想让支持记忆的助手以后还记得这项偏好。',
    simpleExplanation: 'Memory 是 AI 应用跨对话保留下来的部分有用信息。',
    accurateExplanation:
      '在支持 Memory 的产品里，系统可以保存或引用部分偏好、目标和过往信息，用于之后的回答。保存范围和控制方式由产品决定，它不会完整保存每段对话的每个细节。',
    story: [
      '小妖让助手记住，她的摘要面向零基础读者，还要保留来源。',
      '几天后，她新开对话整理文章，助手主动沿用了这两条要求。',
      '小妖仍检查了一遍，确认来源没有漏。',
    ],
    analogy:
      '像常去的咖啡店记得你少糖。店员记住的是有用偏好，不会背下你们每次聊天的全部内容。',
    confusion:
      'Memory 面向之后的任务，Context 面向当前回答。重要原文仍应放进资料或当前对话，不能只靠记忆保存。',
    abilityCard: {
      id: 'card-useful-memory',
      name: '保留偏好',
      description: '让支持记忆的应用在之后继续参考重要偏好。',
      icon: '🔖',
    },
    interaction: {
      type: 'scenario',
      prompt: '哪条信息最适合交给 Memory？',
      answerId: 'l07-lasting-preference',
      options: [
        {
          id: 'l07-lasting-preference',
          text: '我的摘要长期面向零基础读者，并保留来源',
          feedback: '答对了。这是会在以后反复用到的偏好。',
        },
        {
          id: 'l07-full-book',
          text: '把这本两百页的书逐字永久记住',
          feedback: 'Memory 适合保存有用偏好和要点，大段原文应放进文件或知识库。',
        },
        {
          id: 'l07-one-time-code',
          text: '这次登录使用的一次性验证码',
          feedback: '这是临时且敏感的信息，不适合交给长期记忆。',
        },
      ],
    },
  },
  {
    id: 'l08-knowledge-base',
    order: 8,
    zoneId: 'data-forest',
    zoneName: '资料森林',
    name: 'Knowledge Base',
    zhName: '知识库',
    termKind: 'common',
    termKindLabel: '基础词',
    kind: 'concept',
    problem:
      '小妖已经存了很多文章，可文件名有的叫“最终版”，有的只剩日期。她能保存，却很难找回。',
    simpleExplanation: 'Knowledge Base 是整理好、方便查找和使用的一组资料。',
    accurateExplanation:
      '知识库是按一定结构收集、更新和查询的资料集合。它可以包含文档、条目和元数据，也可以作为检索系统的数据来源。',
    story: [
      '小妖删掉重复文件，给每篇文章补上主题、来源和日期。',
      '她再按“Prompt”搜索，马上找到三条相关笔记。',
      '散落的收藏终于有了秩序。',
    ],
    analogy:
      '像图书馆。书多只是库存，分类、编号和目录让人真正找得到。',
    confusion:
      '知识库负责保存和组织资料。RAG 会在回答前从知识库里找相关内容，再把找到的内容交给模型。',
    abilityCard: {
      id: 'card-knowledge-library',
      name: '资料成库',
      description: '把资料整理成能搜索、能更新的集合。',
      icon: '📚',
    },
    interaction: {
      type: 'scenario',
      prompt: '下面哪一个更像可用的 Knowledge Base？',
      answerId: 'l08-tagged-library',
      options: [
        {
          id: 'l08-tagged-library',
          text: '有主题、来源、日期并且能搜索的文章库',
          feedback: '答对了。资料经过整理后，才能稳定地找回和使用。',
        },
        {
          id: 'l08-download-pile',
          text: '下载目录里两百个名字混乱的文件',
          feedback: '这些资料虽然保存下来了，却缺少方便查询的组织方式。',
        },
        {
          id: 'l08-trained-knowledge',
          text: '让模型只凭训练时学到的内容回答',
          feedback: '模型训练时学到的内容不等于你自己建立和管理的知识库。',
        },
      ],
    },
  },
  {
    id: 'l09-rag',
    order: 9,
    zoneId: 'data-forest',
    zoneName: '资料森林',
    name: 'RAG',
    zhName: '检索增强生成',
    termKind: 'technical',
    termKindLabel: '技术词',
    kind: 'concept',
    problem:
      '知识库已经整理好，可小妖一提问，助手仍然凭一般知识回答。她希望每次先查自己的资料再作答。',
    simpleExplanation: 'RAG 会先找资料，再让模型参考找到的内容回答。',
    accurateExplanation:
      'RAG 是检索增强生成。系统先从外部资料中检索与问题相关的内容，把结果加入当前 Context，再由模型生成回答。这项做法没有重新训练模型。',
    story: [
      '小妖问“Prompt 和 Context 有什么区别”。',
      '系统先从知识库找出两张术语卡，再把相关段落交给模型。',
      '答案附上了来源，小妖能回去核对。',
    ],
    analogy:
      '像写开卷题。先从书里翻到相关页，再根据找到的内容组织答案。',
    confusion:
      '知识库是资料所在的地方，RAG 是查找并带回资料的过程。更新知识库后，后续检索就能用到新内容，无需重新训练模型。',
    abilityCard: {
      id: 'card-grounded-answer',
      name: '有据可查',
      description: '回答前先找出相关资料，再让模型参考。',
      icon: '🧭',
    },
    workbenchReward: {
      id: 'module-knowledge',
      name: '资料模块',
      description: '小妖已经能集中资料、保留偏好、建立知识库并检索回答。',
      icon: '📚',
    },
    interaction: {
      type: 'tap-order',
      prompt: '按 RAG 的实际顺序点击三张卡。',
      correctOrder: ['l09-retrieve', 'l09-add-context', 'l09-generate'],
      steps: [
        {
          id: 'l09-generate',
          text: '模型参考找到的内容生成回答',
          correctPlacementFeedback: '生成放在最后，模型现在已经拿到相关资料。',
          wrongPlacementFeedback: '这一步要放在最后。模型先拿到相关资料，再组织回答。',
        },
        {
          id: 'l09-retrieve',
          text: '从知识库检索相关内容',
          correctPlacementFeedback: '检索先发生，系统已经找到了相关资料。',
          wrongPlacementFeedback: '检索应先发生。系统得先找到相关资料。',
        },
        {
          id: 'l09-add-context',
          text: '把检索结果加入当前 Context',
          correctPlacementFeedback: '找到的资料已经放进模型这次能看到的信息中。',
          wrongPlacementFeedback: '这一步要接在检索之后，手里有资料才能放进 Context。',
        },
      ],
      retryFeedback: '顺序还差一点。记住先找资料，再带进 Context，最后回答。',
      successFeedback: 'RAG 路线接通了。检索、加入 Context、生成回答。',
    },
  },
  {
    id: 'l10-workflow',
    order: 10,
    zoneId: 'automation-workshop',
    zoneName: '自动化工坊',
    name: 'Workflow',
    zhName: '工作流',
    termKind: 'common',
    termKindLabel: '基础词',
    kind: 'concept',
    problem:
      '小妖每周都会收一批新文章。手动重复下载、去重和贴标签时，她总会漏掉一步。',
    simpleExplanation: 'Workflow 是事先排好、可以重复执行的一串步骤。',
    accurateExplanation:
      'Workflow 把任务拆成有顺序的步骤，并规定每一步的输入、处理和输出。它可以由人、自动化程序或 AI 共同执行。',
    story: [
      '小妖写下一套固定流程。',
      '她先收集新链接，再去重和补标签，最后存进知识库。',
      '下一周照着走，她没有再把同一篇文章存三遍。',
    ],
    analogy:
      '像洗衣机的程序。进水、洗涤和脱水按顺序执行，每次都能重复。',
    confusion:
      'Workflow 说明步骤怎样衔接。Agent 可以在执行中根据目标和结果选择下一步，灵活度更高。',
    abilityCard: {
      id: 'card-repeatable-flow',
      name: '流程成线',
      description: '把重复工作排成清楚的步骤。',
      icon: '🔁',
    },
    workbenchReward: {
      id: 'module-workflow',
      name: '流程模块',
      description: '工作台已经有了一条可以反复执行的资料整理路线。',
      icon: '⚙️',
    },
    interaction: {
      type: 'tap-order',
      prompt: '按小妖每周整理新文章的顺序点击三张卡。',
      correctOrder: ['l10-collect', 'l10-clean', 'l10-store'],
      steps: [
        {
          id: 'l10-store',
          text: '把处理好的资料存进知识库',
          correctPlacementFeedback: '资料已经整理好，现在可以入库。',
          wrongPlacementFeedback: '入库放在最后。新资料还要先收集并整理。',
        },
        {
          id: 'l10-collect',
          text: '收集本周的新文章链接',
          correctPlacementFeedback: '先拿到新链接，流程有了输入。',
          wrongPlacementFeedback: '收集应放在最前面，没有新链接就没有后续资料。',
        },
        {
          id: 'l10-clean',
          text: '去重并补上主题、来源和日期',
          correctPlacementFeedback: '资料已经去重并补齐了查询所需的信息。',
          wrongPlacementFeedback: '先收集资料，再去重和补标签，最后才入库。',
        },
      ],
      retryFeedback: '流程顺序还没接好。先收集，再整理，最后入库。',
      successFeedback: '每周整理流程已经排好，可以反复使用。',
    },
  },
  {
    id: 'l11-skill',
    order: 11,
    zoneId: 'automation-workshop',
    zoneName: '自动化工坊',
    name: 'Skill',
    zhName: '技能',
    termKind: 'ecosystem',
    termKindLabel: '生态词',
    kind: 'concept',
    problem:
      '小妖已经摸索出一套好用的文章整理方法。每开一个新任务，她还得重新解释格式和检查项。',
    simpleExplanation: 'Skill 是一套可以反复拿来用的做事方法。',
    accurateExplanation:
      'Skill 是生态词，不同平台的定义会有差异。这里把它理解为可复用的任务做法，其中可以包含指令、参考资料、模板、脚本或工具说明。',
    story: [
      '小妖把“摘出观点、保留来源、加三个标签、最后自查”装成一张整理 Skill。',
      '下次她只选用这张卡，助手便按同一套办法处理新文章。',
      '她把省下来的时间用来核对内容。',
    ],
    analogy:
      '像一张反复使用的菜谱。材料会换，步骤和火候提醒可以沿用。',
    confusion:
      'Skill 规定某类任务怎么做，Workflow 连接一项工作的多个步骤。某些平台会把 Skill 做成指令与脚本的组合，名称和能力以产品说明为准。',
    abilityCard: {
      id: 'card-reusable-method',
      name: '方法复用',
      description: '把好用的任务做法保存下来，下次继续使用。',
      icon: '📜',
    },
    interaction: {
      type: 'scenario',
      prompt: '下面哪项最像小妖的 Skill？',
      answerId: 'l11-reusable-method',
      options: [
        {
          id: 'l11-reusable-method',
          text: '一套可复用的文章整理说明，附带模板和检查项',
          feedback: '答对了。资料会变化，这套做法可以反复使用。',
        },
        {
          id: 'l11-one-answer',
          text: '某一次聊天里生成的一段摘要',
          feedback: '这是一份任务结果，还没有变成可复用的做法。',
        },
        {
          id: 'l11-model-name',
          text: '一个模型的名称',
          feedback: '模型负责处理输入，Skill 保存的是某类任务的做法。',
        },
      ],
    },
  },
  {
    id: 'l12-tool-use',
    order: 12,
    zoneId: 'automation-workshop',
    zoneName: '自动化工坊',
    name: 'Tool Use',
    zhName: '工具使用',
    termKind: 'technical',
    termKindLabel: '技术词',
    kind: 'concept',
    problem:
      '小妖让助手查一篇刚发布的网页，助手手里只有旧知识。她需要给它能访问外部信息的工具。',
    simpleExplanation: 'Tool Use 是让 AI 调用外部能力去查信息或做动作。',
    accurateExplanation:
      '工具使用通常由模型提出带参数的调用请求，再由应用执行搜索、计算、读文件或写入系统等操作，并把结果返回给模型。具体权限应由应用和用户控制。',
    story: [
      '小妖允许助手使用网页搜索和文件保存工具。',
      '助手打开新文章，读到发布日期，再把摘要写入指定资料夹。',
      '小妖看到保存提示后才继续下一篇。',
    ],
    analogy:
      '像厨师拿起刀和秤。会想菜谱还不够，动手处理食材要靠合适的工具。',
    confusion:
      '模型可以只生成文字。工具让它接触实时数据或执行外部动作，使用范围受权限限制。',
    abilityCard: {
      id: 'card-tool-use',
      name: '调用工具',
      description: '让 AI 在许可范围内查询外部信息或执行动作。',
      icon: '🛠️',
    },
    interaction: {
      type: 'scenario',
      prompt: '小妖要核对今天刚发布的文章日期，哪种做法最合适？',
      answerId: 'l12-web-tool',
      options: [
        {
          id: 'l12-web-tool',
          text: '调用网页搜索或浏览工具，读取文章页面',
          feedback: '答对了。工具可以把刚发布的信息带回当前任务。',
        },
        {
          id: 'l12-guess',
          text: '让模型凭已有知识猜日期',
          feedback: '模型已有知识可能没有这篇新文章，猜测也无法提供可靠来源。',
        },
        {
          id: 'l12-bigger-model',
          text: '只换一个更大的模型，不给它网页访问能力',
          feedback: '换模型不会自动获得网页访问权限，实时信息仍需要合适的工具。',
        },
      ],
    },
  },
  {
    id: 'l13-agent',
    order: 13,
    zoneId: 'automation-workshop',
    zoneName: '自动化工坊',
    name: 'Agent',
    zhName: '智能体',
    termKind: 'technical',
    termKindLabel: '技术词',
    kind: 'concept',
    problem:
      '工具已经备齐，小妖仍要亲自决定先搜什么、哪篇值得留、漏了什么。她想把完整目标交出去，再在关键处检查。',
    simpleExplanation: 'Agent 是能围绕目标选择步骤、使用工具并检查结果的 AI 系统。',
    accurateExplanation:
      'Agent 通常让模型在一个执行循环里观察当前状态、决定行动、调用工具并根据结果继续，直到完成目标、遇到限制或请求人接手。自主程度和权限由具体系统决定。',
    story: [
      '小妖交出目标，让 Agent 找三篇适合新手的 RAG 文章并存成摘要。',
      '它先搜索，再检查来源和难度，随后写入知识库。',
      '发现一篇没有作者信息时，它放弃那篇并继续寻找。',
    ],
    analogy:
      '像把“办好一场读书会”交给助理。助理会看进展改安排，缺资料时再去补。',
    confusion:
      'Workflow 预先规定一条步骤路线。Agent 会依据目标和每一步结果选择接下来的动作，也需要权限、边界和检查。',
    abilityCard: {
      id: 'card-goal-execution',
      name: '目标执行',
      description: '让 AI 围绕目标选择行动，并根据结果继续。',
      icon: '🤖',
    },
    workbenchReward: {
      id: 'module-agent',
      name: 'Agent 模块',
      description: '工作台已经能围绕目标使用工具，并在执行后检查结果。',
      icon: '🤖',
    },
    interaction: {
      type: 'tap-order',
      prompt: 'Agent 接到“找到三篇可靠的新手 RAG 文章并入库”后，按一个最小执行循环排序。',
      correctOrder: ['l13-observe', 'l13-act', 'l13-check'],
      steps: [
        {
          id: 'l13-check',
          text: '检查结果，决定完成还是继续',
          correctPlacementFeedback: '执行后检查结果，Agent 才知道任务是否完成。',
          wrongPlacementFeedback: '检查放在行动之后。先做出动作，才有结果可看。',
        },
        {
          id: 'l13-observe',
          text: '查看目标、现有资料和限制',
          correctPlacementFeedback: '先看清目标和限制，Agent 才能选择动作。',
          wrongPlacementFeedback: '观察应放在最前面。Agent 需要先知道目标、现状和限制。',
        },
        {
          id: 'l13-act',
          text: '选择动作并调用搜索或保存工具',
          correctPlacementFeedback: 'Agent 已经根据现状选了一项行动。',
          wrongPlacementFeedback: '行动接在观察之后，再由检查判断是否需要继续。',
        },
      ],
      retryFeedback: '执行循环还没接好。先观察，再行动，随后检查。',
      successFeedback: 'Agent 的最小执行循环已经运转起来。',
    },
  },
  {
    id: 'l14-api',
    order: 14,
    zoneId: 'connection-city',
    zoneName: '连接之城',
    name: 'API',
    zhName: '应用程序接口',
    termKind: 'technical',
    termKindLabel: '技术词',
    kind: 'concept',
    problem:
      '小妖每天从一个阅读应用发现新文章，再手动复制到整理工具。她想让两个软件直接传递链接和资料。',
    simpleExplanation: 'API 是软件和软件按约定互相请求能力的接口。',
    accurateExplanation:
      'API 定义可调用的操作、输入、输出和规则。一个程序可以向另一个程序发送请求并接收结果，不必通过人手操作对方的界面。',
    story: [
      '小妖的阅读应用发现新链接后，按 API 要求发送标题、网址和发布日期。',
      '整理工具收到数据，返回“已保存”的结果。',
      '她不用再逐条复制。',
    ],
    analogy:
      '像餐厅的点菜单。可点的菜、填写方式和返回结果都有约定，后厨才能接单。',
    confusion:
      'API 是某项软件能力的具体接口。MCP 提供 AI 应用连接和发现工具、资源的一套较统一协议，很多 MCP 工具背后仍会调用 API。',
    abilityCard: {
      id: 'card-software-handshake',
      name: '软件握手',
      description: '让两个软件按约定传递请求和结果。',
      icon: '🤝',
    },
    interaction: {
      type: 'scenario',
      prompt: '下面哪个场景真正用到了 API？',
      answerId: 'l14-software-request',
      options: [
        {
          id: 'l14-software-request',
          text: '阅读应用按约定把文章数据发给整理工具，并收到保存结果',
          feedback: '答对了。两个软件按照接口规则交换了请求和结果。',
        },
        {
          id: 'l14-manual-copy',
          text: '小妖在两个窗口之间手动复制标题',
          feedback: '这是人在操作两个界面，软件之间没有直接发出请求。',
        },
        {
          id: 'l14-read-pdf',
          text: '小妖打开一份 PDF 自己阅读',
          feedback: '这次动作只发生在人和文件之间，没有软件互相调用。',
        },
      ],
    },
  },
  {
    id: 'l15-mcp',
    order: 15,
    zoneId: 'connection-city',
    zoneName: '连接之城',
    name: 'MCP',
    zhName: '模型上下文协议',
    termKind: 'protocol',
    termKindLabel: '协议词',
    kind: 'concept',
    problem:
      '小妖陆续接入书签、笔记和日历。每换一个 AI 应用，她都要重新研究连接方式。',
    simpleExplanation: 'MCP 是让 AI 应用用较统一方式发现和连接工具、资料的协议。',
    accurateExplanation:
      'Model Context Protocol 采用客户端和服务器结构。MCP 服务器可以向 AI 应用提供工具、资源和提示模板，应用据此发现可用能力并按协议调用，同时保留权限边界。',
    story: [
      '小妖把笔记库和书签服务接成两个 MCP 服务器。',
      '她的 AI 应用读到可用工具后，能查文章、写摘要，也能把复习时间放进日历。',
      '更换支持 MCP 的客户端时，这些能力更容易重新接上。',
    ],
    analogy:
      '像统一规格的插座。设备功能各不相同，接口合适后，接入过程会省下许多重复改线。',
    confusion:
      'MCP 不会替代具体工具或 API。它统一一部分连接和发现方式，真正的搜索、保存和日历能力仍由背后的服务提供。',
    abilityCard: {
      id: 'card-standard-connection',
      name: '统一连接',
      description: '让支持 MCP 的 AI 应用发现并使用外部能力。',
      icon: '🔌',
    },
    workbenchReward: {
      id: 'module-connection',
      name: '连接模块',
      description: '工作台已经能通过 API 和 MCP 接入外部软件、资料与工具。',
      icon: '🔌',
    },
    interaction: {
      type: 'scenario',
      prompt: 'MCP 最直接帮助小妖解决什么？',
      answerId: 'l15-standard-connect',
      options: [
        {
          id: 'l15-standard-connect',
          text: '让支持 MCP 的 AI 应用按统一协议发现并调用书签、笔记等能力',
          feedback: '答对了。MCP 让客户端发现服务器提供的工具和资源，并按协议使用。',
        },
        {
          id: 'l15-train-model',
          text: '把所有笔记重新训练进模型',
          feedback: 'MCP 负责连接和交换信息，不负责重新训练模型。',
        },
        {
          id: 'l15-rename-api',
          text: '把某一个搜索 API 改名成 MCP',
          feedback: '一个 API 只是具体接口。MCP 规定的是 AI 应用和多个服务之间的一套连接方式。',
        },
      ],
    },
  },
  {
    id: 'l16-ai-workbench',
    order: 16,
    zoneId: 'workbench-summit',
    zoneName: '终点工作台',
    name: 'AI Workbench',
    zhName: 'AI 工作台',
    termKind: 'game-defined',
    termKindLabel: '本章组合词',
    kind: 'finale',
    problem:
      '小妖已经拿到十五张能力卡，却还缺一个能长期使用的整体。她要把这些能力装进同一张工作台。',
    simpleExplanation:
      'AI 工作台是本游戏给一组工作能力起的名字。它让对话、资料、流程、Agent 和连接在一个地方配合。',
    accurateExplanation:
      '这里的 AI 工作台是课程中的组合概念，没有统一的行业定义。它指向一个可持续使用的工作环境，其中包含清楚的人机交互、可查资料、可复用流程、受控执行和外部连接。',
    story: [
      '小妖把对话入口接到资料库，再装上流程、Agent 和连接模块。',
      '她放进一篇新文章，工作台完成检索、整理和入库，并把结果留给她检查。',
      '那堆散在网页和便签里的资料，终于能持续更新了。',
    ],
    analogy:
      '像一张真正开工的书桌。灯、书架和电脑各有用途，摆在一起后才能承接每天的工作。',
    confusion:
      'AI 工作台没有一套全球统一的零件表。本章用五个模块帮助初学者看懂组合关系，实际产品可以增减模块。',
    abilityCard: {
      id: 'card-village-graduate',
      name: 'AI 新手村毕业',
      description: '小妖已经能看懂一套 AI 工作台怎样组成。',
      icon: '🏆',
    },
    prompt:
      '把五个已经解锁的模块装进空工作台。这里没有错误答案，点亮全部模块即可通关。',
    modules: [
      {
        id: 'module-dialogue',
        name: '对话',
        icon: '💬',
        description: '用 Assistant、Model、Prompt、Context 和 Token 把需求说清楚。',
        installFeedback: '对话入口亮起。小妖能把眼前任务和资料交代清楚了。',
      },
      {
        id: 'module-knowledge',
        name: '资料',
        icon: '📚',
        description: '用 Workspace、Memory、Knowledge Base 和 RAG 管理并找回信息。',
        installFeedback: '资料模块归位。文章可以保存、查询，也能被带进回答。',
      },
      {
        id: 'module-workflow',
        name: '流程',
        icon: '⚙️',
        description: '用 Workflow、Skill 和 Tool Use 把做法变成可重复的行动。',
        installFeedback: '流程模块开始运转。重复工作有了固定步骤和可用工具。',
      },
      {
        id: 'module-agent',
        name: 'Agent',
        icon: '🤖',
        description: '让 Agent 围绕目标选择动作、使用工具并检查结果。',
        installFeedback: 'Agent 模块上线。它可以根据结果决定继续还是停下。',
      },
      {
        id: 'module-connection',
        name: '连接',
        icon: '🔌',
        description: '用 API 和 MCP 接入外部软件、资料与工具。',
        installFeedback: '连接模块接通。工作台可以和外部能力交换信息了。',
      },
    ],
    completionTitle: 'AI 黑话第一章 · 通关',
    badge: 'AI 新手村毕业',
    ending: [
      '最开始，小妖只是想让 AI 帮自己整理一点资料。',
      '为了让它做得更好，她学会了提要求、给 Context，也建起了自己的知识库。',
      '后来，Workflow、Skill、Agent、API 和 MCP 陆续接进来。',
      '今天，她已经知道怎样让 AI 真正帮自己干活。',
    ],
    comingSoon: [
      {
        id: 'chapter-02',
        name: '第二章 · 开发世界',
        description: '认识 IDE、Codex、Git 与 GitHub。',
        status: 'comingSoon',
      },
      {
        id: 'chapter-03',
        name: '第三章 · Agent 世界',
        description: '继续探索更完整的 Agent 协作。',
        status: 'comingSoon',
      },
      {
        id: 'chapter-04',
        name: '第四章 · AI 工作流世界',
        description: '把真实工作变成稳定、可检查的流程。',
        status: 'comingSoon',
      },
    ],
  },
]

export const levelById = new Map(levels.map((level) => [level.id, level]))

export const conceptLevels = levels.filter((level) => level.kind === 'concept')

export const finaleLevel = levels.find((level) => level.kind === 'finale')
