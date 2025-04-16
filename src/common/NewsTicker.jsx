import { useEffect, useState } from "react";

const { default: Link } = require("next/link");

function NewsTicker({ newsItems, locale }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev === newsItems.length - 1 ? 0 : prev + 1));
    }, 3000);

    return () => clearInterval(interval);
  }, [newsItems]);

  const currentNews = newsItems[currentIndex];

  return (
    <div className="newsTicker">
      <div className="news-ticker">
        <span className="label">
          {locale === "en" ? "Important :" : "عاجل :"}
        </span>
        <div className="news-content">
          {currentNews && (
            <Link href={`/${locale}/news/${currentNews.slug}`}>
              <span>{currentNews.title}</span>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default NewsTicker;
