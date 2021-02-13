import clsx from 'clsx'
import { ClassTable } from 'components/ClassTable'
import { PageHeader } from 'components/PageHeader'
import { createContext, Fragment, isValidElement, useCallback, useEffect, useState } from 'react'

export const ContentsContext = createContext({})

function TableOfContents({ tableOfContents, currentSection }) {
  return (
    <>
      <h5 className="text-gray-900 uppercase tracking-wide font-semibold mb-3 text-sm lg:text-xs">
        On this page
      </h5>
      <ul className="overflow-x-hidden text-gray-500 font-medium">
        {tableOfContents.map((section) => {
          let sectionIsActive =
            currentSection === section.slug ||
            section.children.findIndex(({ slug }) => slug === currentSection) > -1

          return (
            <Fragment key={section.slug}>
              <li>
                <a
                  href={`#${section.slug}`}
                  className={clsx(
                    'block transform transition-colors duration-200 py-2 hover:text-gray-900',
                    {
                      'text-gray-900': sectionIsActive,
                    }
                  )}
                >
                  {section.title}
                </a>
              </li>
              {section.children.map((subsection) => {
                let subsectionIsActive = currentSection === subsection.slug

                return (
                  <li className={'ml-4'} key={subsection.slug}>
                    <a
                      href={`#${subsection.slug}`}
                      className={clsx(
                        'block py-2 transition-colors duration-200 hover:text-gray-900 font-medium',
                        {
                          'text-gray-900': subsectionIsActive,
                        }
                      )}
                    >
                      {subsection.title}
                    </a>
                  </li>
                )
              })}
            </Fragment>
          )
        })}
      </ul>
    </>
  )
}

function useTableOfContents(tableOfContents) {
  let [currentSection, setCurrentSection] = useState(tableOfContents[0]?.slug)
  let [headings, setHeadings] = useState([])

  const registerHeading = useCallback((id, top) => {
    setHeadings((headings) => [...headings.filter((h) => id !== h.id), { id, top }])
  }, [])

  const unregisterHeading = useCallback((id) => {
    setHeadings((headings) => headings.filter((h) => id !== h.id))
  }, [])

  useEffect(() => {
    if (tableOfContents.length === 0 || headings.length === 0) return
    function onScroll() {
      let y = window.pageYOffset
      let windowHeight = window.innerHeight
      let sortedHeadings = headings.concat([]).sort((a, b) => a.top - b.top)
      if (y <= 0) {
        setCurrentSection(sortedHeadings[0].id)
        return
      }
      if (y + windowHeight >= document.body.scrollHeight) {
        setCurrentSection(sortedHeadings[sortedHeadings.length - 1].id)
        return
      }
      const middle = y + windowHeight / 2
      let current = sortedHeadings[0].id
      for (let i = 0; i < sortedHeadings.length; i++) {
        if (middle >= sortedHeadings[i].top) {
          current = sortedHeadings[i].id
        }
      }
      setCurrentSection(current)
    }
    window.addEventListener('scroll', onScroll, {
      capture: true,
      passive: true,
    })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll, true)
  }, [headings, tableOfContents])

  return { currentSection, registerHeading, unregisterHeading }
}

export function ContentsLayoutOuter({ children, layoutProps, ...props }) {
  const { currentSection, registerHeading, unregisterHeading } = useTableOfContents(
    layoutProps.tableOfContents
  )

  return (
    <>
      <div className="mb-8">
        <TableOfContents
          tableOfContents={layoutProps.tableOfContents}
          currentSection={currentSection}
        />
      </div>

      <ContentsContext.Provider value={{ registerHeading, unregisterHeading }}>
        {children}
      </ContentsContext.Provider>
    </>
  )
}

export function ContentsLayout({ children, meta, classes, tableOfContents }) {
  const toc = [
    ...(classes
      ? [
          {
            title: 'Default class reference',
            slug: 'class-reference',
            children: [],
          },
        ]
      : []),
    ...tableOfContents,
  ]

  const { currentSection, registerHeading, unregisterHeading } = useTableOfContents(toc)

  return (
    <div id={meta.containerId} className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
      <div className="pt-10 pb-24 lg:pb-16">
        <div className="grid sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-3">
          <div className="hidden xl:text-sm xl:block flex-none w-64 ">
            <div className="flex flex-col justify-between overflow-y-auto sticky max-h-(screen-18) pt-10 pb-6 top-18">
              {toc.length > 0 && (
                <div className="mb-8">
                  <TableOfContents tableOfContents={toc} currentSection={currentSection} />
                </div>
              )}
            </div>
          </div>
          <div className="col-span-2">
            <PageHeader
              title={meta.title}
              description={meta.description}
              badge={{
                key: 'KlexHub Version',
                value: meta.featureVersion,
              }}
              border={!classes && meta.headerSeparator !== false}
            />
            <ContentsContext.Provider value={{ registerHeading, unregisterHeading }}>
              <div>
                {classes && (
                  <ClassTable {...(isValidElement(classes) ? { custom: classes } : classes)} />
                )}
                {children}
              </div>
            </ContentsContext.Provider>
          </div>
        </div>
      </div>
    </div>
  )
}
