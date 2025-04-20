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
import { urlFor } from "@/src/sanity/lib/image";
import { useLocale } from "next-intl";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

function GalleryDetails() {
  const router = useRouter();
  const locale = useLocale();
  const { id } = router.query;

  const [galleryDetails, setGalleryDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      setLoading(true);
      try {
        const query = `*[_type == "gallery"][0] {
  "image": images[slug.current == $id][0]
}`;
        const data = await client.fetch(query, { id });

        setGalleryDetails(data);
      } catch (error) {
        console.error("Error fetching gallery details:", error);
      }
      setLoading(false);
    };

    fetchData();
  }, [id]);

  if (loading) return <LoadingPage />;

  if (
    !galleryDetails ||
    !galleryDetails.image ||
    galleryDetails.image.length === 0
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
            <BreadcrumbEight
              title={galleryDetails?.image?.text?.[locale]}
              sub_title={galleryDetails?.image?.subTitle?.[locale]}
            />
            <ThumbArea img={galleryDetails?.image?.image} />
            <div className="galleryWrapper">
              <div className="newsImages">
                {galleryDetails?.image.otherImages?.map((img, i) => {
                  return (
                    <img
                      src={img?.asset?._ref ? urlFor(img).url() : ""}
                      alt="theme-pure"
                      key={i}
                    />
                  );
                })}
              </div>
              <div>
                <ProjectDetailsArea
                  desc={galleryDetails?.image?.description?.[locale]}
                />
              </div>
            </div>
            {/* <ProjectArea /> */}
            <TestimonialArea />
          </main>
          <FooterFive style_contact={true} style_team={true} bg_style={false} />
        </div>
      </div>
    </>
  );
}

export default GalleryDetails;
