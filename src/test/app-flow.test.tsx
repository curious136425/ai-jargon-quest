import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import App from '../App'
import { levels } from '../data/levels'
import { GameProvider } from '../state/GameContext'
import { SAVE_KEY } from '../state/storage'

function renderApp(path = '/') {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <GameProvider>
        <App />
      </GameProvider>
    </MemoryRouter>,
  )
}

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

async function enterLevel(user: ReturnType<typeof userEvent.setup>, levelName: string) {
  const matcher = new RegExp(escapeRegExp(levelName), 'i')
  const button = await screen.findByRole('button', { name: matcher })
  await user.click(button)
  await screen.findByRole('heading', { level: 1, name: levelName })
}

describe('完整游戏流程', () => {
  it('从开场一路玩到 16/16 并保存毕业称号', async () => {
    const user = userEvent.setup()
    renderApp('/')

    expect(screen.getByRole('heading', { name: /AI 黑话世界/ })).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: /开始闯关/ }))
    await screen.findByRole('heading', { name: '小妖的成长路线' })
    await enterLevel(user, levels[0].name)

    for (let index = 0; index < 15; index += 1) {
      const level = levels[index]
      if (level.kind !== 'concept') throw new Error(`第 ${index + 1} 关应为概念关`)

      const interaction = level.interaction
      if (interaction.type === 'scenario') {
        const answer = interaction.options.find((option) => option.id === interaction.answerId)
        if (!answer) throw new Error(`缺少 ${level.id} 的答案`)
        await user.click(screen.getByRole('button', { name: new RegExp(escapeRegExp(answer.text)) }))
      } else if (interaction.type === 'chip-builder') {
        for (const chipId of interaction.requiredChipIds) {
          const chip = interaction.chips.find((item) => item.id === chipId)
          if (!chip) throw new Error(`缺少 ${chipId}`)
          await user.click(screen.getByRole('button', { name: chip.text }))
        }
        await user.click(screen.getByRole('button', { name: '检查答案' }))
      } else {
        for (const stepId of interaction.correctOrder) {
          const step = interaction.steps.find((item) => item.id === stepId)
          if (!step) throw new Error(`缺少 ${stepId}`)
          await user.click(screen.getByRole('button', { name: new RegExp(escapeRegExp(step.text)) }))
        }
        await user.click(screen.getByRole('button', { name: '检查顺序' }))
      }

      expect(await screen.findByText('AI 认知 +1')).toBeInTheDocument()
      expect(screen.getByText(new RegExp(level.abilityCard.name))).toBeInTheDocument()

      const nextButton = screen.getByRole('button', { name: /下一关|进入新区域/ })
      await user.click(nextButton)

      const nextLevel = levels[index + 1]
      if (screen.queryByRole('heading', { name: '小妖的成长路线' })) {
        await enterLevel(user, nextLevel.name)
      } else {
        await screen.findByRole('heading', { level: 1, name: nextLevel.name })
      }
    }

    const finale = levels[15]
    if (finale.kind !== 'finale') throw new Error('第 16 关应为终章')

    for (const module of finale.modules) {
      const moduleButton = screen.getByRole('button', {
        name: new RegExp(`^${escapeRegExp(module.name)}`),
      })
      await user.click(moduleButton)
    }

    expect(await screen.findByText('AI 黑话第一章 · 通关')).toBeInTheDocument()
    expect(screen.getByText('AI 新手村毕业')).toBeInTheDocument()
    expect(screen.getByText('第二章 · 开发世界')).toBeInTheDocument()

    const save = JSON.parse(window.localStorage.getItem(SAVE_KEY) ?? '{}') as {
      completedLevelIds?: string[]
    }
    expect(save.completedLevelIds).toHaveLength(16)
  }, 30_000)

  it('锁定深链会被路由层拦截', async () => {
    window.localStorage.setItem(
      SAVE_KEY,
      JSON.stringify({
        schemaVersion: 1,
        introSeen: true,
        completedLevelIds: [],
        lastVisitedLevelId: levels[0].id,
      }),
    )
    renderApp(`/level/${levels[4].id}`)
    expect(await screen.findByRole('heading', { name: '这条路还没有解锁' })).toBeInTheDocument()
  })

  it('重新开始需要二次确认并只清除本游戏进度', async () => {
    const user = userEvent.setup()
    window.localStorage.setItem('another-app', 'keep-me')
    renderApp('/')
    await user.click(screen.getByRole('button', { name: /开始闯关/ }))
    await user.click(await screen.findByRole('button', { name: '重新开始' }))

    const dialog = screen.getByRole('dialog', { name: '要从头再来吗？' })
    expect(dialog).toBeInTheDocument()
    await user.click(within(dialog).getByRole('button', { name: '继续冒险' }))
    expect(screen.getByRole('heading', { name: '小妖的成长路线' })).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: '重新开始' }))
    await user.click(screen.getByRole('button', { name: '清空进度' }))
    expect(await screen.findByRole('heading', { name: /AI 黑话世界/ })).toBeInTheDocument()
    expect(window.localStorage.getItem(SAVE_KEY)).toBeNull()
    expect(window.localStorage.getItem('another-app')).toBe('keep-me')
  })
})
