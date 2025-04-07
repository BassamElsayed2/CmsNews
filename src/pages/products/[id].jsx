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

        setProductDetails(data);
      } catch (error) {
        console.error("Error fetching gallery details:", error);
      }
      setLoading(false);
    };

    fetchData();
  }, [id]);

  if (loading) return <LoadingPage />;

  // // التأكد من وجود المنتج والصورة
  // if (!productDetails || !productDetails.image) {
  //   router.replace("/404");
  //   return null;
  // }

  console.log(productDetails);

  return (
    <>
      <SEO />
      <HeaderSix />
      <div id="smooth-wrapper">
        <div id="smooth-content">
          <main>
            {productDetails?.slideOne && (
              <BreadcrumbEight
                title={productDetails?.slideOne?.text?.[locale]}
                sub_title={productDetails?.image?.subTitle?.[locale]}
              />
            )}
            {productDetails?.slideTwo && (
              <BreadcrumbEight
                title={productDetails?.slideTwo?.text?.[locale]}
              />
            )}
            {productDetails?.slideOne && (
              <ThumbArea img={productDetails?.slideOne?.mainImage} />
            )}
            {productDetails?.slideTwo && (
              <ThumbArea img={productDetails?.slideTwo?.mainImage} />
            )}
            {productDetails?.slideOne && (
              <ProjectDetailsArea
                desc={productDetails?.slideOne?.description?.[locale]}
              />
            )}
            {productDetails?.slideTwo && (
              <ProjectDetailsArea
                desc={productDetails?.slideTwo?.description?.[locale]}
              />
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
