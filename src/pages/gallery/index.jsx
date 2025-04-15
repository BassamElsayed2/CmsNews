import BreadcrumbSeven from "@/src/common/breadcrumbs/breadcrumb-7";
import FooterFive from "@/src/layout/footers/footer-5";
import HeaderSix from "@/src/layout/headers/header-6";
import React from "react";
import CtaArea from "../../components/contact/cta-area";
import Portfolio from "./portfolio";
import SEO from "@/src/common/seo";
import Wrapper from "@/src/layout/wrapper";

const Gallery = () => {
  return (
    <Wrapper>
      <SEO pageTitle={"Softec - Data analytics"} />
      <HeaderSix style_2={true} />
      <main>
        <BreadcrumbSeven />
        <Portfolio />
        {/* <CtaArea /> */}
      </main>
      <FooterFive style_contact={true} style_team={true} />
    </Wrapper>
  );
};

export default Gallery;
