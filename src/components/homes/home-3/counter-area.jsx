import Count from "@/src/common/count";
import Image from "next/image";
import React, { useEffect, useState } from "react";

import counter_shape_1 from "../../../../public/assets/img/counter/counter-shape-2.png";
import counter_shape_2 from "../../../../public/assets/img/counter/counter-shape-1.png";
import counter_shape_3 from "../../../../public/assets/img/counter/counter-shape-4.png";

import { client } from "@/src/sanity/lib/client";
import { useRouter } from "next/router";
import { statsFetch } from "@/src/sanity/lib/queries";

const counter_content = {
  counter_info: [
    { id: 1, counter: 350, counter_icon: <>+</>, title: "Team Members" },
    {
      id: 2,
      counter: 10,
      counter_icon: (
        <>
          <em>m</em>+
        </>
      ),
      title: "Total funding",
    },
    {
      id: 3,
      counter: 500,
      counter_icon: (
        <>
          <em>k</em>+
        </>
      ),
      title: "Total active user base",
    },
  ],
};
const { counter_info } = counter_content;

const CounterArea = () => {
  const [counterData, setcounterData] = useState(null);

  const { locale } = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const query = statsFetch;
      const data = await client.fetch(query);
      setcounterData(data);
    };

    fetchData();
  }, []);

  return (
    <>
      <div className="tp-counter-area tp-counter-space p-relative pb-140">
        <div className="tp-counter-shape-2">
          <Image src={counter_shape_1} alt="theme-pure" />
        </div>
        <div className="tp-counter-shape-3">
          <Image src={counter_shape_2} alt="theme-pure" />
        </div>
        <div className="tp-counter-shape-4 d-none d-sm-block">
          <Image src={counter_shape_3} alt="theme-pure" />
        </div>
        <div className="container">
          <div className="tp-counter-wrapper p-relative">
            <div className="row gx-0">
              {counterData?.stats.map((item, i) => (
                <div key={i} className="col-xl-4 col-lg-4 col-md-4">
                  <div className="tp-counter-wrap d-flex justify-content-center">
                    <div className="tp-counter-item">
                      <h4>
                        <span className="purecounter">
                          <Count number={item.value} text="+" />
                        </span>
                      </h4>
                      <p>{locale === "en" ? item.label.en : item.label.ar}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CounterArea;
