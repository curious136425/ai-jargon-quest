export type LevelId = string

export type ZoneId =
  | 'dialogue-valley'
  | 'data-forest'
  | 'automation-workshop'
  | 'connection-city'
  | 'workbench-summit'

export type ModuleId =
  | 'module-dialogue'
  | 'module-knowledge'
  | 'module-workflow'
  | 'module-agent'
  | 'module-connection'

export type TermKind =
  | 'common'
  | 'product'
  | 'ecosystem'
  | 'technical'
  | 'protocol'
  | 'game-defined'

export interface ChoiceOption {
  id: string
  text: string
  feedback: string
}

export interface ScenarioChoice {
  type: 'scenario'
  prompt: string
  answerId: string
  options: ChoiceOption[]
}

export interface BuilderChip {
  id: string
  text: string
  feedback: string
}

export interface ChipBuilder {
  type: 'chip-builder'
  prompt: string
  frame: string
  selectionMode: 'ordered' | 'unordered'
  requiredChipIds: string[]
  chips: BuilderChip[]
  retryFeedback: string
  successFeedback: string
}

export interface OrderStep {
  id: string
  text: string
  correctPlacementFeedback: string
  wrongPlacementFeedback: string
}

export interface TapOrder {
  type: 'tap-order'
  prompt: string
  correctOrder: string[]
  steps: OrderStep[]
  retryFeedback: string
  successFeedback: string
}

export type Interaction = ScenarioChoice | ChipBuilder | TapOrder

export interface AbilityCard {
  id: string
  name: string
  description: string
  icon: string
}

export interface WorkbenchReward {
  id: ModuleId
  name: string
  description: string
  icon: string
}

interface BaseLevel {
  id: LevelId
  order: number
  zoneId: ZoneId
  zoneName: string
  name: string
  zhName: string
  termKind: TermKind
  termKindLabel: string
  problem: string
  simpleExplanation: string
  accurateExplanation: string
  story: string[]
  analogy: string
  confusion: string
  abilityCard: AbilityCard
}

export interface ConceptLevel extends BaseLevel {
  kind: 'concept'
  interaction: Interaction
  workbenchReward?: WorkbenchReward
}

export interface FinaleModule {
  id: ModuleId
  name: string
  description: string
  icon: string
  installFeedback: string
}

export interface ComingSoonChapter {
  id: string
  name: string
  description: string
  status: 'comingSoon'
}

export interface FinaleLevel extends BaseLevel {
  kind: 'finale'
  prompt: string
  modules: FinaleModule[]
  completionTitle: string
  badge: string
  ending: string[]
  comingSoon: ComingSoonChapter[]
}

export type Level = ConceptLevel | FinaleLevel

export interface Zone {
  id: ZoneId
  name: string
  subtitle: string
  icon: string
}

export interface Chapter {
  id: string
  name: string
  subtitle: string
  status: 'active' | 'comingSoon'
  levelIds?: LevelId[]
}

export interface SaveV1 {
  schemaVersion: 1
  introSeen: boolean
  completedLevelIds: LevelId[]
  lastVisitedLevelId: LevelId | null
}
