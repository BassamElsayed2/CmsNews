import AboutArea from "@/src/common/about-area";
import FooterFive from "@/src/layout/footers/footer-5";
import HeaderSix from "@/src/layout/headers/header-6";
import React, { useEffect, useState } from "react";
import Breadcrumb from "../../common/breadcrumbs/breadcrumb";
import HeroBanner from "../../common/hero-banner";
import CtaArea from "../contact/cta-area";
import TeamArea from "../homes/home-4/team-area";
import Brand from "./brand";
import CompanyArea from "./company-area";
import JobArea from "./job-area";
import JourneyArea from "./journey-area";
import { useRouter } from "next/router";
import { aboutFetch, seoFetch } from "@/src/sanity/lib/queries";
import { client } from "@/src/sanity/lib/client";
import CardArea from "@/src/common/card-area";

const About = () => {
  const { locale } = useRouter();

  const [seoData, setSeoData] = useState(null);
  const [aboutData, setAboutData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const query = seoFetch;
      const data = await client.fetch(query);
      setSeoData(data);
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const query = aboutFetch;
      const data = await client.fetch(query);
      setAboutData(data);
    };

    fetchData();
  }, []);

  return (
    <>
      <HeaderSix />
      <Breadcrumb
        title_top={locale === "en" ? "About" : "عن"}
        title_bottom={seoData?.pageTitle?.[locale]}
      />
      <HeroBanner
        title={locale === "en" ? "About" : "عن"}
        subtitle={seoData?.pageTitle?.[locale]}
        bg_img="/assets/img/breadcrumb/breadcrumb-2.jpg"
      />
      <Brand
        title={aboutData?.brandTitle}
        imgs={aboutData?.brandimages}
        text={aboutData?.brandparagraph}
      />
      <CompanyArea title={aboutData?.aboutTitle} text={aboutData?.aboutinfo} />
      {/* <AboutArea /> */}
      {/* <TeamArea bg_style={true} /> */}
      {/* <JourneyArea /> */}
      {/* <CardArea /> */}
      {/* <JobArea /> */}
      {/* <CtaArea /> */}
      <FooterFive style_contact={true} style_team={true} />
    </>
  );
};

export default About;
