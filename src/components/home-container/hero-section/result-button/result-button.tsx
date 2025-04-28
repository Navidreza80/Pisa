"use client";
// Third party components
import Button from "@/components/common/button/button";
import HouseCard from "@/components/common/house/house-card";
import { HouseItemsInterface } from "@/types/house";
import { Modal } from "antd";
import { useTranslations } from "next-intl";
import { useState } from "react";

export default function ResultButton({ houses }: { houses: Array<HouseItemsInterface> }) {
  // Hooks
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
      <Button
        handleClick={showModal}
        className="transition-colors duration-300 ease-in-out animate-[var(--animation-pulse)] [animation-delay:1.3s] [animation-iteration-count:1] [animation-fill-mode:both]"
      >
        {t("result")}
      </Button>
      <Modal
        title={t("searchResults")}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okText={t("ok")}
        cancelText={t("cancel")}
        className="custom-modal"
        width={700}
        styles={{
          body: {
            maxHeight: '500px',
            overflow: 'auto',
            padding: '16px'
          }
        }}
      >
        <div className="py-4 text-right" dir="rtl">
          {houses && houses.length > 0 ? (
            <div className="grid grid-cols-1 gap-6">
              {houses.map((item, index) => (
                <HouseCard key={index} item={item} />
              ))}
            </div>
          ) : (
            <p className="text-center text-text-secondary">
              نتیجه‌ای یافت نشد
            </p>
          )}
        </div>
      </Modal>
    </>
  );
}
