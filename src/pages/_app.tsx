import { Header } from "layouts/Header";
import Router from "next/dist/next-server/lib/router/router";
import Head from "next/head";
import React, { Fragment, useEffect, useState } from "react";
import { Title } from "../components/Title";
import "../css/globals.css";
import { Footer } from "../layouts/Footer";

export default function App({ Component, pageProps, router }) {
  let [navIsOpen, setNavIsOpen] = useState(false);

  useEffect(() => {
    if (!navIsOpen) return;
    function handleRouteChange() {
      setNavIsOpen(false);
    }
    Router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      Router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [navIsOpen]);

  const Layout = Component.layoutProps?.Layout || Fragment;
  const layoutProps = Component.layoutProps?.Layout
    ? { layoutProps: Component.layoutProps, navIsOpen, setNavIsOpen }
    : {};
  const meta = Component.layoutProps?.meta || {};
  const description =
    meta.metaDescription || meta.description || "Documentation for KlexHub";

  if (router.pathname.startsWith("/examples/")) {
    return <Component {...pageProps} />;
  }

  return (
    <>
      <Title suffix="KlexHub">{meta.metaTitle || meta.title}</Title>
      <Head>
        <meta
          key="twitter:card"
          name="twitter:card"
          content="summary_large_image"
        />
        <meta key="twitter:site" name="twitter:site" content="@KlexHub" />
        <meta
          key="twitter:description"
          name="twitter:description"
          content={description}
        />
        <meta
          key="twitter:image"
          name="twitter:image"
          content={`https://klexhub.com${"TODO"}`}
        />
        <meta key="twitter:creator" name="twitter:creator" content="@KlexHub" />
        <meta
          key="og:url"
          property="og:url"
          content={`https://klexhub.com${router.pathname}`}
        />
        <meta key="og:type" property="og:type" content="article" />
        <meta
          key="og:description"
          property="og:description"
          content={description}
        />
        <meta
          key="og:image"
          property="og:image"
          content={`https://klexhub.com${"TODO"}`}
        />
      </Head>
      <Header />

      <Layout {...layoutProps}>
        <Component {...pageProps} />
      </Layout>

      <Footer />
    </>
  );
}
