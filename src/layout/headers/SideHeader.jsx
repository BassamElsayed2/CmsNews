import useSticky from '@/src/hooks/use-sticky';
import { urlFor } from '@/src/sanity/lib/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { FaCalendarAlt, FaRegClock } from "react-icons/fa";

function SideHeader({ logo }) {
  const { locale } = useRouter();
  const [time, setTime] = useState(null);

  useEffect(() => {
    setTime(new Date());
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  if (!time) {
    return <div className={'header'}><div className={'datetime'}></div></div>;
  }

  // نحدد لغة التنسيق حسب locale
  const localeFormat = locale === 'ar' ? 'ar-EG' : 'en-US';

  const formattedDate = time.toLocaleDateString(localeFormat, {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const formattedTime = time.toLocaleTimeString(localeFormat, {
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div className={'header'}>
      <div className='fixed'>
        <div className='container-navigation'>
          <div className='logoSlider'>
            <Link href="/">
              <img
                src={
                  logo?.asset?._ref
                    ? urlFor(logo).url()
                    : ""
                }
                alt="Logo"
              />
            </Link>
          </div>
          <div className='date-header'>
            <span className='date-icon'><FaCalendarAlt /></span>
            <span>{formattedDate}</span>
            <span className='date-icon'><FaRegClock /></span>
            <span>{formattedTime}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SideHeader;
