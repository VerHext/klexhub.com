import { Title } from "components/Title";
import Head from "next/head";
import { useRouter } from "next/router";

export function DocumentationLayout(props) {
  const router = useRouter();

  return (
    <>
      <Title suffix={router.pathname === "/" ? undefined : "Tailwind CSS"}>
        {props.layoutProps.meta.metaTitle || props.layoutProps.meta.title}
      </Title>
      <Head>
        <meta key="twitter:card" name="twitter:card" content="summary" />
        <meta
          key="twitter:image"
          name="twitter:image"
          content={`https://tailwindcss.com${"TODO"}`}
        />
      </Head>
    </>
  );
}
