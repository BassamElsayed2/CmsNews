
import FooterFive from "@/src/layout/footers/footer-5";
import left_shape from "../../../public/assets/img/hero/hero-left-shape-3-1.png";
import gradient_bg from "../../../public/assets/img/hero/hero-gradient-3.jpg";
import Image from 'next/image';

import Wrapper from "@/src/layout/wrapper";
import SEO from "@/src/common/seo";
import { useRouter } from "next/router";
import InvestigationsSection from "./NewsSection";
import HeaderThree from "@/src/layout/headers/header-3";


const News = () => {
  const { locale } = useRouter();
  return (
    <Wrapper>
      <SEO pageTitle={"Softec - Data analytics"} />
      <HeaderThree />
      <div id="smooth-wrapper" className=" tp-hero-area tp-hero-pt pt-170  p-relative ">
      <div className="tp-hero-left-shape">
            <Image src={left_shape} alt="them-pure" />
        </div>
        <div className="tp-hero-gradient-bg">
            <Image src={gradient_bg} alt="them-pure" />
        </div>
        <div id="smooth-content" className="container mt-100">
          <main>
            
            <InvestigationsSection />
           
          </main>
        </div>
          <FooterFive style_contact={true} style_team={true} />
      </div>
    </Wrapper>
  );
};

export default News;
