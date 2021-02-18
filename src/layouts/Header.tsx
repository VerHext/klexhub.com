import { LogoDefault } from 'components/Logo'
import Link from 'next/link'
import Router from 'next/router'
import React from 'react'
const openSourceBadge =
  '<span className="text-xs bg-klexp-700 py-1 px-2 rounded-lg text-green-500 align-middle">OS</span>'

const headerItemClass =
  'text-klexs px-3 py-2 h-full text-sm font-medium border-t-2 hover:border-klexp-500 border-white hover:border-klexs-500 hover:text-klexp-500'

export function Header() {
  return (
    <div className="h-24">
      <nav className="bg-white shadow-md overflow fixed w-screen z-10 h-20">
        <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
          <div className="relative flex items-center justify-between h-20">
            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
              <button
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                aria-expanded="false"
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
                  <div className="flex-shrink-0 flex items-center">
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
                    <Link href="/lets-hacking">
                      <a href="/lets-hacking" className={headerItemClass}>
                        Entwicklung
                      </a>
                    </Link>
                    <Link href="/angebot">
                      <a href="/angebot" className={headerItemClass}>
                        Angebot
                      </a>
                    </Link>
                    <Link href="/beratung">
                      <a href="/beratung" className={headerItemClass}>
                        Beratung
                      </a>
                    </Link>

                    <Link href="/finish-project">
                      <a href="/contact" className={headerItemClass}>
                        Projekte
                      </a>
                    </Link>
                    <Link href="/contact">
                      <a href="/contact" className={headerItemClass}>
                        Kontakt
                      </a>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  )
}
