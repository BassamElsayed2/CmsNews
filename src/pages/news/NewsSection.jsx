import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { client } from "@/src/sanity/lib/client";
import { urlFor } from "@/src/sanity/lib/image";

// استعلام لجيب الفئات
const categoriesQuery = `*[_type == "category"]{_id, title}`;

// استعلام رئيسي للأخبار
import { newsFetch } from "@/src/sanity/lib/queries";
import index from "..";

function InvestigationsSection() {
  const router = useRouter();
  const { locale, query } = router;
  const inputRef = useRef(null);

  const [newsData, setNewsData] = useState(null);
  const [categories, setCategories] = useState([]);

  const searchQuery = query.search || "";
  const selectedCategory = query.category || "";
  const [searchInput, setSearchInput] = useState(searchQuery);

  // 🔁 Fetch data
  useEffect(() => {
    const fetchData = async () => {
      const [news, cats] = await Promise.all([
        client.fetch(newsFetch),
        client.fetch(categoriesQuery),
      ]);
      setNewsData(news);
      setCategories(cats);
    };
    fetchData();
  }, []);

  // 🔄 Update URL on search
  const handleSearchKeyDown = (e) => {
    if (e.key === "Enter") {
      router.push(
        {
          pathname: router.pathname,
          query: { ...query, search: searchInput },
        },
        undefined,
        { shallow: true }
      );
      setSearchInput("");
    }
  };

  // 🔄 Update URL on category change
  const handleCategoryChange = (e) => {
    const value = e.target.value;
    router.push(
      {
        pathname: router.pathname,
        query: { ...query, category: value },
      },
      undefined,
      { shallow: true }
    );
  };

  // 🧠 Filter data based on URL
  const filteredCards = newsData?.otherCards?.filter((item) => {
    const title = item.title?.[locale]?.toLowerCase() || "";
    const desc = item.description?.[locale]?.toLowerCase() || "";
    const categoryId = item.category?._ref;
    const matchesSearch =
      title.includes(searchQuery.toLowerCase()) ||
      desc.includes(searchQuery.toLowerCase());

    const matchesCategory =
      !selectedCategory || categoryId === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <section className="investigations-section mb-100">
      {/* Search & Filter */}
      <div
        style={{
          display: "flex",
          gap: "1rem",
          flexWrap: "wrap",
          marginTop: "1rem",
          alignItems: "center",
          position: "relative",
          zIndex: 2,
          justifyContent: "center",
          marginBottom: "50px",
        }}
      >
        {/* Search */}
        <div className="group">
          <svg
            viewBox="0 0 24 24"
            width="18"
            height="18"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ position: "absolute", left: "10px", color: "#9e9ea7" }}
          >
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <input
            type="text"
            placeholder="ابحث عن ..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyDown={handleSearchKeyDown}
            ref={inputRef}
            className="input"
          />
        </div>

        {/* Category Filter */}
        <div className="custom-select-wrapper">
          <select
            value={selectedCategory}
            onChange={handleCategoryChange}
            className="custom-select"
          >
            <option value="">
              {locale === "en" ? "All Categories" : "كل الفئات"}
            </option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.title?.[locale] || cat.title?.en || "Unnamed"}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="section-header">
        <h2>{newsData?.headerTitle?.[locale]}</h2>
      </div>

      <div className="content-wrapper">
        <div className="cards-column">
          {/* Main card */}
          {/* <div className="main-card">
            {newsData?.otherCards.slice(-1).map((item) => (
              <React.Fragment key={item.slug?.current}>
                <Link
                  className="main-content"
                  href={`/${locale}/news/${item.slug?.current}`}
                >
                  <h3>{item.title?.[locale]}</h3>
                  <p>{item.description?.[locale]}</p>
                </Link>
                <img
                  src={item.image?.asset?._ref ? urlFor(item.image).url() : ""}
                  alt="theme-pure"
                />
              </React.Fragment>
            ))}
          </div> */}

          {/* Filtered smaller cards */}
          <div className="card-grid">
            {filteredCards?.map((item) => (
              <Link
                href={`/${locale}/news/${item?.slug?.current}`}
                className="small-card"
                key={item?.slug?.current}
              >
                <img
                  src={item.image?.asset?._ref ? urlFor(item.image).url() : ""}
                  alt="theme-pure"
                />
                <h4>{item.title?.[locale]}</h4>
              </Link>
            ))}
            {filteredCards?.length === 0 && <p>لا توجد نتائج مطابقة.</p>}
          </div>
        </div>
      </div>
    </section>
  );
}

export default InvestigationsSection;
