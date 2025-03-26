import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

import card_img_1 from "../../public/assets/img/card/card-bg.png";
import card_img_2 from "../../public/assets/img/card/card-shape-1.png";
import card_img_3 from "../../public/assets/img/card/card-img-1.png";
import card_img_4 from "../../public/assets/img/card/card-img-2.png";
import card_img_5 from "../../public/assets/img/card/card-img-3.png";
import card_img_6 from "../../public/assets/img/card/card-img-4.png";
import { useRouter } from "next/router";
import { client } from "../sanity/lib/client";
import { urlFor } from "../sanity/lib/image";
import { cardFetch } from "../sanity/lib/queries";

const card_content = {
  card_images: [
    {
      id: 1,
      cls: "main-img",
      data_parallax: "",
      img: card_img_1,
    },
    {
      id: 2,
      cls: "img-1 d-none d-sm-block",
      data_parallax: "",
      img: card_img_2,
    },
    {
      id: 3,
      cls: "img-2 d-none d-sm-block",
      data_parallax: '{"x": 50, "smoothness": 30}',
      img: card_img_3,
    },
    {
      id: 4,
      cls: "img-3 d-none d-sm-block",
      data_parallax: '{"x": -50, "smoothness": 30}',
      img: card_img_4,
    },
    {
      id: 5,
      cls: "img-4 d-none d-sm-block",
      data_parallax: "",
      img: card_img_5,
    },
    {
      id: 6,
      cls: "img-5 d-none d-sm-block",
      data_parallax: "",
      img: card_img_6,
    },
  ],

  title: (
    <>
      Manage <span>All your Cards</span> in one Place
    </>
  ),
  description: (
    <>
      Digital products are where it’s at! There are so many benefits to selling
      digital products. It’s easy to get started and they <br />
      can be extremely profitable
    </>
  ),
  btn_text: "Get Started Free",
};
const { card_images, title, description, btn_text } = card_content;

const CardArea = ({ style_service }) => {
  const { locale } = useRouter();

  const [cardData, setCardData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const query = cardFetch;
      const data = await client.fetch(query);
      setCardData(data);
    };

    fetchData();
  }, []);

  return (
    <>
      {cardData?.appear && (
        <div className="tp-card-area tp-card-space pt-105 pb-60">
          <div className="container">
            <div className="row">
              <div
                className="col-xl-6 col-lg-6 wow tpfadeLeft"
                data-wow-duration=".9s"
                data-wow-delay=".5s"
              >
                <div className="tp-card-thumb-wrapper p-relative">
                  <div className={`tp-card-main-img`}>
                    <img
                      src={
                        cardData?.mainImage
                          ? urlFor(cardData?.mainImage).url()
                          : ""
                      }
                      alt="theme-pure"
                    />
                  </div>
                  <div className={`tp-card-img-1 d-none d-sm-block`}>
                    <img
                      src={
                        cardData?.AnimatedImageOne
                          ? urlFor(cardData?.AnimatedImageOne).url()
                          : ""
                      }
                      alt="theme-pure"
                    />
                  </div>
                  <div className={`tp-card-img-5 d-none d-sm-block`}>
                    <img
                      src={
                        cardData?.AnimatedImagetwo
                          ? urlFor(cardData?.AnimatedImagetwo).url()
                          : ""
                      }
                      alt="theme-pure"
                    />
                  </div>
                </div>
              </div>
              <div
                className="col-xl-6 col-lg-6 wow tpfadeRight"
                data-wow-duration=".9s"
                data-wow-delay=".7s"
              >
                <div className="tp-card-title-box">
                  <h3 className="tp-section-title-3 pb-15">
                    {cardData?.headerTitle?.[locale]}
                  </h3>
                  <p className="">{cardData?.paragraph?.[locale]}</p>
                  <Link
                    className={`${style_service ? "tp-btn-inner" : "tp-btn-blue-lg"} tp-btn-hover alt-color-black`}
                    href={`/${locale}/contact`}
                  >
                    <span>{cardData?.button?.text?.[locale]}</span>
                    <b></b>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CardArea;
