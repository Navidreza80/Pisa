"use client";

import { Modal, Carousel } from "antd";
import { useTranslations } from "next-intl";
import { useState } from "react";
import Image from "next/image";

export default function ResultButton({ houses }) {
  const t = useTranslations("HomePage");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <button
        onClick={showModal}
        className="w-[133px] h-[48px] rounded-2xl bg-[#586CFF] text-white hover:bg-[#4A5FE3] transition-colors duration-300 ease-in-out animate-[var(--animation-pulse)] [animation-delay:1.3s] [animation-iteration-count:1] [animation-fill-mode:both]"
      >
        {t("result")}
      </button>
      <Modal
        title={t("searchResults")}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okText={t("ok")}
        cancelText={t("cancel")}
        className="custom-modal"
        width={700}
      >
        <div className="py-4 text-right">
          {houses && houses.length > 0 ? (
            <div className="grid grid-cols-1 gap-6">
              {houses.map((item, index) => (
                <div
                  key={index}
                  className="border border-border p-4 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  {item.photos && item.photos.length > 0 && (
                    <div className="mb-4">
                      <Carousel
                        autoplay
                        className="rounded-lg overflow-hidden"
                        style={{ height: "200px" }}
                      >
                        {item.photos.map((photo, photoIndex) => (
                          <div key={photoIndex} className="h-[200px] relative">
                            <Image
                              src={photo}
                              alt={`${item.title} - تصویر ${photoIndex + 1}`}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ))}
                      </Carousel>
                    </div>
                  )}

                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-bold mb-2 font-yekan">
                        {item.title}
                      </h3>
                      {item.address && (
                        <p className="text-text-secondary dark:text-text-secondary-dark text-sm mb-2 font-yekan">
                          {item.address}
                        </p>
                      )}
                    </div>
                    {item.rate && (
                      <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-md">
                        <span className="text-yellow-500">★</span>
                        <span className="font-yekannum">{item.rate}</span>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-2 my-2">
                    {item.tags &&
                      item.tags.map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full font-yekan"
                        >
                          {tag}
                        </span>
                      ))}
                  </div>

                  <div className="grid grid-cols-3 gap-2 my-3">
                    {item.rooms && (
                      <div className="flex items-center gap-1 text-sm text-gray-600">
                        <span>🛏️</span>
                        <span className="font-yekannum">
                          {item.rooms} {t("rooms")}
                        </span>
                      </div>
                    )}
                    {item.bathrooms && (
                      <div className="flex items-center gap-1 text-sm text-gray-600">
                        <span>🚿</span>
                        <span className="font-yekannum">
                          {item.bathrooms} حمام
                        </span>
                      </div>
                    )}
                    {item.capacity && (
                      <div className="flex items-center gap-1 text-sm text-gray-600">
                        <span>👤</span>
                        <span className="font-yekannum">
                          {item.capacity} نفر
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="flex justify-between items-center mt-3 pt-3 border-t border-gray-100">
                    {item.price && (
                      <span className="font-medium font-yekannum text-[#586CFF]">
                        {parseInt(item.price).toLocaleString()} تومان
                        {item.transaction_type === "rental" && (
                          <span className="text-xs text-gray-500 mr-1">
                            / شب
                          </span>
                        )}
                      </span>
                    )}
                    <button className="bg-[#586CFF] text-white px-4 py-2 rounded-lg text-sm font-yekan hover:bg-[#4A5FE3] transition-colors">
                      {t("viewDetails")}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-text-secondary dark:text-text-secondary-dark">
              نتیجه‌ای یافت نشد
            </p>
          )}
        </div>
      </Modal>
    </>
  );
}
