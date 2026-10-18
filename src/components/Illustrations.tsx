import type { IngredientId, TypeId } from '../data/master'

// 食材イラスト（装飾目的のため aria-hidden。ラベルはテキストで併記する）
export function IngredientIllust({ id, className = 'h-12 w-12' }: { id: IngredientId; className?: string }) {
  const common = { className, viewBox: '0 0 64 64', 'aria-hidden': true as const, focusable: 'false' as const }
  switch (id) {
    case 'rice':
      return (
        <svg {...common}>
          <path d="M10 32h44a22 18 0 0 1-44 0z" fill="#F7B267" />
          <path d="M10 32h44" stroke="#D9640D" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M14 31c0-10 8-16 18-16s18 6 18 16z" fill="#fff" stroke="#E8DCC8" strokeWidth="2" />
          <g fill="#F1E7D6">
            <ellipse cx="24" cy="24" rx="2.2" ry="1.4" />
            <ellipse cx="32" cy="20" rx="2.2" ry="1.4" />
            <ellipse cx="40" cy="25" rx="2.2" ry="1.4" />
            <ellipse cx="30" cy="27" rx="2.2" ry="1.4" />
          </g>
          <circle cx="26" cy="41" r="1.6" fill="#7A4A1E" />
          <circle cx="38" cy="41" r="1.6" fill="#7A4A1E" />
          <path d="M29 45q3 2.5 6 0" stroke="#7A4A1E" strokeWidth="1.6" fill="none" strokeLinecap="round" />
        </svg>
      )
    case 'vegetable':
      return (
        <svg {...common}>
          <path d="M33 18c-1-6 2-10 6-11-1 4-1 7 1 10 3-3 7-3 10-1-3 2-6 4-9 4" fill="#6BA65A" />
          <path d="M22 54c-4-2-4-8 0-14l12-20c3-3 9 0 9 5L33 50c-3 4-7 6-11 4z" fill="#F28A2E" />
          <path d="M28 33l5 2M25 40l5 2M31 26l4 2" stroke="#D9640D" strokeWidth="2" strokeLinecap="round" />
          <circle cx="29" cy="45" r="1.4" fill="#7A4A1E" />
          <circle cx="35" cy="38" r="1.4" fill="#7A4A1E" />
        </svg>
      )
    case 'fish':
      return (
        <svg {...common}>
          <path d="M8 32c8-12 26-14 38-4l10-8v24l-10-8C34 46 16 44 8 32z" fill="#7FB8E0" />
          <path d="M20 26c6-3 14-3 20 0" stroke="#fff" strokeWidth="2.4" fill="none" strokeLinecap="round" opacity=".7" />
          <circle cx="18" cy="31" r="2.4" fill="#2D4A63" />
          <path d="M14 37q3 2 6 0" stroke="#2D4A63" strokeWidth="1.6" fill="none" strokeLinecap="round" />
          <circle cx="24" cy="36" r="2" fill="#F6A6A6" opacity=".8" />
        </svg>
      )
    case 'meat':
      return (
        <svg {...common}>
          <path d="M38 12c10 2 16 12 12 22s-14 14-22 10l-8 8a4 4 0 1 1-6-1 4 4 0 1 1-1-6l8-8c-4-8 0-18 8-22 3-2 6-3 9-3z" fill="#C97B4A" />
          <path d="M40 18c6 2 9 8 7 14" stroke="#E9A878" strokeWidth="3" fill="none" strokeLinecap="round" />
          <path d="M18 48l-3 3" stroke="#FFF3E0" strokeWidth="5" strokeLinecap="round" />
        </svg>
      )
    case 'beans':
      return (
        <svg {...common}>
          <ellipse cx="22" cy="36" rx="10" ry="12" transform="rotate(-25 22 36)" fill="#E8C76A" />
          <ellipse cx="40" cy="28" rx="10" ry="12" transform="rotate(20 40 28)" fill="#D9B24E" />
          <ellipse cx="38" cy="46" rx="8" ry="9" transform="rotate(-10 38 46)" fill="#9CC48A" />
          <path d="M19 33q2 4 6 4M37 25q2 4 6 4" stroke="#B48A2C" strokeWidth="1.8" fill="none" strokeLinecap="round" />
        </svg>
      )
    case 'fruit':
      return (
        <svg {...common}>
          <path d="M32 18c-4-4-14-4-18 4s-2 22 6 28c4 3 8 2 12 0 4 2 8 3 12 0 8-6 10-20 6-28s-14-8-18-4z" fill="#EF5B5B" />
          <path d="M32 18c0-5 1-8 4-11" stroke="#7A4A1E" strokeWidth="2.6" fill="none" strokeLinecap="round" />
          <path d="M34 14c4-4 10-4 12-2-3 4-8 5-12 2z" fill="#6BA65A" />
          <ellipse cx="22" cy="28" rx="3" ry="5" fill="#fff" opacity=".45" />
        </svg>
      )
  }
}

