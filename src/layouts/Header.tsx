import { LogoDefault } from 'components/Logo'
import Link from 'next/link'
import Router from 'next/router'
import React from 'react'
const openSourceBadge =
  '<span className="text-xs bg-klexp-700 py-1 px-2 rounded-lg text-green-500 align-middle">OS</span>'

const headerItemClass =
  'text-klexs px-3 py-2 h-full text-sm font-medium border-t-2 hover:border-klexp-500 border-white hover:border-klexs-500 hover:text-klexp-500'

const headerItemClassMobile =
  'text-klexs hover:bg-klexp-500 hover:text-white block px-3 py-2 rounded-md text-base font-medium'

const Items = [
  {
    name: 'Entwicklung',
    href: '/lets-hacking',
  },
  {
    name: 'Angebot',
    href: '/angebot',
  },
  {
    name: 'Beratung',
    href: '/beratung',
  },
  {
    name: 'Projekte',
    href: '/finish-project',
  },
  {
    name: 'Kontakt',
    href: '/contact',
  },
]

export function Header() {
  const [menuOpen, setMenuOpen] = React.useState(false)

  return (
    <div className="h-24">
      <nav className="bg-white shadow-md overflow fixed w-screen z-10 h-20">
        <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
          <div className="relative flex items-center justify-between h-20">
            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
              <button
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-klexp-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                aria-expanded="false"
                onClick={() => setMenuOpen(!menuOpen)}
              >
                <span className="sr-only">Open main menu</span>

                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>

                <svg
                  className="hidden h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
              <Link href="/">
                <a
                  onContextMenu={(e) => {
                    e.preventDefault()
                    Router.push('/')
                  }}
                >
                  <div
                    className="flex-shrink-0 flex items-center"
                    onClick={() => {
                      setMenuOpen(false)
                    }}
                  >
                    <LogoDefault className="block lg:hidden h-8 w-auto" />
                    <LogoDefault className="hidden lg:block h-8 w-auto" />
                  </div>
                </a>
              </Link>
            </div>

            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              <div className="ml-3 relative h-full">
                <div className="hidden sm:block sm:ml-6">
                  <div className="flex space-x-4">
                    {Items.map((e, i) => {
                      return (
                        <Link key={`link-h-${i}`} href={e?.href}>
                          <a key={`link-a-${i}`} href={e?.href} className={headerItemClass}>
                            {e?.name}
                          </a>
                        </Link>
                      )
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {menuOpen ? (
          <div className="sm:hidden bg-white shadow-md" id="mobile-menu">
            <div className="border-b border-gray-200 py-1 md:hidden"></div>
            <div className="px-2 pt-2 pb-3 space-y-1">
              {Items.map((e, i) => {
                return (
                  <Link key={`link-h-m-${i}`} href={e?.href}>
                    <a
                      key={`link-a-m-${i}`}
                      href={e?.href}
                      className={headerItemClassMobile}
                      onClick={() => setMenuOpen(false)}
                    >
                      {e?.name}
                    </a>
                  </Link>
                )
              })}
            </div>
          </div>
        ) : null}
      </nav>
    </div>
  )
}
