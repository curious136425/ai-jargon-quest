import { useRef, useState } from 'react'
import type { TapOrder as TapOrderData } from '../../types/game'

interface TapOrderProps {
  interaction: TapOrderData
  onSuccess: () => void
}

export function TapOrder({ interaction, onSuccess }: TapOrderProps) {
  const [chosenIds, setChosenIds] = useState<string[]>([])
  const [status, setStatus] = useState<'idle' | 'wrong' | 'correct'>('idle')
  const [feedback, setFeedback] = useState('')
  const successCalled = useRef(false)

  const choose = (stepId: string) => {
    if (status === 'correct') return

    setStatus('idle')
    setFeedback('')
    setChosenIds((previous) => {
      const existingIndex = previous.indexOf(stepId)
      if (existingIndex >= 0) {
        return previous.filter((id) => id !== stepId)
      }
      if (previous.length >= interaction.correctOrder.length) return previous
      return [...previous, stepId]
    })
  }

  const clear = () => {
    if (status === 'correct') return
    setChosenIds([])
    setStatus('idle')
    setFeedback('')
  }

  const submit = () => {
    if (
      chosenIds.length !== interaction.correctOrder.length ||
      status === 'correct'
    ) {
      return
    }

    const wrongIndex = chosenIds.findIndex(
      (id, index) => id !== interaction.correctOrder[index],
    )

    if (wrongIndex >= 0) {
      const wrongStep = interaction.steps.find(
        (step) => step.id === chosenIds[wrongIndex],
      )
      setStatus('wrong')
      setFeedback(
        `${interaction.retryFeedback}${wrongStep ? ` ${wrongStep.wrongPlacementFeedback}` : ''}`,
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
      <div className="order-track" aria-label={`已经选择 ${chosenIds.length} 个步骤`}>
        {interaction.correctOrder.map((_, index) => {
          const step = interaction.steps.find(
            (item) => item.id === chosenIds[index],
          )
          return (
            <div key={index} className={step ? 'order-slot order-slot--filled' : 'order-slot'}>
              <span>{index + 1}</span>
              <p>{step?.text ?? '点击下面的步骤卡'}</p>
            </div>
          )
        })}
      </div>

      <div className="order-options">
        {interaction.steps.map((step) => {
          const chosenIndex = chosenIds.indexOf(step.id)
          return (
            <button
              key={step.id}
              type="button"
              className={chosenIndex >= 0 ? 'order-button order-button--chosen' : 'order-button'}
              aria-pressed={chosenIndex >= 0}
              disabled={status === 'correct'}
              onClick={() => choose(step.id)}
            >
              {chosenIndex >= 0 && (
                <span className="order-number" aria-label={`第 ${chosenIndex + 1} 步`}>
                  {chosenIndex + 1}
                </span>
              )}
              <span>{step.text}</span>
            </button>
          )
        })}
      </div>

      <div className="interaction-actions">
        <button className="mini-button" type="button" disabled={chosenIds.length === 0 || status === 'correct'} onClick={clear}>
          清空重排
        </button>
        <button
          className="pixel-button pixel-button--small pixel-button--primary"
          type="button"
          disabled={chosenIds.length !== interaction.correctOrder.length || status === 'correct'}
          onClick={submit}
        >
          检查顺序
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
