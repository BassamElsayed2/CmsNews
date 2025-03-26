import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import feature_data from "@/src/data/feature-data";
import { useRouter } from "next/router";
import { productFetch } from "@/src/sanity/lib/queries";
import { client } from "@/src/sanity/lib/client";
import { urlFor } from "@/src/sanity/lib/image";

const feature_content = {
  title: (
    <>
      About Customer <span>Stories</span>
    </>
  ),
  des: (
    <>
      Take your business to the next level with <span>09</span> accessible
      premium extensions <br /> & different features
    </>
  ),
  integraton_title_en: "What you will get",
  integraton_title_ar: "ماذا ستحصل عليه",
  integraton_des_en: (
    <>
      Take your business to the next level with <span> 09</span> accessible
      premium extensions <br /> & different features
    </>
  ),
  integraton_des_ar: (
    <>
      ارتقِ بأعمالك إلى مستوى أعلى مع إضافات <span>09</span> المميزة المتاحة
      وميزات متنوعة
    </>
  ),
};
const {
  title,
  des,
  integraton_title_en,
  integraton_title_ar,
  integraton_des_en,
  integraton_des_ar,
} = feature_content;

const FeatureArea = ({ style_integraton }) => {
  const { locale } = useRouter();

  const [productData, setProductData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const query = productFetch;
      const data = await client.fetch(query);
      setProductData(data);
    };

    fetchData();
  }, []);

  return (
    <>
      <div
        className={`tp-feature-area ${style_integraton ? "pt-100 pb-30" : "grey-bg-3 pt-120 pb-110"}`}
      >
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="tp-feature-five-section-box text-center mb-40">
                {style_integraton ? (
                  <>
                    <h3 className="tp-section-title-5 text-black">
                      <span>
                        {locale === "en"
                          ? integraton_title_en
                          : integraton_title_ar}
                      </span>
                    </h3>
                    <p>
                      {locale === "en" ? integraton_des_en : integraton_des_ar}
                    </p>
                  </>
                ) : (
                  <>
                    <h3 className="tp-section-title-5 text-black">
                      {" "}
                      {locale === "en"
                        ? integraton_title_en
                        : integraton_title_ar}
                    </h3>
                    <p>
                      {" "}
                      {locale === "en" ? integraton_des_en : integraton_des_ar}
                    </p>
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="row gx-0 tp-feature-five-wrapper-main">
            {productData?.slideOne.map((item, i) => (
              <div key={i} className="col-xl-3 col-lg-6 col-md-6">
                <div className="tp-feature-five-wrapper">
                  <div
                    className={`tp-feature-five-item tp-feature-five-item-1 text-center z-index`}
                  >
                    <div className="tp-feature-five-icon p-relative">
                      <img
                        src={item?.image ? urlFor(item?.image).url() : ""}
                        alt="theme-pure"
                      />
                      <div
                        className={`tp-feature-five-shape-color tp-feature-five-shape-color-1`}
                      ></div>
                    </div>
                    <div className="tp-feature-five-content">
                      <h4 className="tp-feature-five-title-sm">
                        {item.text?.[locale]}
                      </h4>
                      <p>{item.description?.[locale]}</p>
                    </div>
                    <div className="tp-feature-five-btn">
                      <Link
                        className="tp-btn-purple"
                        href={`/${locale}/service`}
                      >
                        Learn More
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="row gx-0 tp-feature-five-wrapper-main">
            {productData?.slideTwo.map((item, i) => (
              <div key={i} className="col-xl-3 col-lg-6 col-md-6">
                <div className="tp-feature-five-wrapper">
                  <div
                    className={`tp-feature-five-item tp-feature-five-item-1 text-center z-index`}
                  >
                    <div className="tp-feature-five-icon p-relative">
                      <img
                        src={item?.image ? urlFor(item?.image).url() : ""}
                        alt="theme-pure"
                      />
                      <div
                        className={`tp-feature-five-shape-color tp-feature-five-shape-color-2`}
                      ></div>
                    </div>
                    <div className="tp-feature-five-content">
                      <h4 className="tp-feature-five-title-sm">
                        {item.text?.[locale]}
                      </h4>
                      <p>{item.description?.[locale]}</p>
                    </div>
                    <div className="tp-feature-five-btn">
                      <Link
                        className="tp-btn-purple"
                        href={`/${locale}/service`}
                      >
                        Learn More
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* <div className="row">
            <div className="col-12">
              <div className="tp-feature-five-link text-center">
                <span>
                  Check out all of our{" "}
                  <Link href="/service-details">All features</Link>
                </span>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </>
  );
};

export default FeatureArea;
