import SEO from "@/src/common/seo";
import Blog from "@/src/components/blog";
import Wrapper from "@/src/layout/wrapper";

const index = () => {
  return (
    <Wrapper>
      <SEO />
      <Blog />
    </Wrapper>
  );
};

export default index;
