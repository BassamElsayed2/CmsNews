import VideoPopup from "@/src/modals/video-popup";
import { useRouter } from "next/router";
import React, { useState } from "react";

// const company_content = {
//   sub_title: "ABOUT THE COMPANY",
//   title: (
//     <>
//       Softuch is Made <br />
//       For the Creator.
//     </>
//   ),
//   info_1: (
//     <>
//       Lorem ipsum dolor sit amet, consectetur adipiscing elit. Rutrum arcu
//       sollicitudin viverra sit elit leo in. Vitae eu tellus mattis quis. Eu,
//       tempus donec nam mauris egestas. Id aliquet ultricies ligula tellus arcu
//       dolor. Massa arcu pulvinar in mattis
//     </>
//   ),
//   info_2: (
//     <>
//       Feugiat purus congue risus, blandit a sed. In aenean quam aenean purus
//       dictum pellentesque consequat.!
//     </>
//   ),
//   info_3: (
//     <>
//       Our clean and simple APIs and transparent SaaS model will give you
//       complete peace of mind.
//     </>
//   ),
// };
// const { sub_title, title, info_1, info_2, info_3 } = company_content;ح
const CompanyArea = ({ title, text = [] }) => {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const { locale } = useRouter();

  return (
    <>
      <div className="ab-company-area pt-105 pb-20">
        <div className="container">
          <div className="row ab-company-section-space">
            <div className="col-xl-6">
              <div className="ab-company-section-box">
                <h4 className="inner-section-subtitle">
                  {locale === "en" ? "ABOUT THE COMPANY" : "عن الشركة"}
                </h4>
                <h3 className="tp-section-title">{title?.[locale]}</h3>
              </div>
            </div>
            <div
              className="col-xl-6 wow tpfadeRight"
              data-wow-duration=".9s"
              data-wow-delay=".5s"
            >
              <div className="ab-company-right">
                <div className="ab-company-section-text">
                  {text.length > 0 ? (
                    text.map((item, index) => (
                      <p key={index} className="pb-10">
                        {item?.[locale]}
                      </p>
                    ))
                  ) : (
                    <p className="pb-10">
                      {locale === "en"
                        ? "No information available."
                        : "لا توجد معلومات متاحة."}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Video Modal */}
      <VideoPopup
        isVideoOpen={isVideoOpen}
        setIsVideoOpen={setIsVideoOpen}
        videoId={"Ql5kyJaYbls&list"}
      />
    </>
  );
};

export default CompanyArea;
