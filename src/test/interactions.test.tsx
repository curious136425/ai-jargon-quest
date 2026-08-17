import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { ChipBuilder } from '../components/interactions/ChipBuilder'
import { ScenarioChoice } from '../components/interactions/ScenarioChoice'
import { TapOrder } from '../components/interactions/TapOrder'
import type { ChipBuilder as ChipData, ScenarioChoice as ScenarioData, TapOrder as OrderData } from '../types/game'

describe('三种轻互动', () => {
  it('情境选择答错可重试，答对只完成一次', async () => {
    const user = userEvent.setup()
    const onSuccess = vi.fn()
    const data: ScenarioData = {
      type: 'scenario',
      prompt: '选出正确入口',
      answerId: 'right',
      options: [
        { id: 'wrong', text: '收藏夹', feedback: '它只能保存资料。' },
        { id: 'right', text: 'AI 助手', feedback: '它可以接住任务。' },
      ],
    }

    render(<ScenarioChoice interaction={data} onSuccess={onSuccess} />)
    await user.click(screen.getByRole('button', { name: /收藏夹/ }))
    expect(screen.getByRole('status')).toHaveTextContent('还差一点')
    expect(onSuccess).not.toHaveBeenCalled()

    await user.click(screen.getByRole('button', { name: /AI 助手/ }))
    expect(screen.getByRole('status')).toHaveTextContent('它可以接住任务')
    expect(onSuccess).toHaveBeenCalledTimes(1)
  })

  it('信息补全会检查整组信息并允许修改', async () => {
    const user = userEvent.setup()
    const onSuccess = vi.fn()
    const data: ChipData = {
      type: 'chip-builder',
      prompt: '补齐要求',
      frame: '请整理资料',
      selectionMode: 'unordered',
      requiredChipIds: ['task', 'format'],
      chips: [
        { id: 'task', text: '找共同主题', feedback: '任务信息。' },
        { id: 'format', text: '列成五条', feedback: '输出信息。' },
        { id: 'noise', text: '猜天气', feedback: '这是别的任务。' },
      ],
      retryFeedback: '换一块。',
      successFeedback: '已经补齐。',
    }

    render(<ChipBuilder interaction={data} onSuccess={onSuccess} />)
    await user.click(screen.getByRole('button', { name: '找共同主题' }))
    await user.click(screen.getByRole('button', { name: '猜天气' }))
    await user.click(screen.getByRole('button', { name: '检查答案' }))
    expect(screen.getByRole('status')).toHaveTextContent('还差一点')
    expect(onSuccess).not.toHaveBeenCalled()

    await user.click(screen.getByRole('button', { name: '猜天气' }))
    await user.click(screen.getByRole('button', { name: '列成五条' }))
    await user.click(screen.getByRole('button', { name: '检查答案' }))
    expect(onSuccess).toHaveBeenCalledTimes(1)
    expect(screen.getByRole('status')).toHaveTextContent('已经补齐')
  })

  it('点击排序答错不完成，重排后可以通过', async () => {
    const user = userEvent.setup()
    const onSuccess = vi.fn()
    const data: OrderData = {
      type: 'tap-order',
      prompt: '排好步骤',
      correctOrder: ['one', 'two', 'three'],
      steps: [
        { id: 'three', text: '最后回答', correctPlacementFeedback: '好', wrongPlacementFeedback: '应放最后。' },
        { id: 'one', text: '先找资料', correctPlacementFeedback: '好', wrongPlacementFeedback: '应放最前。' },
        { id: 'two', text: '加入上下文', correctPlacementFeedback: '好', wrongPlacementFeedback: '应放中间。' },
      ],
      retryFeedback: '顺序不对。',
      successFeedback: '顺序接通。',
    }

    render(<TapOrder interaction={data} onSuccess={onSuccess} />)
    await user.click(screen.getByRole('button', { name: /最后回答/ }))
    await user.click(screen.getByRole('button', { name: /先找资料/ }))
    await user.click(screen.getByRole('button', { name: /加入上下文/ }))
    await user.click(screen.getByRole('button', { name: '检查顺序' }))
    expect(screen.getByRole('status')).toHaveTextContent('应放最后')
    expect(onSuccess).not.toHaveBeenCalled()

    await user.click(screen.getByRole('button', { name: '清空重排' }))
    await user.click(screen.getByRole('button', { name: /先找资料/ }))
    await user.click(screen.getByRole('button', { name: /加入上下文/ }))
    await user.click(screen.getByRole('button', { name: /最后回答/ }))
    await user.click(screen.getByRole('button', { name: '检查顺序' }))
    expect(onSuccess).toHaveBeenCalledTimes(1)
    expect(screen.getByRole('status')).toHaveTextContent('顺序接通')
  })
})
