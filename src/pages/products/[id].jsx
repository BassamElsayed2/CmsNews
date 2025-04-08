import BreadcrumbEight from "@/src/common/breadcrumbs/breadcrumb-8";
import LoadingPage from "@/src/common/LoadingPage";
import SEO from "@/src/common/seo";
import TestimonialArea from "@/src/components/homes/home-3/rated-area";
import ProjectArea from "@/src/components/homes/home/project-area";
import ProjectDetailsArea from "@/src/components/project-details/project-details-area";
import ThumbArea from "@/src/components/project-details/thumb-area";
import FooterFive from "@/src/layout/footers/footer-5";
import HeaderSix from "@/src/layout/headers/header-6";
import { client } from "@/src/sanity/lib/client";
import { useLocale } from "next-intl";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

function ProductDetails() {
  const router = useRouter();
  const locale = useLocale();
  const { id } = router.query;

  const [productDetails, setProductDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      setLoading(true);
      try {
        const query = `*[_type == "product"][0] {
  slideOne[slug.current == $id][0],
  slideTwo[slug.current == $id][0]
}`;
        const data = await client.fetch(query, { id });

        if (!data?.slideOne && !data?.slideTwo) {
          router.replace("/404");
          return;
        }

        setProductDetails(data);
      } catch (error) {
        console.error("Error fetching gallery details:", error);
        router.replace("/404");
      }
      setLoading(false);
    };

    fetchData();
  }, [id]);

  if (loading) return <LoadingPage />;

  return (
    <>
      <SEO />
      <HeaderSix />
      <div id="smooth-wrapper">
        <div id="smooth-content">
          <main>
            {[productDetails?.slideOne, productDetails?.slideTwo].map(
              (slide, index) =>
                slide && (
                  <React.Fragment key={index}>
                    <BreadcrumbEight
                      title={slide?.text?.[locale]}
                      sub_title={
                        index === 0
                          ? productDetails?.image?.subTitle?.[locale]
                          : undefined
                      }
                    />
                    <ThumbArea img={slide?.mainImage} />

                    <div className="pd-details-area pt-100 pb-100">
                      <div className="container">
                        <div className="row g-0">
                          <div className="col-xl-10 col-lg-10 ">
                            <div className="pd-details-wrapper">
                              <h4 className="pd-details-title">
                                {locale === "ar" ? "تفاصيل" : "Overview"}
                              </h4>

                              {slide.otherDescriptions.map((desc, i) =>
                                desc?.[locale] ? (
                                  <p key={i}>{desc[locale]}</p>
                                ) : null
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </React.Fragment>
                )
            )}
            <TestimonialArea />
          </main>
          <FooterFive style_contact={true} style_team={true} bg_style={false} />
        </div>
      </div>
    </>
  );
}

export default ProductDetails;
