import type { Interaction } from '../../types/game'
import { ChipBuilder } from './ChipBuilder'
import { ScenarioChoice } from './ScenarioChoice'
import { TapOrder } from './TapOrder'

interface InteractionRendererProps {
  interaction: Interaction
  onSuccess: () => void
}

export function InteractionRenderer({
  interaction,
  onSuccess,
}: InteractionRendererProps) {
  if (interaction.type === 'scenario') {
    return <ScenarioChoice interaction={interaction} onSuccess={onSuccess} />
  }

  if (interaction.type === 'chip-builder') {
    return <ChipBuilder interaction={interaction} onSuccess={onSuccess} />
  }

  return <TapOrder interaction={interaction} onSuccess={onSuccess} />
}
