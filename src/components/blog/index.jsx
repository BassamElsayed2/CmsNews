import BreadcrumbTwo from "@/src/common/breadcrumbs/breadcrumb-2";
import FooterFive from "@/src/layout/footers/footer-5";
import HeaderSix from "@/src/layout/headers/header-6";
import React from "react";
import CtaArea from "../contact/cta-area";
import BlogGrid from "./blog-grid";
import Portfolio from "./portfolio";
import { useRouter } from "next/router";

const Blog = () => {
  const { locale } = useRouter();

  return (
    <>
      <HeaderSix />
      <main>
        <BreadcrumbTwo
          title={locale === "en" ? "Watch our Videos" : " شاهد فديوهاتنا"}
          innertitle={
            locale === "en" ? "videos Grid Classic" : "شبكة الفديوهات المتداولة"
          }
        />
        {/* <BlogGrid /> */}
        <Portfolio />
        <CtaArea />
      </main>
      <FooterFive style_contact={true} style_team={true} />
    </>
  );
};

export default Blog;
