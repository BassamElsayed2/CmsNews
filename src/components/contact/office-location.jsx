import React from "react";

import img_1 from "../../../public/assets/img/contact/contact-icon-sm-5.png";
import img_2 from "../../../public/assets/img/contact/contact-icon-sm-6.png";
import img_3 from "../../../public/assets/img/contact/contact-icon-sm-7.png";
import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/src/sanity/lib/image";
import { useRouter } from "next/router";

// office location data
const office_data = [
  {
    id: 1,
    cls: "",
    img: img_1,
    location: "Colombia",
    address: (
      <>
        Bogota D.C., Colombia, b. a 181 <br /> C No. 930 Ap 202
      </>
    ),
  },
  {
    id: 2,
    cls: "p-relative",
    img: img_2,
    badge: "Main Office",
    location: "France",
    address: (
      <>
        9 Pearse Street, Kinsale,Cork, <br /> P17 AH66, Ireland
      </>
    ),
  },
  {
    id: 3,
    cls: "",
    img: img_3,
    location: "Egypt",
    address: (
      <>
        Av. Cordoba 1309, 3'A, City of <br /> Buenos Aires, Egypt
      </>
    ),
  },
];

const OfficeLocation = ({ contactData }) => {
  const { locale } = useRouter();
  return (
    <>
      <div className="contact-info-area pb-90">
        <div className="container">
          <div className="row">
            {contactData?.map((item, i) => (
              <div key={i} className="col-xl-4 col-lg-4 mb-30">
                <div className={`contact-info-item `}>
                  {/* {item.badge && (
                    <div className="contact-info-badge">
                      <span>Main Office</span>
                    </div>
                  )} */}
                  <div className="contact-info-img">
                    <img
                      src={
                        item?.img?.asset?._ref ? urlFor(item?.img).url() : ""
                      }
                      alt={item.location?.[locale]}
                    />
                  </div>
                  <div className="contact-info-title-box">
                    <h5 className="contact-info-title-sm">
                      <p>{item.location?.[locale]}</p>
                    </h5>
                    <p>{item.address?.[locale]}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default OfficeLocation;
