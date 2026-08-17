import { useEffect, useRef } from 'react'

interface ResetDialogProps {
  open: boolean
  onCancel: () => void
  onConfirm: () => void
}

export function ResetDialog({ open, onCancel, onConfirm }: ResetDialogProps) {
  const cancelRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!open) return

    cancelRef.current?.focus()
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onCancel()
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [onCancel, open])

  if (!open) return null

  return (
    <div className="dialog-backdrop" role="presentation" onMouseDown={onCancel}>
      <section
        className="pixel-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="reset-dialog-title"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <span className="dialog-icon" aria-hidden="true">
          ↺
        </span>
        <h2 id="reset-dialog-title">要从头再来吗？</h2>
        <p>这会清除当前浏览器里的闯关记录，并重新播放开场剧情。</p>
        <div className="dialog-actions">
          <button
            ref={cancelRef}
            className="pixel-button pixel-button--ghost"
            type="button"
            onClick={onCancel}
          >
            继续冒险
          </button>
          <button
            className="pixel-button pixel-button--danger"
            type="button"
            onClick={onConfirm}
          >
            清空进度
          </button>
        </div>
      </section>
    </div>
  )
}
