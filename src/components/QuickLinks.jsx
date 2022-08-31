import clsx from 'clsx'
import Link from 'next/link'

import { Icon } from '@/components/Icon'

export function QuickLinks({ children, type = 'nav' }) {
  return (
    <div className={clsx(
      "not-prose my-4 md:my-12 grid",
      type !== 'nav' && "gap-6",
      type === 'nav' && "gap-1",
      type === 'nav' && 'grid-cols-3',
      type != 'nav' && 'grid-cols-1 sm:grid-cols-1')}>
      {children}
    </div>
  )
}

export function QuickLink({ title, description, href, type = 'nav'}) {
  return (
    <div className="group relative rounded-xl border border-slate-200 dark:border-slate-800">
      <div className="absolute -inset-px rounded-xl border-2 border-transparent opacity-0 [background:linear-gradient(var(--quick-links-hover-bg,theme(colors.sky.50)),var(--quick-links-hover-bg,theme(colors.sky.50)))_padding-box,linear-gradient(to_top,theme(colors.indigo.400),theme(colors.cyan.400),theme(colors.sky.500))_border-box] group-hover:opacity-100 dark:[--quick-links-hover-bg:theme(colors.slate.800)]" />
      <Link href={href}>
        <div className={clsx("relative overflow-hidden rounded-xl p-6", type === 'nav' && 'px-1' )}>
          <h2 className={clsx("font-display text-slate-900 dark:text-white text-sm", type === 'nav' ? 'text-xs text-center' : 'text-base')}>
            {title}
          </h2>
          <p className="mt-1 text-sm text-slate-700 dark:text-slate-400">
            {description}
          </p>
        </div>
      </Link>
    </div>
  )
}
