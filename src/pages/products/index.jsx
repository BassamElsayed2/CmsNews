import BreadcrumbTwo from "@/src/common/breadcrumbs/breadcrumb-2";
import BreadcrumbFour from "@/src/common/breadcrumbs/breadcrumb-4";
import SEO from "@/src/common/seo";
import IntegrationArea from "@/src/components/homes/home-3/integration-area";
import FeatureArea from "@/src/components/homes/home-5/feature-area";
import FooterFive from "@/src/layout/footers/footer-5";
import HeaderSix from "@/src/layout/headers/header-6";
import Wrapper from "@/src/layout/wrapper";
import { useRouter } from "next/router";
import React from "react";

function index() {
  const { locale } = useRouter();

  return (
    <Wrapper>
      <SEO />
      <HeaderSix />
      <div id="smooth-wrapper">
        <div id="smooth-content">
          <main>
            {/* <BreadcrumbFour /> */}
            <BreadcrumbTwo
              title={locale === "en" ? "Our Products" : "منتاجتنا"}
              innertitle={locale === "en" ? "Products" : "المنتجات"}
            />
            <FeatureArea style_integraton={true} />
            <IntegrationArea style_integraton={true} />
          </main>
          <FooterFive style_contact={true} style_team={true} />
        </div>
      </div>
    </Wrapper>
  );
}

export default index;
