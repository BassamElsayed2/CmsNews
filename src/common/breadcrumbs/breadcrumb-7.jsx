import React, { useEffect, useState } from "react";
import Image from "next/image";
import useBreadcrumbTitleAnime from "@/src/hooks/useBreadcrumbTitleAnime";

// spahe import here
import shape_1 from "../../../public/assets/img/breadcrumb/breadcrumb-shape-2-2.png";
import shape_2 from "../../../public/assets/img/breadcrumb/breadcrumb-sub-2.png";
import shape_3 from "../../../public/assets/img/breadcrumb/breadcrumb-sub-3.png";
import { useRouter } from "next/router";
import { client } from "@/src/sanity/lib/client";
import { galleryFetch } from "@/src/sanity/lib/queries";
import GalleryDetails from "@/src/pages/gallery/[id]";

const BreadcrumbSeven = () => {
  const { animeRef } = useBreadcrumbTitleAnime();

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
      <div
        className="breadcrumb__area breadcrumb-height-2 breadcrumb-overlay p-relative fix"
        style={{
          backgroundImage: `url(/assets/img/project/project-brdcrmb-bg.jpg)`,
        }}
      >
        <div className="breadcrumb__shape-2 z-index-4">
          <Image src={shape_1} alt="theme-pure" />
        </div>
        <div className="breadcrumb__shape-3 z-index-4">
          <Image src={shape_2} alt="theme-pure" />
        </div>
        <div className="breadcrumb__shape-4 z-index-4">
          <Image src={shape_3} alt="theme-pure" />
        </div>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xl-10">
              <div className="breadcrumb__content z-index-3 text-center">
                <h3
                  ref={animeRef}
                  className="breadcrumb__title tp-char-animation text-black anime_text"
                >
                  {locale === "en" ? "Our Gallery" : "معرضنا"}
                </h3>
                <div
                  className="breadcrumb__text wow tpfadeUp"
                  data-wow-duration=".9s"
                  data-wow-delay=".6s"
                >
                  <p>{galleryData?.desc?.[locale]}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BreadcrumbSeven;
