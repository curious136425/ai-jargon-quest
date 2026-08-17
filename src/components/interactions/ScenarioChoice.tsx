import { useRef, useState } from 'react'
import type { ScenarioChoice as ScenarioChoiceData } from '../../types/game'

interface ScenarioChoiceProps {
  interaction: ScenarioChoiceData
  onSuccess: () => void
}

export function ScenarioChoice({
  interaction,
  onSuccess,
}: ScenarioChoiceProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [status, setStatus] = useState<'idle' | 'wrong' | 'correct'>('idle')
  const [feedback, setFeedback] = useState('')
  const successCalled = useRef(false)

  const choose = (optionId: string) => {
    if (status === 'correct') return

    const option = interaction.options.find((item) => item.id === optionId)
    if (!option) return

    setSelectedId(optionId)
    setFeedback(option.feedback)

    if (optionId === interaction.answerId) {
      setStatus('correct')
      if (!successCalled.current) {
        successCalled.current = true
        onSuccess()
      }
      return
    }

    setStatus('wrong')
  }

  return (
    <fieldset className="interaction-fieldset">
      <legend>{interaction.prompt}</legend>
      <div className="choice-list">
        {interaction.options.map((option, index) => {
          const selected = selectedId === option.id
          const optionStatus = selected ? status : 'idle'
          return (
            <button
              key={option.id}
              className={`choice-button choice-button--${optionStatus}`}
              type="button"
              aria-pressed={selected}
              disabled={status === 'correct'}
              onClick={() => choose(option.id)}
            >
              <span className="choice-letter" aria-hidden="true">
                {String.fromCharCode(65 + index)}
              </span>
              <span>{option.text}</span>
              {selected && status === 'correct' && (
                <span className="choice-mark" aria-hidden="true">
                  ✓
                </span>
              )}
              {selected && status === 'wrong' && (
                <span className="choice-mark" aria-hidden="true">
                  ×
                </span>
              )}
            </button>
          )
        })}
      </div>
      {feedback && (
        <p className={`interaction-feedback interaction-feedback--${status}`} role="status" aria-live="polite">
          {status === 'wrong' && <strong>还差一点。</strong>} {feedback}
        </p>
      )}
    </fieldset>
  )
}
