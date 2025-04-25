"use client";
// Icons
import { MenuOutlined } from "@ant-design/icons";
// antd components
import { Button, Drawer } from "antd";
// Icons
import { Book, Home, User } from "lucide-react";
// Next built in components
import Link from "next/link";
// React built in components
import { useState } from "react";

export default function MobileNav() {
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  // Navigation items
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
