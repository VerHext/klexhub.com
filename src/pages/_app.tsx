import { Header } from 'layouts/Header'
import Router from 'next/dist/next-server/lib/router/router'
import Head from 'next/head'
import React, { Fragment, useEffect, useState } from 'react'
import { Title } from '../components/Title'
import '../css/extracss.css'
import '../css/globals.css'
import { Footer } from '../layouts/Footer'

export default function App({ Component, pageProps, router }) {
  let [navIsOpen, setNavIsOpen] = useState(false)

  useEffect(() => {
    if (!navIsOpen) return
    function handleRouteChange() {
      setNavIsOpen(false)
    }
    Router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      Router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [navIsOpen])

  const Layout = Component.layoutProps?.Layout || Fragment
  const layoutProps = Component.layoutProps?.Layout
    ? { layoutProps: Component.layoutProps, navIsOpen, setNavIsOpen }
    : {}
  const meta = Component.layoutProps?.meta || {}
  const description =
    meta.metaDescription ||
    meta.description ||
    'KlexHub entwickelt kundenspezifische Software, digitale Lösungen die begeistern. Fordern Sie jetzt ein unverbindliches Angebot ein.'

  if (router.pathname.startsWith('/examples/')) {
    return <Component {...pageProps} />
  }
  // import optional styles

  return (
    <>
      <Title suffix="KlexHub">{meta.metaTitle || meta.title || 'KlexHub'}</Title>
      <Head>
        <meta name="description" content={description} />
        <meta
          name="keywords"
          content="software, entwicklung, jettingen, softwareunternehmen, code, website, klexhub, support-pp "
        />
        <meta key="twitter:card" name="twitter:card" content="summary_large_image" />
        <meta key="twitter:site" name="twitter:site" content="@KlexHub" />
        <meta key="twitter:description" name="twitter:description" content={description} />
        <meta key="twitter:image" name="twitter:image" content={`/images/KlexHubLogo.png`} />
        <meta key="twitter:creator" name="twitter:creator" content="@KlexHub" />
        <meta key="og:url" property="og:url" content={`https://klexhub.com${router.pathname}`} />
        <meta key="og:type" property="og:type" content="website" />
        <meta key="og:description" property="og:description" content={description} />
        <meta key="og:image" property="og:image" content={`/images/KlexHubLogo.png`} />
      </Head>
      <div className="prose"></div>
      <Header />

      <Layout {...layoutProps}>
        <Component {...pageProps} />
      </Layout>

      <Footer />
    </>
  )
}
