import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'

interface Props {
  id: string
  en: string
  title: string
  lead?: string
  more?: { to: string; label: string }
  children: ReactNode
  className?: string
}

export default function Section({ id, en, title, lead, more, children, className = '' }: Props) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className={`scroll-mt-20 py-10 md:scroll-mt-24 md:py-16 ${className}`}>
      <div className="container-x">
        <div className="mb-5 flex items-end justify-between gap-4 md:mb-8">
          <div>
            <p className="text-xs font-bold tracking-[0.2em] text-leaf-700">{en}</p>
            <h2 id={`${id}-title`} className="mt-1 text-xl font-bold md:text-3xl">
              {title}
            </h2>
            {lead && <p className="mt-2 text-sm text-ink-soft md:text-base">{lead}</p>}
          </div>
          {more && (
            <Link to={more.to} className="flex min-h-[44px] shrink-0 items-center text-sm font-bold text-brand-600 hover:underline">
              {more.label}
              <ChevronRight className="h-4 w-4" aria-hidden />
            </Link>
          )}
        </div>
        {children}
      </div>
    </section>
  )
}
