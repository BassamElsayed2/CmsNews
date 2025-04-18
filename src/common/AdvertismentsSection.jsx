import React, { useEffect, useState } from "react";
import { adsFetch } from "../sanity/lib/queries";
import { useRouter } from "next/router";
import { client } from "../sanity/lib/client";
import { urlFor } from "../sanity/lib/image";
import Link from "next/link";

function AdvertismentsSection() {
  const [adsData, setAdsData] = useState(null);

  const { locale } = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const query = adsFetch;
      const data = await client.fetch(query);
      setAdsData(data);
    };

    fetchData();
  }, []);

  return (
    <div className={"advertismentsContainer adsSection"}>
      <h2 className={"adsTitle"}>{locale === "en" ? "ads" : "إعلانات"}</h2>

      <div className={"adsList"}>
        {adsData?.ads.map((ads, index) => (
          <Link key={index} className={"adCard"} href={ads.link}>
            <img
              className="adImage"
              src={ads.image?.asset?._ref ? urlFor(ads.image).url() : ""}
              alt="theme-pure"
            />
            <div className={"adContent clamped-text "}>
              <h3>{ads?.title?.[locale]}</h3>
              <p>{ads?.description?.[locale]}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default AdvertismentsSection;
