import React, { useEffect, useRef, useState } from "react";
import Slider from "react-slick";

import Image from "next/image";
import { useRouter } from "next/router";

import { client } from "@/src/sanity/lib/client";
import { urlFor } from "@/src/sanity/lib/image";
import Link from "next/link";
import { galleryFetch } from "@/src/sanity/lib/queries";

const testimonial_content = {
  bg_img: "/assets/img/testimonial/testi-bg-3-1.png",
};
const { bg_img, title } = testimonial_content;

const GalleryArea = () => {
  const sliderRef = useRef(null);

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

  // slider setting
  const settings = {
    slidesToShow: 3,
    slidesToScroll: 1,
    centerMode: locale === "en" ? true : false,
    focusOnSelect: true,
    variableWidth: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 3000,
    speed: 600,
    cssEase: "linear",
    dots: false,
    arrows: false,
    rtl: locale === "ar",
    useTransform: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 1 },
      },
    ],
  };

  useEffect(() => {
    if (sliderRef.current) {
      setTimeout(() => {
        sliderRef.current.slickGoTo(0); // ✅ إعادة تعيين السلايدر بعد التحميل
      }, 100);
    }
  }, [locale]);
  return (
    <>
      {/* {galleryData?.appear && (
        <div className="tp-testimonial-area tp-testimonial-3-mlr pb-110">
          <div
            className="tp-testimonial-3-bg pt-110 fix"
            style={{ backgroundImage: `url(${bg_img})` }}
          >
            <div className="tb-gallery-center">
              <h5 className="tp-section-title-3 text-white pb-40">
                {galleryData?.title?.[locale]}
              </h5>
              <Link
                className="tp-btn-blue-lg tp-btn-hover alt-color-white"
                href={galleryData?.button?.url || "#"}
              >
                <span className="text-color-black">
                  {galleryData?.button?.text?.[locale]}
                </span>
                <b></b>
              </Link>
            </div>
            <div className="gallery-slider-container" dir="ltr">
              <Slider ref={sliderRef} {...settings} className="gallery-slider">
                {galleryData?.images.map((item, i) => (
                  <div key={i} className="gallery-slide">
                    <div className="gallery-image">
                      <Image
                        src={urlFor(item.image).url() || ""}
                        alt={item.text?.[locale]}
                        width={300}
                        height={300}
                      />
                    </div>
                    <div className="gallery-info">
                      <h5>{item.text?.[locale]}</h5>
                    </div>
                  </div>
                ))}
              </Slider>
            </div>
          </div>
        </div>
      )} */}

      {galleryData?.appear && (
        <div className="tp-testimonial-area tp-testimonial-3-mlr pb-110">
          <div
            className="tp-testimonial-3-bg pt-110 fix"
            style={{ backgroundImage: `url(${bg_img})` }}
          >
            <div className="tb-gallery-center">
              <h5 className="tp-section-title-3 text-white pb-40">
                {galleryData?.title?.[locale]}
              </h5>
              <Link
                className="tp-btn-blue-lg tp-btn-hover alt-color-white"
                href={galleryData?.button?.url || "#"}
              >
                <span className="text-color-black">
                  {galleryData?.button?.text?.[locale]}
                </span>
                <b></b>
              </Link>
            </div>

            {/* ✅ استخدام Grid بدل Slider */}
            <div className="gallery-grid-container mt-30 mb-50">
              {galleryData?.images.slice(0, 4).map((item, i) => (
                <div key={i} className="gallery-grid-item">
                  <Link href={`/${locale}/gallery/${item.slug?.current}`}>
                    <Image
                      src={
                        item.image?.asset?._ref ? urlFor(item.image).url() : ""
                      }
                      alt={item.text?.[locale]}
                      width={300}
                      height={300}
                      className="gallery-grid-image"
                    />
                  </Link>
                  <div className="gallery-info">
                    <h5>{item.text?.[locale]}</h5>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default GalleryArea;
