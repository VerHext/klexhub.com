import clsx from 'clsx'
import Link from 'next/link'
import { Logo } from '../components/Logo'
import styles from './Footer.module.css'
const openSourceBadge =
  '<span class="text-xs bg-klexs-700 py-1 px-2 rounded-lg text-green-500 align-middle">OS</span>'

const footerNav = {
  Produkte: {
    className: 'row-span-2',
    items: [
      {
        title: 'KlexHealth',
        blank: true,
        href: 'https://klexhealth.com',
      },
      {
        title: 'Support++ ' + openSourceBadge,
        isHtml: true,
        blank: true,
        href: 'https://support-pp.de',
      },
    ],
  },
  'KlexHub Entwicklung': {
    className: 'row-span-2',
    items: [
      {
        title: 'Angebot',
        blank: false,
        href: '/angebot',
      },
      {
        title: 'Beratung',
        blank: false,
        href: '/beratung',
      },
      {
        title: 'Projekte',
        blank: false,
        href: '/finish-project',
      },
      {
        title: 'Kontakt',
        blank: false,
        href: '/contact',
      },
    ],
  },

  Rechtliches: {
    className: 'row-span-2',
    items: [
      { title: 'Impressum', href: '/legal/impressum' },
      { title: 'Datenschutzerklärung', href: '/legal/datenschutz' },
      { title: 'AGB', href: '/legal/agb' },
      { title: 'Widerrufsrecht', href: '/legal/widerrufsrecht' },
      { title: 'Branding', href: '/branding' },
    ],
  },

  Kontakt: {
    className: 'row-span-2',
    items: [
      { title: 'GitHub', href: 'https://github.com/klexhub' },
      { title: 'Twitter', href: 'https://twitter.com/KlexHub' },
      { title: 'YouTube', href: 'https://www.youtube.com/channel/UCoqOO8slt5LNM0iNMXaCg8Q' },
      { title: 'Instagram', href: 'https://www.instagram.com/klexhub' },
    ],
  },
}

export function Footer() {
  return (
    <footer className="bg-klexs-500 pt-16 pb-12 sm:pt-20 md:pt-24 xl:pt-32 sm:pb-20 text-white">
      <div className="max-w-screen-lg xl:max-w-screen-xl mx-auto divide-y divide-gray-200 px-4 sm:px-6 md:px-8">
        <ul
          className={`${styles.nav} text-sm font-medium pb-14 sm:pb-20 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-10`}
        >
          {Object.keys(footerNav).map((section, i) => (
            <li key={section} className={clsx('space-y-5', footerNav[section].className)}>
              <h2 className="text-xs font-semibold tracking-wide text-klexorange-500 uppercase">
                {section}
              </h2>
              <ul className="space-y-4">
                {footerNav[section].items.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href}>
                      <a
                        target={item?.blank ? '_blank' : ''}
                        className="hover:text-klexorange-300 text-gray-300 transition-colors duration-200"
                      >
                        {!item?.isHtml ? item.title : ''}
                        <div
                          dangerouslySetInnerHTML={{
                            __html: item?.isHtml ? item?.title : null,
                          }}
                        ></div>
                      </a>
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
        <div className="pt-10 sm:pt-12">
          <Logo width="200" />
          <div className="text-white text-xs pt-4">© 2019-2021 KlexHub UG (haftungsbeschränkt)</div>
        </div>
      </div>
    </footer>
  )
}
