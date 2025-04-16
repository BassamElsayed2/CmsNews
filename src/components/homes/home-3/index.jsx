import FooterThree from "@/src/layout/footers/footer-3";
import HeaderThree from "@/src/layout/headers/header-3";
import React, { useEffect, useState } from "react";
import BlogArea from "./blog-area";

import GalleryArea from "./rated-area";

import NewsArea from "@/src/common/NewsSection";
import CategoryNews from "@/src/common/CategoryNews";
import { useRouter } from "next/router";
import HeroSlider from "@/src/common/HeroSlider";
import AdvertismentsSection from "@/src/common/AdvertismentsSection";
import { categoryFetch } from "@/src/sanity/lib/queries";
import { client } from "@/src/sanity/lib/client";

const HomeThree = () => {
  const [categoryData, setcategoryData] = useState(null);

  const { locale } = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const query = categoryFetch;
      const data = await client.fetch(query);
      setcategoryData(data);
    };

    fetchData();
  }, []);

  return (
    <div className="homeBox">
      <HeaderThree />
      <HeroSlider />
      <NewsArea />
      <div className="midContainer">
        <div className="categorySections">
          {categoryData?.map(
            (category, i) =>
              category?.appear && (
                <CategoryNews
                  key={i}
                  category={category?.slug.current}
                  title={category.title?.[locale]}
                />
              )
          )}
        </div>
        <div className="advertisements">
          <AdvertismentsSection />
        </div>
      </div>

      <GalleryArea />
      <BlogArea />
      <FooterThree />
    </div>
  );
};

export default HomeThree;
