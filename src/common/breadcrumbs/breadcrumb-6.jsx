import React from "react";
import Image from "next/image";
import SocialLinks from "../social-links";

import img_1 from "../../../public/assets/img/breadcrumb/breadcrumb-shape-1.png";
import img_2 from "../../../public/assets/img/breadcrumb/breadcrumb-shape-2.png";
import img_3 from "../../../public/assets/img/blog/blog-avata-1.png";
import { useRouter } from "next/router";
import { urlFor } from "@/src/sanity/lib/image";

const breadcrumb_content = {
  sub_title: "Resources",
  title: "Developing Privacy User Centric Apps",
  author_name: "Rudra Ghosh",
  author_info: "CEO Dulalix  •   April 24, 2022",
};
const { sub_title, title, author_name, author_info } = breadcrumb_content;

const BreadcrumbSix = ({ blogDetails }) => {
  const { locale } = useRouter();

  return (
    <>
      <div className="breadcrumb__area breadcrumb-ptb-4 p-relative blue-bg-2">
        <div className="breadcrumb__shape-1">
          <Image src={img_1} alt="theme-pure" />
        </div>
        <div className="breadcrumb__shape-2">
          <Image src={img_2} alt="theme-pure" />
        </div>
        <div className="container">
          <div className="row align-items-end">
            <div className="col-xl-9 col-lg-9 col-md-9">
              <div className="blog-details-banner z-index-2">
                <div className="blog-details-title-box">
                  <span>{blogDetails?.category?.[locale]}</span>
                  <h3 className="blog-details-banner-title">
                    {locale === "en" ? "Artical" : "مقال"}
                  </h3>
                </div>
                <div className="tp-blog-author-info-box d-flex align-items-center ">
                  <div className="tp-blog-avata ml-5">
                    <img
                      src={
                        blogDetails?.author_img?.asset?._ref
                          ? urlFor(blogDetails?.author_img).url()
                          : ""
                      }
                      alt=""
                    />
                  </div>
                  <div className="tp-blog-author-info">
                    <h5>{blogDetails?.author_name?.[locale]}</h5>
                    <span>{blogDetails?.job_title?.[locale]} </span>
                    <span> . {blogDetails?.date}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-lg-3 col-md-3">
              <div className="blog-details-social-box z-index-3 text-md-end text-start">
                {/* <SocialLinks /> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BreadcrumbSix;
