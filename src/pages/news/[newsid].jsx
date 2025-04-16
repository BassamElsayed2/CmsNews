import BreadcrumbTwo from "@/src/common/breadcrumbs/breadcrumb-2";
import BreadcrumbEight from "@/src/common/breadcrumbs/breadcrumb-8";
import LoadingPage from "@/src/common/LoadingPage";
import SEO from "@/src/common/seo";
import TestimonialArea from "@/src/common/testimonial-area";
import ProjectDetailsArea from "@/src/components/project-details/project-details-area";
import ThumbArea from "@/src/components/project-details/thumb-area";
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
  const { newsid } = router.query;

  const [newsDetails, setNewsDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!newsid) return;

    const fetchData = async () => {
      setLoading(true);
      try {
        const query = `
{
  "fromNews": *[_type == "news"][0] {
    "mainMatch": mainCard.slug.current == $newsid,
    mainCard,
    "matchedOtherCard": otherCards[slug.current == $newsid][0],
    "matchedSliderCard": sliderCards[slug.current == $newsid][0]
  },
  "fromSliderHero": *[_type == "sliderHero"][0] {
    "matchedMainCard": mainCards[slug.current == $newsid][0],
    "matchedSideCard": sideCards[slug.current == $newsid][0]
  },
  "fromImportantNews": *[_type == "importantNews"][0].news[slug.current == $newsid]

}
`;
        const data = await client.fetch(query, { newsid });

        let selectedCard = null;

        if (data.fromNews?.mainMatch) {
          selectedCard = data.fromNews.mainCard;
        } else if (data.fromNews?.matchedOtherCard) {
          selectedCard = data.fromNews.matchedOtherCard;
        } else if (data.fromNews?.matchedSliderCard) {
          selectedCard = data.fromNews.matchedSliderCard;
        } else if (data.fromSliderHero?.matchedMainCard) {
          selectedCard = data.fromSliderHero.matchedMainCard;
        } else if (data.fromSliderHero?.matchedSideCard) {
          selectedCard = data.fromSliderHero.matchedSideCard;
        } else if (data.fromImportantNews?.length > 0) {
          selectedCard = data.fromImportantNews[0];
        }

        if (!selectedCard) {
          router.push("/404");
          return;
        }

        setNewsDetails(selectedCard);
      } catch (error) {
        console.error("Error:", error);
        router.push("/404");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [newsid]);

  if (loading) return <LoadingPage />;
  // if (
  //   !newsDetails ||
  //   !newsDetails.featureCards ||
  //   newsDetails.featureCards.length === 0
  // ) {
  //   router.replace("/404");
  //   return;
  // }

  return (
    <>
      <SEO />
      <HeaderSix />
      <div id="smooth-wrapper">
        <div id="smooth-content">
          <main>
            <BreadcrumbEight title={newsDetails?.title?.[locale]} />
            <ThumbArea img={newsDetails?.image} />
            <ProjectDetailsArea desc={newsDetails?.description?.[locale]} />
            {/* <ProjectArea /> */}
            {/* <TestimonialArea /> */}
          </main>
          <FooterFive style_contact={true} style_team={true} bg_style={false} />
        </div>
      </div>
    </>
  );
};

export default ServiceDetails;
