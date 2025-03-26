import useSticky from "@/src/hooks/use-sticky";
import Offcanvus from "@/src/common/offcanvus";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import NavMenu from "./nav-menu";

import white_logo from "../../../public/assets/img/logo/logo-white.png";
import black_logo from "../../../public/assets/img/logo/logo-black.png";
import { useRouter } from "next/router";
import { client } from "@/src/sanity/lib/client";
import { navMenuFetch } from "@/src/sanity/lib/queries";
import { urlFor } from "@/src/sanity/lib/image";

const hero_content = {
  login_btn: "Login",
  sign_up_btn: "Sign Up",
};
const { login_btn, sign_up_btn } = hero_content;

const HeaderTwo = () => {
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
      <header className="tp-header-height">
        <div
          id="header-sticky"
          className={`"tp-header-2__area header-sticky-bg-2 tp-header-2__transparent tp-header-2__plr z-index-3 ${sticky && "header-sticky"}`}
        >
          <div className="container-fluid g-0">
            <div className="row g-0 align-items-center">
              <div className="col-xl-2 col-lg-2 col-md-6 col-6">
                <div className="tp-header-2__logo">
                  <Link className="white-logo" href="/">
                    <img
                      src={
                        navData?.whitelogo
                          ? urlFor(navData?.whitelogo).url()
                          : ""
                      }
                      alt="Logo"
                    />
                  </Link>
                  <Link className="black-logo" href="/">
                    <img
                      src={
                        navData?.blacklogo
                          ? urlFor(navData?.blacklogo).url()
                          : ""
                      }
                      alt="Logo"
                    />
                  </Link>
                </div>
              </div>
              <div className="col-xl-7 col-lg-7 d-none d-lg-block">
                <div className="tp-header-2__main-menu text-center">
                  <nav id="mobile-menu">
                    <NavMenu links={navData?.links} />
                  </nav>
                </div>
              </div>
              {/* <div className="col-xl-3 col-lg-3 col-md-6 col-6">
                <div className="tp-header-2__right d-flex align-items-center justify-content-end">
                  <Link
                    className="tp-header-2__login d-none d-md-block"
                    href="/register"
                  >
                    {login_btn}
                  </Link>
                  <Link
                    className="tp-btn-green-sm d-none d-md-block"
                    href="/sign-in"
                  >
                    {sign_up_btn}
                  </Link>
                  <a
                    className="header-bottom__bar tp-menu-bar d-lg-none"
                    onClick={() => setSidebarOpen(true)}
                  >
                    <i className="fal fa-bars"></i>
                  </a>
                </div>
              </div> */}
              <button
                onClick={toggleLanguage}
                className="tp-btn-blue-sm d-none d-md-inline-block tp-btn-hover alt-color-black"
              >
                {locale === "en" ? "العربية" : "English"}
              </button>
            </div>
          </div>
        </div>
      </header>
      <Offcanvus sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
    </>
  );
};

export default HeaderTwo;
