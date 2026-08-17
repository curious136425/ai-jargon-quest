interface XiaoyaoProps {
  className?: string
  eager?: boolean
}

const xiaoyaoAsset = `${import.meta.env.BASE_URL}assets/xiaoyao.png`

export function Xiaoyao({ className = '', eager = false }: XiaoyaoProps) {
  return (
    <img
      className={`xiaoyao ${className}`.trim()}
      src={xiaoyaoAsset}
      alt="背着学习包、拿着笔记本的小妖"
      loading={eager ? 'eager' : 'lazy'}
      decoding={eager ? 'sync' : 'async'}
    />
  )
}
