import Link from 'next/link'
import { navigation } from '@/data';

function Hit({ hit, children }) {
  return <Link href={hit.url}>{children}</Link>
}

export function NavHeader({ currentPage }) {
  return (
    <>
      <div className="hidden justify-between items-center w-full md:flex lg:w-auto lg:order-1">
        <ul className="flex flex-col mt-4 font-medium md:flex-row lg:space-x-8 lg:mt-0">
          {navigation.map(nav => (
            <li key={nav.href}>
              <Link href={nav.href} className="block py-2 pr-4 pl-3 text-slate-900 dark:text-white rounded bg-primary-700 lg:bg-transparent lg:text-primary-700 lg:p-0" aria-current="page">
                {nav.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}
