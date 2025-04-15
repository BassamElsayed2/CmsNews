import Slider from "react-slick";

import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

import left_shape from "../../public/assets/img/hero/hero-left-shape-3-1.png";
import gradient_bg from "../../public/assets/img/hero/hero-gradient-3.jpg";
import Image from "next/image";
import { newsFetch } from "../sanity/lib/queries";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { client } from "../sanity/lib/client";
import { urlFor } from "../sanity/lib/image";

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
      const query = `
  *[_type == "news"][0]{
    otherCards[category._ref == "05b2e7ba-21c7-4d0d-b911-7ecbbf0a2d83"]{
      image,
      title,
      slug,
      description,
      category->{
        _id,
        title
      }
    }
  }
`;
      const data = await client.fetch(query);
      setNewsData(data);
    };

    fetchData();
  }, []);

  console.log(newsData);

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
      <div className=" mt-120">
        <div className={"sliderWrapper"}>
          <Slider {...settings}>
            {newsData?.otherCards?.map((slide, index) => (
              <div key={index} className={"slideCard"}>
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
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
};

export default HeroSlider;
