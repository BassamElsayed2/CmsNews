import BreadcrumbTwo from "@/src/common/breadcrumbs/breadcrumb-2";
import LoadingPage from "@/src/common/LoadingPage";
import SEO from "@/src/common/seo";
import TestimonialArea from "@/src/common/testimonial-area";
import ServiceDetailsArea from "@/src/components/service-details/service-details-area";
import FooterFive from "@/src/layout/footers/footer-5";
import HeaderSix from "@/src/layout/headers/header-6";
import { client } from "@/src/sanity/lib/client";
import { useLocale } from "next-intl";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const ServiceDetails = () => {
  const router = useRouter();
  const locale = useLocale();
  const { serviceid } = router.query;

  const [serviceDetail, setServiceDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!serviceid) return;

    const fetchData = async () => {
      setLoading(true);
      try {
        const query = `*[_type == "service"] {
      featureCards[slug.current == $serviceid]}[0]`;
        const data = await client.fetch(query, { serviceid });
        setServiceDetails(data);
      } catch (error) {
        console.error("Error:", error);
        router.push("/404");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [serviceid]);

  if (loading) return <LoadingPage />;
  if (
    !serviceDetail ||
    !serviceDetail.featureCards ||
    serviceDetail.featureCards.length === 0
  ) {
    router.replace("/404");
    return;
  }

  return (
    <>
      <SEO />
      <HeaderSix />
      <div id="smooth-wrapper">
        <div id="smooth-content">
          <main>
            <BreadcrumbTwo
              title={serviceDetail?.featureCards[0]?.title?.[locale]}
              innertitle={
                locale === "en"
                  ? "Help Desk Service Details"
                  : "تفاصيل خدمة مكتب المساعدة"
              }
            />
            <ServiceDetailsArea
              service={serviceDetail}
              description={serviceDetail?.featureCards[0]?.description}
            />
            {/* <TestimonialArea /> */}
          </main>
          <FooterFive style_contact={true} style_team={true} bg_style={false} />
        </div>
      </div>
    </>
  );
};

export default ServiceDetails;
