import Link from "next/link";
import React from "react";
import menu_data from "./menu-data";
import { useRouter } from "next/router";

const NavMenu = ({ links }) => {
  const { locale } = useRouter();
  return (
    <>
      <ul>
        {links?.map((menu_item, i) => (
          <li key={i}>
            <Link href={`${locale}${menu_item.url}`}>
              {menu_item.title?.[locale]}
            </Link>
            {/* {menu_item.has_dropdown && (
              <ul className="submenu">
                {menu_item.sub_menus.map((sub_menu, i) => (
                  <li key={i}>
                    <Link href={sub_menu.link}>{sub_menu.title}</Link>
                  </li>
                ))}
              </ul>
            )} */}
          </li>
        ))}
      </ul>
    </>
  );
};

export default NavMenu;
