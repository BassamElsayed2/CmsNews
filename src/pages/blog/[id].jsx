import BreadcrumbSix from "@/src/common/breadcrumbs/breadcrumb-6";
import LoadingPage from "@/src/common/LoadingPage";
import SEO from "@/src/common/seo";
import Banner from "@/src/components/blog-details/banner";
import Portfolio from "@/src/components/blog-details/portfolio";
import PostboxArea from "@/src/components/blog-details/postbox-area";
import BlogArea from "@/src/components/homes/home-3/blog-area";
import FooterFive from "@/src/layout/footers/footer-5";
import HeaderSix from "@/src/layout/headers/header-6";
import Wrapper from "@/src/layout/wrapper";
import { client } from "@/src/sanity/lib/client";
import { useLocale } from "next-intl";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

function BlogDetails() {
  const router = useRouter();
  const locale = useLocale();
  const { id } = router.query;

  const [blogDetails, setBlogDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      setLoading(true);
      try {
        const query = `*[_type == "blog"][0] {
          "article": posts[slug.current == $id][0]
        }`;
        const data = await client.fetch(query, { id });

        if (data?.article) {
          setBlogDetails(data.article);
        } else {
          setBlogDetails(null);
        }
      } catch (error) {
        setBlogDetails(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  useEffect(() => {
    if (!loading && !blogDetails) {
      router.replace("/404");
    }
  }, [loading, blogDetails, router]);

  if (loading) return <LoadingPage />;

  if (!blogDetails) return null;

  return (
    <Wrapper>
      <SEO />
      <HeaderSix />
      <div id="smooth-wrapper">
        <div id="smooth-content">
          <main>
            <BreadcrumbSix blogDetails={blogDetails} />
            <Banner vCode={blogDetails.vdieoCode} />
            <PostboxArea blogDetails={blogDetails} />
            {/* <Portfolio /> */}
            <BlogArea />
          </main>
          <FooterFive style_contact={true} style_team={true} bg_style={false} />
        </div>
      </div>
    </Wrapper>
  );
}

export default BlogDetails;
