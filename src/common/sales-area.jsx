import React, { useEffect, useState } from "react";
import Image from "next/image";

import sales_img_1 from "../../public/assets/img/card/sale-1.png";
import sales_img_2 from "../../public/assets/img/card/sale-2.png";
import sales_img_3 from "../../public/assets/img/card/sale-3.png";
import { useRouter } from "next/router";

import { client } from "../sanity/lib/client";
import { urlFor } from "../sanity/lib/image";
import { salesFetch } from "../sanity/lib/queries";

const sales_content = {
  title: (
    <>
      Track and <span>Analyze Sales</span> in Real time
    </>
  ),
  dub_title: <>Track and Analyze Sales in Real time</>,
  description: (
    <>
      Centralize and simplify payments, and get comprehensive <br /> insights on
      your financials softuch.!
    </>
  ),

  sales_feature: [
    {
      id: 1,
      color: "yellow-1",
      list: "No hidden fees.",
    },
    {
      id: 2,
      color: "purple-2",
      list: "100% security. Guaranteed.",
    },
    {
      id: 3,
      color: "green-3",
      list: "No training or maintenance needed",
    },
  ],

  sales_img: [
    {
      id: 1,
      cls: "main-thumb",
      img: sales_img_1,
    },
    {
      id: 2,
      cls: "sub-img-1",
      img: sales_img_2,
    },
    {
      id: 3,
      cls: "sub-img-2 d-none d-sm-block",
      img: sales_img_3,
    },
  ],
};
const { title, dub_title, description, sales_feature, sales_img } =
  sales_content;

const SalesArea = ({ style_service }) => {
  const { locale } = useRouter();

  const [salesData, setSalesData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const query = salesFetch;
      const data = await client.fetch(query);
      setSalesData(data);
    };

    fetchData();
  }, []);

  return (
    <>
      {salesData?.appear && (
        <div className="tp-sales-area tp-sales-space">
          <div className="container">
            <div className="row align-items-center">
              <div
                className="col-xl-6 col-lg-6 order-1 order-md-1 wow tpfadeLeft"
                data-wow-duration=".9s"
                data-wow-delay=".5s"
              >
                <div className="tp-sales-section-box pb-20">
                  <h3 className="tp-section-title-3 pb-15 ">
                    {salesData?.title?.[locale]}
                  </h3>
                  <p className="tp-title-anim">
                    {salesData?.description?.[locale]}
                  </p>
                </div>
                <div className="tp-sales-feature">
                  <ul className="sales-direction">
                    <li className="yellow-1">
                      <span>
                        <i className="far fa-check"></i>{" "}
                        <em>{salesData?.yellow?.[locale]}</em>
                      </span>
                    </li>
                    <li className="purple-2">
                      <span>
                        <i className="far fa-check"></i>{" "}
                        <em>{salesData?.blue?.[locale]}</em>
                      </span>
                    </li>
                    <li className="green-3">
                      <span>
                        <i className="far fa-check"></i>{" "}
                        <em>{salesData?.green?.[locale]}</em>
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
              <div
                className="col-xl-6 col-lg-6 order-0 order-md-2 wow tpfadeRight"
                data-wow-duration=".9s"
                data-wow-delay=".7s"
              >
                <div className="tp-sales-img-wrapper p-relative text-end">
                  <div className={`tp-sales-main-thumb`}>
                    <img
                      src={
                        salesData?.mainImage?.asset?._ref
                          ? urlFor(salesData?.mainImage).url()
                          : ""
                      }
                      alt="theme-pure"
                    />
                  </div>
                  <div className={`tp-sales-sub-img-1`}>
                    <img
                      src={
                        salesData?.AnimatedImage?.asset?._ref
                          ? urlFor(salesData?.AnimatedImage).url()
                          : ""
                      }
                      alt="theme-pure"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SalesArea;
