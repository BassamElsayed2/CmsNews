import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Slider from "react-slick";
import { useRouter } from 'next/router';
import { newsFetch } from '../sanity/lib/queries';
import { client } from '../sanity/lib/client';
import { urlFor } from '../sanity/lib/image';


function CategoryNews({category , title}) {

    const [newsData, setNewsData] = useState(null);

  const { locale } = useRouter();
    
  useEffect(() => {
    const fetchData = async () => {
        const query = `
        *[_type == "news"]{
          otherCards[category->slug.current == "${category}"]
        }[0].otherCards
      `;      
      const data = await client.fetch(query);
      setNewsData(data);
    };

    fetchData();
  }, []);

  
  return (
    <section className="investigations-section catergory">
    <div className="section-header">
    <h2>{title}</h2>
      <Link href="/news" className="see-all">{locale === "en" ? "All news" : "جميع الاخبار"}</Link>
    </div>

    <div className="content-wrapper">
      <div className="cards-column">
        

        {/* Smaller cards */}
        <div className="card-grid">
          {newsData?.slice(0,9).map((item) => (
            <Link href={`${locale}/news/${item?.slug?.current}`} className="small-card" key={item?.slug?.current}>
              <img
                    src={
                      item.image?.asset?._ref
                        ? urlFor(item.image).url()
                        : ""
                    }
                    alt="theme-pure"
              />
                <h4>{item.title?.[locale]}</h4>
              
            </Link>
          ))}
        </div>
      </div>

      
    </div>
  </section>
  )
}

export default CategoryNews