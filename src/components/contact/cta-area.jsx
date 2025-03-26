import { client } from "@/src/sanity/lib/client";
import { ctaFetch } from "@/src/sanity/lib/queries";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const cta_content = {
  bg_img: "/assets/img/cta/cta-bg.jpg",
  title: "Try our service now!",
  description: (
    <>
      Eyerything you need to accept cord payments and grow your business <br />{" "}
      anywhere on the planet.
    </>
  ),
  btn_text: "Get Started Now",
};
const { bg_img, title, description, btn_text } = cta_content;

const CtaArea = () => {
  const [ctaData, setCtaData] = useState(null);

  const { locale } = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const query = ctaFetch;
      const data = await client.fetch(query);
      setCtaData(data);
    };

    fetchData();
  }, []);

  

  return (
    <>
      <div className="tp-cta-area p-relative">
        <div className="tp-cta-grey-bg grey-bg-2"></div>
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div
                className="tp-cta-bg"
                style={{ backgroundImage: `url(${bg_img})` }}
              >
                <div className="tp-cta-content tp-inner-font text-center">
                  <h3 className="tp-section-title text-white">
                    {ctaData?.headerTitle?.[locale]}
                  </h3>
                  <p>{ctaData?.paragraph?.[locale]}</p>
                  <Link
                    className="tp-btn-inner white-bg text-black"
                    href={`/${locale}${ctaData?.button.url}`}
                  >
                    {ctaData?.button.text?.[locale]}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CtaArea;
