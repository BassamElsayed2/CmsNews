import ContactUsForm from "@/src/forms/contact-us-form";
import SendIcon from "@/src/svg/send-icon";
import Link from "next/link";
import React from "react";

import img from "../../../public/assets/img/contact/contact-icon-sm-4.png";
import Image from "next/image";
import { useRouter } from "next/router";

const contact_content_en = {
  sub_title: "CONTACT US",
  tilte: (
    <>
      We'd love to <br /> hear From{" "}
      <span>
        {" "}
        <SendIcon />{" "}
      </span>{" "}
      you.
    </>
  ),
  info: (
    <>
      While we're good with smoke signals, there <br /> are easier ways to get
      in touch.
    </>
  ),
};
const contact_content_ar = {
  sub_title: "تواصل معنا",
  tilte: (
    <>
      نحن نحب أن <br /> نسمع منك
      <span>
        {" "}
        <SendIcon />{" "}
      </span>{" "}
    </>
  ),
  info: <>طرق أسهل للتواصل.</>,
};

const ContactFormArea = () => {
  const { locale } = useRouter();

  const { sub_title, tilte, info } =
    locale === "en" ? contact_content_en : contact_content_ar;

  return (
    <>
      <div className="contact-form-area pb-120">
        <div className="container">
          <div className="row gx-0">
            <div className="col-xl-5 col-lg-6">
              <div className="contact-form-left">
                <div className="contact-form-section-box pb-80">
                  <h5 className="inner-section-subtitle">{sub_title}</h5>
                  <h4 className="tp-section-title pb-10">{tilte}</h4>
                  <p>{info}</p>
                </div>
                <div className="contact-form-social-box p-relative">
                  <div className="contact-form-social-item">
                    <Link href="#">
                      <i className="fab fa-facebook-f"></i>
                    </Link>
                    <Link href="#">
                      <i className="fab fa-twitter"></i>
                    </Link>
                    <Link href="#">
                      <i className="fab fa-linkedin-in"></i>
                    </Link>
                    <Link href="#">
                      <i className="fab fa-instagram"></i>
                    </Link>
                  </div>
                  <div className="contact-form-section-img">
                    <Image src={img} alt="theme-pure" />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-7 col-lg-6">
              <div className="contact-form-right-warp">
                <div className="postbox__comment-form">
                  <ContactUsForm />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactFormArea;
