import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import useTitleAnimation from "@/src/hooks/useTitleAnimation";
import useBreadcrumbTitleAnime from "@/src/hooks/useBreadcrumbTitleAnime";

import shape_1 from "../../../public/assets/img/breadcrumb/breadcrumb-shape-1.png";
import shape_2 from "../../../public/assets/img/breadcrumb/breadcrumb-shape-2.png";
import shape_3 from "../../../public/assets/img/breadcrumb/breadcrumb-3.png";
import shape_4 from "../../../public/assets/img/breadcrumb/breadcrumb-sub-1.png";
import { useRouter } from "next/router";

const BreadcrumbTwo = ({ title, innertitle, team_details, career_details }) => {
  const { animeRef } = useBreadcrumbTitleAnime();
  let subtitleRef = useRef(null);

  const { locale } = useRouter();

  useTitleAnimation(subtitleRef);
  return (
    <>
      <div className="breadcrumb__area breadcrumb-height p-relative blue-bg-2">
        <div className="breadcrumb__shape-1">
          <Image src={shape_1} alt="theme-pure" />
        </div>
        <div className="breadcrumb__shape-2">
          <Image src={shape_2} alt="theme-pure" />
        </div>
        <div className="container">
          <div className="row">
            <div className="col-xl-8 col-lg-7">
              <div className="breadcrumb__content">
                <h3
                  ref={animeRef}
                  className="breadcrumb__title tp-char-animation anime_text"
                >
                  {title}
                </h3>
                <div
                  ref={subtitleRef}
                  className="breadcrumb__list tp-title-anim tp__title_anime"
                >
                  <span className="child-one">
                    <Link href="/">
                      {locale === "en" ? "home" : "الرئيسية"}
                    </Link>
                  </span>
                  <span className="dvdr">
                    <i
                      className={`fal fa-angle-${locale === "en" ? "right" : "left"}`}
                    ></i>
                  </span>
                  <span
                    className={`${team_details && "child-one"} ${
                      career_details && "child-one"
                    }`}
                  >
                    {innertitle}
                  </span>
                  {team_details && (
                    <>
                      <span className="dvdr">
                        <i className="fal fa-angle-right"></i>
                      </span>
                      <span>Imdat Cimsit</span>
                    </>
                  )}
                  {career_details && (
                    <>
                      <span className="dvdr">
                        <i className="fal fa-angle-right"></i>
                      </span>
                      <span>Team Member</span>
                    </>
                  )}
                </div>
              </div>
            </div>
            <div
              className={`col-xl-4 col-lg-5 col-lg-4 text-center text-md-${locale === "en" ? "end" : "start"}`}
            >
              <div className={`breadcrumb__img p-relative text-start z-index`}>
                <Image className="z-index-3" src={shape_3} alt="theme-pure" />
                <div
                  className="breadcrumb__sub-img wow tpfadeUp"
                  data-wow-duration=".9s"
                  data-wow-delay=".4s"
                >
                  <Image src={shape_4} alt="theme-pure" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BreadcrumbTwo;
