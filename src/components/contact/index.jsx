import FooterFive from "@/src/layout/footers/footer-5";
import HeaderSix from "@/src/layout/headers/header-6";
import React, { useEffect, useState } from "react";
import Breadcrumb from "../../common/breadcrumbs/breadcrumb";
import ContactFormArea from "./contact-form-area";
import ContactInner from "./contact-inner";
import CtaArea from "./cta-area";
import HeroBanner from "../../common/hero-banner";
import OfficeLocation from "./office-location";
import { useLocale } from "next-intl";
import { contactFetch, heroFetch } from "@/src/sanity/lib/queries";
import { client } from "@/src/sanity/lib/client";
import { useRouter } from "next/router";

const Contact = () => {
  const { locale } = useRouter();

  const [contactData, setContactData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const query = contactFetch;
      const data = await client.fetch(query);
      setContactData(data);
    };

    fetchData();
  }, []);

  return (
    <>
      <HeaderSix />
      <div id="smooth-wrapper">
        <div id="smooth-content">
          <main>
            <Breadcrumb
              title_top={locale === "en" ? "Get In" : "تواصل"}
              title_bottom={locale === "en" ? "Get In" : "تواصل"}
            />
            <HeroBanner
              bg_img="/assets/img/contact/contact-banner.jpg"
              title={locale === "en" ? "Get In" : "تواصل"}
              subtitle={locale === "en" ? "Touch" : "معنا"}
            />
            <OfficeLocation contactData={contactData?.offices} />
            <ContactFormArea />
            <ContactInner contactData={contactData?.contact_data} />
            <CtaArea />
          </main>
          <FooterFive style_contact={true} style_team={true} />
        </div>
      </div>
    </>
  );
};

export default Contact;
