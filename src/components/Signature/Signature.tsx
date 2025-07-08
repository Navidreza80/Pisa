/* eslint-disable */

"use client";

import { numberToPersianWords } from "@/app/[locale]/payment/[id]/numToWord";
import { jsPDF } from "jspdf";
import { useRef, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import iranYekanFont from "./iranYekanBase64";
import { formatNumber } from "@/utils/helper/format-number";
import { useLocale, useTranslations } from "next-intl";

interface ContractData {
  contractNumber: string;
  date: string;
  sellerName: string;
  sellerNationalId: string;
  buyerName: string;
  buyerNationalId: string;
  propertyAddress: string;
  propertyType: string;
  propertySize: string;
  price: number;
  terms: string[];
  pages?: number;
}

const initialContractData: ContractData = {
  contractNumber: "۱۴۰۲-۱۲۳۴۵",
  date: new Date().toLocaleDateString("fa-IR"),
  sellerName: "اکبر موسوی",
  sellerNationalId: "12345678",
  buyerName: "علی محمدی",
  buyerNationalId: "87654321",
  propertyAddress: "تهران، زعفرانیه، پلاک ۱۲",
  propertyType: "آپارتمان",
  propertySize: "۱۲۰ متر مربع",
  price: 455555555555555,
  terms: [
    "مبلغ قرارداد به صورت نقدی پرداخت می‌شود.",
    "تحویل ملک حداکثر تا ۳۰ روز پس از امضا انجام می‌شود.",
    "کلیه هزینه‌های انتقال سند به عهده خریدار می‌باشد.",
    "در صورت عدم انجام تعهدات توسط هر یک از طرفین، طرف دیگر حق فسخ قرارداد را دارد.",
    "این قرارداد در ۳ نسخه با اعتبار یکسان تنظیم می‌گردد.",
  ],
  pages: 3,
};

const Signature = ({ HouseDetails, decodedUser }) => {
  const t = useTranslations("Signature");
  const locale = useLocale();
  const isRTL = locale === "ar" || locale === "fa";
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [lastPosition, setLastPosition] = useState({ x: 0, y: 0 });
  const [contractData, setContractData] =
    useState<ContractData>(initialContractData);
  const SellerImage =
    "https://upload.wikimedia.org/wikipedia/commons/5/5e/Mohsen_Rezaee_signature.png";

  const getMousePos = (
    canvas: HTMLCanvasElement,
    evt: React.MouseEvent<HTMLCanvasElement>
  ) => {
    const rect = canvas.getBoundingClientRect();
    return {
      x: (evt.clientX - rect.left) * (canvas.width / rect.width),
      y: (evt.clientY - rect.top) * (canvas.height / rect.height),
    };
  };

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const pos = getMousePos(canvas, e);
    setLastPosition(pos);

    ctx.beginPath();
    ctx.moveTo(pos.x, pos.y);
    ctx.strokeStyle = "#000";
    ctx.lineWidth = 5;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    setIsDrawing(true);
    setIsSaved(false);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const pos = getMousePos(canvas, e);
    ctx.beginPath();
    ctx.moveTo(lastPosition.x, lastPosition.y);
    ctx.lineTo(pos.x, pos.y);
    ctx.stroke();

    setLastPosition(pos);
  };

  const endDrawing = () => {
    setIsDrawing(false);
  };

  const optimizeSignatureImage = (dataURL: string): Promise<string> => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        if (!ctx) return resolve(dataURL);

        canvas.width = 300;
        canvas.height = 125;
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL("image/png", 0.8));
      };
      img.src = dataURL;
    });
  };

  const generateContractPDF = async (buyerSignatureDataURL: string) => {
    const doc = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });

    try {
      doc.addFileToVFS("IranYekan.ttf", iranYekanFont);
      doc.addFont("IranYekan.ttf", "IranYekan", "normal");
      doc.setFont("IranYekan");
      doc.setR2L(true);
      (doc as any).setLanguage("fa");
      const textOptions = {
        align: "right",
        lang: "fa",
        isInputRtl: true,
        isOutputRtl: true,
      };
      doc.setFontSize(18);
      doc.setTextColor(60, 53, 147);
      doc.text("قـولـنـامـه رسـمـی خـریـد و فـروش", 190, 20, {
        align: "center",
        ...textOptions,
      });
      doc.setDrawColor(40, 53, 147);
      doc.setLineWidth(0.5);
      doc.line(50, 22, 190, 22);
      doc.setFontSize(12);
      doc.setTextColor(0, 0, 0);
      doc.text(
        `شماره قرارداد: ${contractData.contractNumber}`,
        190,
        30,
        textOptions
      );
      doc.text(`تاریخ: ${contractData.date}`, 190, 35, textOptions);
      const contractContent = [
        `این قرارداد در تاریخ ${contractData.date} ما بین:`,
        `۱- آقا/خانم ${contractData.sellerName} فرزند ... متولد ... دارای شناسنامه شماره ... صادره از ... و کد ملی ${contractData.sellerNationalId} به عنوان فروشنده`,
        `و`,
        `۲- آقا/خانم ${decodedUser.name} فرزند ... متولد ... دارای شناسنامه شماره ... صادره از ... و کد ملی ${contractData.buyerNationalId} به عنوان خریدار`,
        `منعقد گردید. طرفین با توجه به اهلیت قانونی و اختیار تام، نسبت به انعقاد این قرارداد اقدام نموده‌اند.`,
        ``,
        `موضوع قرارداد: ${contractData.propertyType} واقع در ${HouseDetails.address} با مساحت تقریبی ${contractData.propertySize} و مشخصات کامل ...`,
        `مبلغ معامله: ${formatNumber(HouseDetails.price)} ) مبلغ به حروف: ${numberToPersianWords(Number(HouseDetails.price))} تومان (`,
        `نحوه پرداخت: اینترنتی)piza(`,
        `موعد تحویل: ${contractData.date}`,
        ``,
        `شرایط و تعهدات خاص:`,
        ...contractData.terms.map(
          (term, index) => `ماده ${index + 1}: ${term}`
        ),
        ``,
        `تعهدات طرفین:`,
        `الف( پول واریز شه`,
        `ب( خونه سالم نگه داشته شه`,
        `ج( در صورت عدم انجام تعهدات خسارت پرداخت شه`,
        ``,
        `این قرارداد در ${contractData.pages || "۳"} نسخه با اعتبار یکسان تنظیم و پس از امضای طرفین، هر نسخه نزد آنها باقی می‌ماند.`,
        `کلیه اختلافات ناشی از این قرارداد از طریق مراجع قضایی تهران رسیدگی خواهد شد.`,
      ];
      let yPos = 45;
      contractContent.forEach((paragraph) => {
        const splitText = (doc as any).splitTextToSize(
          paragraph,
          190,
          textOptions
        );
        doc.text(splitText, 190, yPos, textOptions);
        yPos += splitText.length * 7;
        if (yPos > 270) {
          doc.addPage();
          doc.setR2L(true);
          (doc as any).setLanguage("fa");
          yPos = 20;
        }
      });
      const persianFont = "...";

      doc.addPage();
      doc.setR2L(true);
      (doc as any).setLanguage("fa");

      doc.setFontSize(16);
      doc.setTextColor(40, 53, 147);
      doc.text("امضا و مهر طرفین قرارداد", 135, 20, {
        align: "center",
        ...textOptions,
      });

      doc.setFontSize(12);
      doc.setTextColor(0, 0, 0);

      const sellerInfo = [
        `نام و نام خانوادگی: ${contractData.sellerName}`,
        `کد ملی: ${contractData.sellerNationalId}`,
        `تاریخ: ${contractData.date}`,
      ];

      sellerInfo.forEach((text, index) => {
        doc.text(text, 180, 40 + index * 10, textOptions);
      });
      doc.text("امضای فروشنده", 180, 80, textOptions);
      doc.addImage(SellerImage, "PNG", 140, 85, 35, 13);

      doc.text("امضای خریدار", 80, 80, textOptions);

      if (
        buyerSignatureDataURL &&
        buyerSignatureDataURL.startsWith("data:image/png")
      ) {
        doc.addImage(buyerSignatureDataURL, "PNG", 40, 85, 50, 20);
      } else {
        doc.text("بدون امضا", 160, 90, textOptions);
      }

      const buyerInfo = [
        `نام و نام خانوادگی: ${decodedUser.name}`,
        `کد ملی: ${contractData.buyerNationalId}`,
        `تاریخ: ${contractData.date}`,
      ];

      buyerInfo.forEach((text, index) => {
        doc.text(text, 80, 40 + index * 10, textOptions);
      });

      doc.setFontSize(10);
      doc.setTextColor(100, 100, 100);
      doc.text(
        "این سند به صورت الکترونیکی ایجاد شده و دارای اعتبار قانونی می‌باشد.",
        160,
        120,
        { align: "center", ...textOptions }
      );
      return doc;
    } catch (error) {
      console.error("خطا در تولید PDF:", error);
      throw error;
    }
  };
  const clearSignature = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setIsSaved(false);
    toast.info(t("signatureCleared"));
  };

  const saveSignature = async () => {
    const canvas = canvasRef.current;
    if (!canvas) {
      toast.error(t("canvasAccessError"));
      return;
    }
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      toast.error(t("contextError"));
      return;
    }

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const isEmpty = !imageData.data.some((channel) => channel !== 0);

    if (isEmpty) {
      toast.warning(t("pleaseSignFirst"));
      return;
    }

    try {
      const signatureDataURL = canvas.toDataURL("image/png");
      const optimizedSignature = await optimizeSignatureImage(signatureDataURL);
      const doc = await generateContractPDF(optimizedSignature);

      doc.save(`قولنامه_${contractData.contractNumber}.pdf`);
      setIsSaved(true);
      toast.success(t("contractSaved"));
    } catch (error) {
      console.error("خطا در ایجاد قولنامه:", error);
      toast.error(t("contractError"));
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-border rounded-lg shadow-md">
      <ToastContainer position="top-center" rtl autoClose={5000} />

      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-text">
          {t("digitalSignatureTitle")}
        </h2>
        <p className="text-text-secondary">
          {t("contractNumber", { number: contractData.contractNumber })}
        </p>
      </div>

      <div
        className={`grid grid-cols-1 md:grid-cols-2 gap-6 mb-6`}
        dir={isRTL ? "rtl" : "ltr"}
      >
        <div className="bg-primary/20 p-4 rounded-lg">
          <h3 className="font-semibold text-primary mb-2">{t("sellerInfo")}</h3>
          <p>
            <span className="w-full font-medium">{t("name")}:</span>{" "}
            {contractData.sellerName}
          </p>
          <p>
            <span className="w-full font-medium">{t("nationalId")}:</span>
            {contractData.sellerNationalId}
          </p>
        </div>

        <div className="bg-surface/50 p-4 rounded-lg">
          <h3 className="w-full font-semibold text-primary mb-2">
            {t("buyerInfo")}
          </h3>
          <p>
            <span className="font-medium">{t("name")}:</span> {decodedUser.name}
          </p>
          <p>
            <span className="w-full font-medium">{t("nationalId")}:</span>{" "}
            {contractData.buyerNationalId}
          </p>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="font-semibold text-text mb-2">
          {t("pleaseDrawSignature")}
        </h3>
        <div className="relative">
          <canvas
            ref={canvasRef}
            width={600}
            height={250}
            className="w-full border-2 rounded-lg border-text-secondary h-64 bg-white cursor-crosshair"
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={endDrawing}
            onMouseLeave={endDrawing}
          />
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <button
          onClick={clearSignature}
          className="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 flex items-center justify-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 ml-1"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
          {t("clearSignature")}
        </button>

        <button
          onClick={saveSignature}
          disabled={isSaved}
          className={`px-6 py-3 rounded-lg flex items-center justify-center transition ${
            isSaved
              ? "bg-green-500 text-white"
              : "bg-blue-600 text-white hover:bg-blue-700"
          }`}
        >
          {isSaved ? (
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 ml-1"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              {t("contractReady")}
            </>
          ) : (
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 ml-1"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
              {t("confirmAndGenerateContract")}
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default Signature;
