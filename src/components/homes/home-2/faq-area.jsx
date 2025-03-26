import AnswerQuestion from "@/src/common/answer-question";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

import img from "../../../../public/assets/img/faq/faq-1.png";
import { useRouter } from "next/router";
import { faqFetch } from "@/src/sanity/lib/queries";
import { client } from "@/src/sanity/lib/client";
import { urlFor } from "@/src/sanity/lib/image";

const faq_content = {
  sub_title: "Support",
  title: (
    <>
      Frequently <br /> Asked Questions
    </>
  ),
  description: (
    <>
      Sed ut perspiciatis unde omnis iste natus error <br /> sit voluptatem
      accusantium.!
    </>
  ),
  btn_text: "Get in Touch",
};
const { sub_title, title, description, btn_text } = faq_content;

const FaqArea = ({ style_service }) => {
  const [faqData, setFaqData] = useState(null);

  const { locale } = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const query = faqFetch;
      const data = await client.fetch(query);
      setFaqData(data);
    };

    fetchData();
  }, []);

  return (
    <>
      {faqData?.appear && (
        <div className="tp-faq-area pt-140 pb-120 fix">
          <div className="container">
            <div className="row">
              <div
                className={`col-xl-6 col-lg-6 ${style_service && "wow tpfadeLeft"}`}
                data-wow-duration={style_service && ".9s"}
                data-wow-delay={style_service && ".4s"}
              >
                <div className="tp-faq-left-wrapper p-relative">
                  <div
                    className={`tp-faq-section-box ${style_service && "tp-inner-font tp-inner-faq-box"} pb-20`}
                  >
                    <h4
                      className={`${style_service ? "inner-section-subtitle" : "tp-section-subtitle-2"}`}
                    >
                      {faqData?.subTitle?.[locale]}
                    </h4>
                    <h3
                      className={`${style_service ? "tp-section-title" : "tp-section-title-lg"}`}
                    >
                      {faqData?.headerTitle?.[locale]}
                    </h3>
                    <p>{faqData?.paragraph?.[locale]}</p>
                  </div>
                  <div className="tp-faq-btn">
                    <Link
                      className={`${style_service ? "tp-btn-inner tp-btn-hover alt-color-black" : "tp-btn-green"} `}
                      href={`/${locale}${faqData?.button.url}`}
                    >
                      {faqData?.button.text?.[locale]}
                    </Link>
                  </div>
                  <div
                    className="tp-faq-img"
                    data-parallax='{"x": -50, "smoothness": 30}'
                  >
                    <img src={urlFor(faqData.Image).url() || ""} alt="" />
                  </div>
                </div>
              </div>

              <div className="col-xl-6 col-lg-6">
                <AnswerQuestion />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FaqArea;
