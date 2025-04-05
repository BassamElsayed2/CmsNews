import Link from "next/link";
import React from "react";
import Image from "next/image";
import MobileMenus from "../layout/headers/mobile-menus";

// images import
import logo from "../../public/assets/img/logo/logo-white.png";
import canvus_img_1 from "../../public/assets/img/project/project-inner-4.jpg";
import canvus_img_2 from "../../public/assets/img/project/project-inner-5.jpg";
import canvus_img_3 from "../../public/assets/img/project/project-inner-6.jpg";
import canvus_img_4 from "../../public/assets/img/project/project-inner-7.jpg";
import { urlFor } from "../sanity/lib/image";

const Offcanvus = ({ sidebarOpen, setSidebarOpen, menuData }) => {
  return (
    <>
      <div className="tpoffcanvas-area">
        <div className={`tpoffcanvas ${sidebarOpen && "opened"}`}>
          <div className="tpoffcanvas__close-btn">
            <button className="close-btn" onClick={() => setSidebarOpen(false)}>
              <i className="fal fa-times"></i>
            </button>
          </div>
          <div className="tpoffcanvas__logo text-center">
            <Link href="/" onClick={() => setSidebarOpen(false)}>
              <img
                src={
                  menuData?.whitelogo?.asset?._ref
                    ? urlFor(menuData?.whitelogo).url()
                    : ""
                }
                alt="theme-pure"
              />
            </Link>
          </div>
          <div className="mobile-menu mean-container">
            <MobileMenus menuData={menuData?.links} />
          </div>

          <div className="tpoffcanvas__social">
            <div className="social-icon text-center">
              <Link href="#">
                <i className="fab fa-twitter"></i>
              </Link>
              <Link href="#">
                <i className="fab fa-instagram"></i>
              </Link>
              <Link href="#">
                <i className="fab fa-facebook-square"></i>
              </Link>
              <Link href="#">
                <i className="fab fa-dribbble"></i>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div
        className={`body-overlay ${sidebarOpen && "apply"}`}
        onClick={() => setSidebarOpen(false)}
      ></div>
    </>
  );
};

export default Offcanvus;
