import Slider from "react-slick";

import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

import left_shape from "../../public/assets/img/hero/hero-left-shape-3-1.png";
import gradient_bg from "../../public/assets/img/hero/hero-gradient-3.jpg";
import Image from "next/image";
import { newsFetch, sliderFetch } from "../sanity/lib/queries";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { client } from "../sanity/lib/client";
import { urlFor } from "../sanity/lib/image";
import Link from "next/link";

const slides = [
  {
    image: "/assets/img/vedio/vedio-img.png",
    title: "مرحبًا بك في موقعنا",
    description: "نحن نقدم أفضل الحلول لتطوير أعمالك.",
  },
  {
    image: "/assets/img/vedio/vedio-img.png",
    title: "اكتشف خدماتنا",
    description: "خدمات احترافية في تصميم وتطوير المواقع.",
  },
  {
    image: "/assets/img/vedio/vedio-img.png",
    title: "ابدأ اليوم",
    description: "انطلق في رحلتك الرقمية معنا.",
  },
];

const NextArrow = ({ onClick }) => (
  <div className={`arrow next`} onClick={onClick}>
    <FaArrowRight />
  </div>
);

const PrevArrow = ({ onClick }) => (
  <div className={`arrow prev`} onClick={onClick}>
    <FaArrowLeft />
  </div>
);

const HeroSlider = () => {
  const [newsData, setNewsData] = useState(null);

  const { locale } = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const query = sliderFetch;
      const data = await client.fetch(query);
      setNewsData(data);
    };

    fetchData();
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    autoplay: false,
    speed: 800,
    autoplaySpeed: 8000,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  return (
    <section className="tp-hero-area tp-hero-pt pt-170 pb-70 p-relative ">
      <div className="tp-hero-left-shape">
        <Image src={left_shape} alt="them-pure" />
      </div>
      <div className="tp-hero-gradient-bg">
        <Image src={gradient_bg} alt="them-pure" />
      </div>
      <div className="sliderContainer mt-120">
        <div className={"sliderWrapper"}>
          <Slider {...settings}>
            {newsData?.mainCards?.map((slide, index) => (
              <Link
                key={index}
                href={`${locale}/news/${slide.slug?.current}`}
                className={"slideCard"}
              >
                {/* <img src={slide.image} alt={slide.title?.[locale]} /> */}
                <img
                  src={
                    slide.image?.asset?._ref ? urlFor(slide.image).url() : ""
                  }
                  alt="theme-pure"
                />
                <div className={"mainContent"}>
                  <h3>{slide.title?.[locale]}</h3>
                  <p>{slide.description?.[locale]}</p>
                </div>
              </Link>
            ))}
          </Slider>
        </div>
        <div className="sideCards">
          {newsData?.sideCards.map((slide, index) => (
            <Link
              key={index}
              href={`${locale}/news/${slide.slug?.current}`}
              className="sideCard"
            >
              <img
                src={slide.image?.asset?._ref ? urlFor(slide.image).url() : ""}
                alt="theme-pure"
              />
              <div className="content">
                <h3>{slide.title?.[locale]}</h3>
                <p>{slide.description?.[locale]}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSlider;
