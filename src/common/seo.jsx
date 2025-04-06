import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { seoFetch } from "../sanity/lib/queries";
import { client } from "../sanity/lib/client";

const SEO = () => {
  const { locale } = useRouter();

  const [seoData, setSeoData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const query = seoFetch;
      const data = await client.fetch(query);
      setSeoData(data);
      setLoading(false);
    };

    fetchData();
  }, []);

  return (
    <>
      <Head>
        <title>
          {loading ? "Loading..." : seoData?.pageTitle?.[locale] || "Untitled"}
        </title>
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <meta name="description" content="Generated by create next app" />
        <meta name="robots" content="noindex, follow" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        {seoData?.favicon && <link rel="icon" href="/favicon.png" />}
      </Head>
    </>
  );
};

export default SEO;
