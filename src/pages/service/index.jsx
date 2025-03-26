import Breadcrumb from "@/src/common/breadcrumbs/breadcrumb";
import CardArea from "@/src/common/card-area";
import HeroBanner from "@/src/common/hero-banner";
import FooterFive from "@/src/layout/footers/footer-5";
import HeaderSix from "@/src/layout/headers/header-6";
import ServiceArea from "./service-area";
import SalesArea from "@/src/common/sales-area";
import TestimonialArea from "@/src/common/testimonial-area";
import FaqArea from "@/src/components/homes/home-2/faq-area";
import CtaArea from "@/src/components/contact/cta-area";
import Wrapper from "@/src/layout/wrapper";
import SEO from "@/src/common/seo";
import { useRouter } from "next/router";

const Service = () => {
  const { locale } = useRouter();
  return (
    <Wrapper>
      <SEO pageTitle={"Softec - Data analytics"} />
      <HeaderSix />
      <div id="smooth-wrapper">
        <div id="smooth-content">
          <main>
            <Breadcrumb
              title_top={locale === "en" ? "Our Top" : "أفضل ما لدينا"}
              title_bottom={locale === "en" ? "Service" : "من خدمة"}
            />
            <HeroBanner
              title={locale === "en" ? "Our Top" : "أفضل ما لدينا"}
              subtitle={locale === "en" ? "Service" : "من خدمة"}
              bg_img="/assets/img/breadcrumb/breadcrumb-2.jpg"
            />
            <ServiceArea />
            <CardArea style_service={true} />
            <SalesArea style_service={true} />
            {/* <TestimonialArea /> */}
            {/* <FaqArea style_service={true} /> */}
            <CtaArea />
          </main>
          <FooterFive style_contact={true} style_team={true} />
        </div>
      </div>
    </Wrapper>
  );
};

export default Service;
