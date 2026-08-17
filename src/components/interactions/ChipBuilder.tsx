import { useRef, useState } from 'react'
import type { ChipBuilder as ChipBuilderData } from '../../types/game'

interface ChipBuilderProps {
  interaction: ChipBuilderData
  onSuccess: () => void
}

export function ChipBuilder({ interaction, onSuccess }: ChipBuilderProps) {
  const [selectedIds, setSelectedIds] = useState<string[]>([])
  const [status, setStatus] = useState<'idle' | 'wrong' | 'correct'>('idle')
  const [feedback, setFeedback] = useState('')
  const successCalled = useRef(false)
  const requiredCount = interaction.requiredChipIds.length

  const toggleChip = (chipId: string) => {
    if (status === 'correct') return

    const chip = interaction.chips.find((item) => item.id === chipId)
    if (!chip) return

    setStatus('idle')
    setFeedback(chip.feedback)
    setSelectedIds((previous) => {
      if (previous.includes(chipId)) {
        return previous.filter((id) => id !== chipId)
      }
      if (previous.length >= requiredCount) return previous
      return [...previous, chipId]
    })
  }

  const clear = () => {
    if (status === 'correct') return
    setSelectedIds([])
    setStatus('idle')
    setFeedback('')
  }

  const submit = () => {
    if (selectedIds.length !== requiredCount || status === 'correct') return

    const isCorrect =
      interaction.selectionMode === 'ordered'
        ? selectedIds.every(
            (id, index) => id === interaction.requiredChipIds[index],
          )
        : interaction.requiredChipIds.every((id) => selectedIds.includes(id))

    if (!isCorrect) {
      const wrongChip = interaction.chips.find(
        (chip) =>
          selectedIds.includes(chip.id) &&
          !interaction.requiredChipIds.includes(chip.id),
      )
      setStatus('wrong')
      setFeedback(
        wrongChip
          ? `${interaction.retryFeedback} ${wrongChip.feedback}`
          : interaction.retryFeedback,
      )
      return
    }

    setStatus('correct')
    setFeedback(interaction.successFeedback)
    if (!successCalled.current) {
      successCalled.current = true
      onSuccess()
    }
  }

  return (
    <fieldset className="interaction-fieldset">
      <legend>{interaction.prompt}</legend>
      <div className="builder-frame">
        <p>{interaction.frame}</p>
        <div className="builder-slots" aria-label={`已选择 ${selectedIds.length} 块信息`}>
          {Array.from({ length: requiredCount }, (_, index) => {
            const chip = interaction.chips.find(
              (item) => item.id === selectedIds[index],
            )
            return (
              <span
                key={index}
                className={chip ? 'builder-slot builder-slot--filled' : 'builder-slot'}
              >
                {chip?.text ?? `信息 ${index + 1}`}
              </span>
            )
          })}
        </div>
      </div>

      <div className="chip-grid">
        {interaction.chips.map((chip) => {
          const selected = selectedIds.includes(chip.id)
          return (
            <button
              key={chip.id}
              type="button"
              className={selected ? 'chip-button chip-button--selected' : 'chip-button'}
              aria-pressed={selected}
              disabled={status === 'correct'}
              onClick={() => toggleChip(chip.id)}
            >
              {chip.text}
            </button>
          )
        })}
      </div>

      <div className="interaction-actions">
        <button className="mini-button" type="button" disabled={selectedIds.length === 0 || status === 'correct'} onClick={clear}>
          清空重选
        </button>
        <button
          className="pixel-button pixel-button--small pixel-button--primary"
          type="button"
          disabled={selectedIds.length !== requiredCount || status === 'correct'}
          onClick={submit}
        >
          检查答案
        </button>
      </div>

      {feedback && (
        <p className={`interaction-feedback interaction-feedback--${status}`} role="status" aria-live="polite">
          {status === 'wrong' && <strong>还差一点。</strong>} {feedback}
        </p>
      )}
    </fieldset>
  )
}
