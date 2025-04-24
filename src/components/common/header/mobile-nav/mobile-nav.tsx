"use client";

import { MenuOutlined } from "@ant-design/icons";
import { Button, Drawer } from "antd";
import { Book, Home, User } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function MobileNav() {
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const navItems = [
    { text: "درباره ما", url: "/about-us", icon: <User /> },
    { text: "مقالات", url: "/blogs", icon: <Book /> },
    { text: "خانه", url: "/", icon: <Home /> },
  ];

  return (
    <div className="hidden max-[600px]:block">
      <Button
        type="text"
        icon={<MenuOutlined style={{ fontSize: "32px" }} />}
        onClick={showDrawer}
        className="flex items-center justify-center w-[112px] h-[112px]"
      />
      <Drawer
        title="منو"
        placement="right"
        onClose={onClose}
        open={open}
        width={250}
        className="max-[600px]:block hidden"
        style={{ direction: "rtl" }}
        styles={{ body: { paddingRight: "20px", paddingTop: 0 } }}
      >
        <div className="flex flex-col">
          {navItems.map((item, index) => {
            return (
              <div key={index} className="flex items-center justify-start gap-3">
                {item.icon}{" "}
                <Link
                  href={item.url}
                  className="py-4 hover:bg-gray-100 text-right dark:hover:bg-gray-800 dark:text-white text-base"
                  onClick={onClose}
                >
                  {item.text}
                </Link>
              </div>
            );
          })}
        </div>
      </Drawer>
    </div>
  );
}
