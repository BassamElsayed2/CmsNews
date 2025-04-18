// components/InvestigationsSection.jsx
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Slider from "react-slick";
import { useRouter } from "next/router";
import { newsFetch } from "../sanity/lib/queries";
import { client } from "../sanity/lib/client";
import { urlFor } from "../sanity/lib/image";

function NewsArea() {
  const [newsData, setNewsData] = useState(null);

  const { locale } = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const query = newsFetch;
      const data = await client.fetch(query);
      setNewsData(data);
    };

    fetchData();
  }, []);

  //
  const sliderSettings = {
    vertical: true,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
    infinite: true,
  };

  return (
    <section className="investigations-section ">
      <div className="section-header">
        <h2>{locale === "en" ? "latest news" : "اخر الاخبار"}</h2>
        <Link href="/news" className="see-all">
          {locale === "en" ? "Show All" : "عرض الكل"}
        </Link>
      </div>

      <div className="content-wrapper mt-50">
        <div className="cards-column">
          {/* Main card */}
          <div className="main-card">
            {newsData?.otherCards.slice(-1).map((item) => (
              <React.Fragment key={item.slug?.current}>
                <Link
                  className="main-content"
                  href={`${locale}/news/${item.slug?.current}`}
                >
                  <h3>{item.title?.[locale]}</h3>
                  <p>{item.description?.[locale]}</p>
                </Link>
                <img
                  src={item.image?.asset?._ref ? urlFor(item.image).url() : ""}
                  alt="theme-pure"
                />
              </React.Fragment>
            ))}
          </div>

          {/* Smaller cards */}
          <div className="card-grid">
            {newsData?.otherCards.slice(-7, -1).map((item) => (
              <Link
                href={`${locale}/news/${item?.slug?.current}`}
                className="small-card"
                key={item?.slug?.current}
              >
                <img
                  src={item.image?.asset?._ref ? urlFor(item.image).url() : ""}
                  alt="theme-pure"
                />
                <h4>{item.title?.[locale]}</h4>
                {/* <span className="date">{item.date}</span> */}
              </Link>
            ))}
          </div>
        </div>

        {/* Vertical Slider */}
        <div className="slider-column">
          <Slider {...sliderSettings}>
            {newsData?.sliderCards.slice(0, 7).map((item) => (
              <div className="slider-card" key={item?.slug?.current}>
                <img
                  src={item.image?.asset?._ref ? urlFor(item.image).url() : ""}
                  alt="theme-pure"
                />
                <Link
                  href={`${locale}/news/${item?.slug?.current}`}
                  className="slider-text"
                >
                  <h4>{item?.title?.[locale]}</h4>
                  <p>{item?.description?.[locale]}</p>
                </Link>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
}

export default NewsArea;
