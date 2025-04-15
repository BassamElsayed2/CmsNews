import React, { useEffect, useState } from 'react';


function NewsTicker({ newsItems , locale }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) =>
        prev === newsItems.length - 1 ? 0 : prev + 1
      );
    }, 3000); // كل 3 ثواني

    return () => clearInterval(interval);
  }, [newsItems]);

  return (
    <div className='newsTicker'>
        <div className="news-ticker">
            <span className="label">{locale === "en" ? "Important :" : "عاجل :"}</span>
            <div className="news-content">
                <span>{newsItems[currentIndex]}</span>
            </div>
        </div>
    </div>
  );
}

export default NewsTicker;
