import React from "react";
import Image from "next/image";
import brand_img from "../../../public/assets/img/blog/blog-details-1.jpg";

const Banner = ({vCode}) => {
  return (
    <div className="blog-details-img-area mb-80">
      <div className="container">
        <div className="row">
          <div className="col-xl-12">
            <div className="blog-details-big-img z-index-2">
              <div className="video-wrapper">
                <iframe
                  width="100%"
                  height="500"
                  src={`https://www.youtube.com/embed/${vCode}`}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;

