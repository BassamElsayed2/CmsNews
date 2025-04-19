import portfolio_data from "@/src/data/portfolio-data";
import { client } from "@/src/sanity/lib/client";
import { urlFor } from "@/src/sanity/lib/image";
import { galleryFetch } from "@/src/sanity/lib/queries";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

// data
const categories = [
  "All",
  ...new Set(portfolio_data.map((item) => item.category)),
];
const Portfolio = () => {
  const { locale } = useRouter();

  const [galleryData, setGalleryData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const query = galleryFetch;
      const data = await client.fetch(query);
      setGalleryData(data);
    };

    fetchData();
  }, []);

  return (
    <>
      <div className="portfolio-area pt-100 pb-90">
        <div className="container">
          <div className="row grid">
            {galleryData?.images.map((item, i) => (
              <div
                key={i}
                className="col-xl-4 col-lg-6 col-md-6 col-sm-6 grid-item  cat1 cat4 cat3 cat5"
              >
                <div className="inner-project-item mb-30">
                  <div className="inner-project-img fix p-relative">
                    <img
                      className="w-100"
                      src={
                        item.image?.asset?._ref ? urlFor(item.image).url() : ""
                      }
                      alt="theme-pure"
                    />
                  </div>
                  <div className="inner-project-content">
                    <span className="inner-project-category-title">
                      {item.subTitle?.[locale]}
                    </span>
                    <h4 className="inner-project-title">
                      <Link href={`${locale}/gallery/${item.slug?.current}`}>
                        {item.text?.[locale]}
                      </Link>
                    </h4>
                    <p className="truncate-2-lines">
                      {item.description?.[locale]}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Portfolio;
