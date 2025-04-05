import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

import avata_1 from "../../../public/assets/img/blog/blog-list-avata-1.jpg";
import avata_2 from "../../../public/assets/img/blog/blog-list-avata-2.jpg";
import avata_3 from "../../../public/assets/img/blog/blog-list-avata-3.jpg";
import { blogFetch } from "@/src/sanity/lib/queries";
import { client } from "@/src/sanity/lib/client";
import { useRouter } from "next/router";
import { urlFor } from "@/src/sanity/lib/image";

const recent_post_data = [
  {
    id: 1,
    img: avata_1,
    title: <>Is slower team communication a bad thing?</>,
    date: "4 March. 2022",
    cls: "mb-20",
  },
  {
    id: 1,
    img: avata_2,
    title: <>Is slower team communication a bad thing?</>,
    date: "4 March. 2022",
    cls: "mb-20",
  },
  {
    id: 1,
    img: avata_3,
    title: <>The Ultimate Marketing Design Handbook</>,
    date: "4 March. 2022",
    cls: "",
  },
];
const RecentPost = () => {
  const { locale } = useRouter();

  const [blogData, setBlogData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const query = blogFetch;
      const data = await client.fetch(query);
      setBlogData(data);
    };

    fetchData();
  }, []);

  return (
    <>
      <div className="sidebar__widget mb-40">
        <div className="sidebar__widge-title-box">
          <h3 className="sidebar__widget-title">Recent Post</h3>
        </div>
        <div className="sidebar__widget-content">
          <div className="sidebar__post rc__post">
            {blogData?.posts.slice(0, 3).map((item, i) => (
              <div key={i} className="rc__post mb-20 d-flex">
                <div className="rc__post-thumb mr-20">
                  <Link href={`/${locale}/blog/${item?.slug.current}`}>
                    <img
                      src={
                        item?.img?.asset?._ref ? urlFor(item?.img).url() : ""
                      }
                      alt={item?.title?.[locale]}
                    />
                  </Link>
                </div>
                <div className="rc__post-content">
                  <h3 className="rc__post-title">
                    <Link href={`/${locale}/blog/${item?.slug.current}`}>
                      {item.title?.[locale]}
                    </Link>
                  </h3>
                  <div className="rc__meta">
                    <span>{item.date}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default RecentPost;
