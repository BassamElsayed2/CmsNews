import useSticky from "@/src/hooks/use-sticky";
import Offcanvus from "@/src/common/offcanvus";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import NavMenu from "./nav-menu";
import Image from "next/image";

import logo from "../../../public/assets/img/logo/logo-black.png";
import { useRouter } from "next/router";
import { navMenuFetch } from "@/src/sanity/lib/queries";
import { client } from "@/src/sanity/lib/client";
import { urlFor } from "@/src/sanity/lib/image";
import SideHeader from "./SideHeader";
import HeaderFour from "./header-4";
import Search from "@/src/components/blog-list/search";
import SearchHeader from "./SearchHeader";

const HeaderThree = () => {
  const { sticky } = useSticky();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [navData, setNavData] = useState(null);

  const router = useRouter();
  const { locale, pathname, query } = router;

  const toggleLanguage = () => {
    const newLocale = locale === "en" ? "ar" : "en";
    router.push({ pathname, query }, undefined, { locale: newLocale });
  };

  useEffect(() => {
    const fetchData = async () => {
      const query = navMenuFetch;
      const data = await client.fetch(query);
      setNavData(data);
    };

    fetchData();
  }, []);

  return (
    <>
      <SideHeader logo={navData?.blacklogo} />
      <header className="tp-header-height">
        <div
          id="header-sticky"
          className={`"header-bottom__area header__space header-sticky-bg-2 header-bottom__transparent z-index-5 ${sticky && "header-sticky"}`}
        >
          <div className="container">
            <div className="row align-items-center">
              <div className="col-xxl-10 col-xl-10 col-lg-10 d-none d-lg-block">
                <div className="header-bottom__main-menu header-bottom__main-menu-3">
                  <nav id="mobile-menu">
                    <NavMenu links={navData?.links} />
                  </nav>
                </div>
              </div>
              <div className="col-xxl-2 col-xl-2 col-lg-2 col-md-8 col-6">
                <div className="header-bottom__right d-flex align-items-center justify-content-end">
                  <div className="header-bottom__btn d-flex align-items-center">
                    <a
                      className="header-bottom__bar tp-menu-bar d-lg-none mr-20"
                      onClick={() => setSidebarOpen(true)}
                    >
                      <i className="fal fa-bars"></i>
                    </a>
                  </div>
                  <button
                    onClick={toggleLanguage}
                    className="tp-btn-blue-sm d-none d-md-inline-block tp-btn-hover alt-color-black"
                  >
                    {locale === "en" ? "العربية" : "English"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <Offcanvus
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        menuData={navData}
      />
      <SearchHeader />
    </>
  );
};

export default HeaderThree;