const TYPE_STYLE: Record<TypeId, { bg: string; main: string; sub: string }> = {
  retort: { bg: '#FFF1E2', main: '#F7A14A', sub: '#FFD5A8' },
  frozen: { bg: '#EAF4FB', main: '#7FB8E0', sub: '#CFE6F5' },
  tezukami: { bg: '#F1F8EE', main: '#8DC07B', sub: '#F2D9A6' },
  freezedry: { bg: '#FFF8E1', main: '#E8C76A', sub: '#FBE9B5' },
  snack: { bg: '#FDEEF0', main: '#F09AA7', sub: '#FBD3D9' },
}

/** サンプル商品用のイメージイラスト（実際の商品写真ではない） */
export function ProductIllust({ type, className = '' }: { type: TypeId | null; className?: string }) {
  const s = TYPE_STYLE[type ?? 'retort']
  return (
    <svg viewBox="0 0 200 160" className={className} preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">
      <rect width="200" height="160" fill={s.bg} />
      <circle cx="170" cy="24" r="30" fill={s.sub} opacity=".6" />
      <circle cx="22" cy="140" r="26" fill={s.sub} opacity=".6" />
      {type === 'retort' && (
        <g>
          <path d="M72 38h56l6 84a8 8 0 0 1-8 8H74a8 8 0 0 1-8-8z" fill="#fff" stroke={s.main} strokeWidth="3" />
          <rect x="72" y="32" width="56" height="10" rx="4" fill={s.main} />
          <circle cx="100" cy="84" r="20" fill={s.sub} />
          <circle cx="94" cy="80" r="2.4" fill="#7A4A1E" />
          <circle cx="106" cy="80" r="2.4" fill="#7A4A1E" />
          <path d="M95 88q5 4 10 0" stroke="#7A4A1E" strokeWidth="2" fill="none" strokeLinecap="round" />
        </g>
      )}
      {type === 'frozen' && (
        <g>
          {[0, 1, 2].map((i) => (
            <rect key={i} x={56 + i * 32} y={70 - (i % 2) * 14} width="28" height="28" rx="7" fill={i === 1 ? '#F7B267' : '#9CC48A'} stroke="#fff" strokeWidth="3" />
          ))}
          <rect x="64" y="104" width="72" height="18" rx="9" fill="#fff" stroke={s.main} strokeWidth="3" />
          <path d="M100 40v14M93 44l14 6M107 44l-14 6" stroke={s.main} strokeWidth="3" strokeLinecap="round" />
        </g>
      )}
      {type === 'tezukami' && (
        <g>
          <ellipse cx="100" cy="104" rx="62" ry="18" fill="#fff" stroke={s.main} strokeWidth="3" />
          <ellipse cx="78" cy="92" rx="18" ry="11" fill={s.sub} stroke="#D9A85B" strokeWidth="2" />
          <ellipse cx="114" cy="88" rx="18" ry="11" fill={s.sub} stroke="#D9A85B" strokeWidth="2" />
          <rect x="96" y="56" width="12" height="38" rx="6" transform="rotate(30 102 75)" fill="#F7B267" />
        </g>
      )}
      {type === 'freezedry' && (
        <g>
          <rect x="70" y="44" width="60" height="78" rx="12" fill="#fff" stroke={s.main} strokeWidth="3" />
          <rect x="64" y="36" width="72" height="14" rx="6" fill={s.main} />
          {[0, 1, 2, 3].map((i) => (
            <rect key={i} x={80 + (i % 2) * 22} y={64 + Math.floor(i / 2) * 24} width="18" height="18" rx="4" fill={i % 2 ? '#9CC48A' : '#F7B267'} />
          ))}
        </g>
      )}
      {type === 'snack' && (
        <g>
          <ellipse cx="100" cy="110" rx="56" ry="14" fill="#fff" stroke={s.main} strokeWidth="3" />
          {[
            [76, 96], [92, 88], [108, 96], [124, 90], [100, 102], [84, 104], [116, 104],
          ].map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r="8" fill={i % 2 ? '#F7D08A' : '#F6B3BC'} stroke="#fff" strokeWidth="2" />
          ))}
        </g>
      )}
      {type === null && (
        <g>
          <ellipse cx="100" cy="98" rx="56" ry="20" fill="#fff" stroke={s.main} strokeWidth="3" />
        </g>
      )}
    </svg>
  )
}
