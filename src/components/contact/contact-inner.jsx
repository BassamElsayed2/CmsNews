import Image from "next/image";
import Link from "next/link";
import React from "react";

import icon_1 from "../../../public/assets/img/contact/contact-icon-sm-1.png";
import icon_2 from "../../../public/assets/img/contact/contact-icon-sm-2.png";
import icon_3 from "../../../public/assets/img/contact/contact-icon-sm-3.png";
import { useRouter } from "next/router";
import { urlFor } from "@/src/sanity/lib/image";

// const inner_content = {
//   title: "Book a Demo!",
//   description: <>We will contact again after receive your request in 24h</>,

//   contact_data: [
//     {
//       id: 1,
//       icon: icon_1,
//       title: "contact@softuch.com",
//       link: "mailto:contact@softuch.com",
//     },
//     {
//       id: 2,
//       icon: icon_2,
//       title: "+1-202-555-0144",
//       link: "tel:+1-202-555-0144",
//     },
//     {
//       id: 3,
//       icon: icon_3,
//       title: "35Park Avenue, Uk",
//       link: "https://www.google.com.bd/maps/@23.7806365,90.4193257,12z",
//     },
//   ],
// };
// const { title, description, contact_data } = inner_content;

const ContactInner = ({ contactData }) => {
  const { locale } = useRouter();

  return (
    <>
      <div className="contact-inner-area pb-130">
        <div className="container">
          <div className="row">
            <div className="col-xl-12">
              <div className="contact-inner-title-sm-wrap text-center mb-50">
                <p>
                  {locale === "en"
                    ? "We will contact again after receive your request in 24h"
                    : "سوف نتواصل معك مرة أخرى بعد تلقي طلبك خلال 24 ساعة"}
                </p>
              </div>
            </div>
          </div>
          <div className="contact-inner-wrapper">
            <div className="row gx-0">
              {contactData?.map((item, i) => (
                <div key={i} className="col-xl-4 col-lg-4">
                  <div className="contact-inner-item d-flex align-items-center justify-content-center">
                    <div className="contact-inner-img contact-img-1">
                      <img
                        src={
                          item?.icon?.asset?._ref
                            ? urlFor(item?.icon).url()
                            : ""
                        }
                        alt={item.title?.[locale]}
                      />
                    </div>
                    <div className="contact-inner-link">
                      <Link href={`${item.link}`}>{item.title?.[locale]}</Link>
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

export default ContactInner;
