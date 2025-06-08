"use client";
import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import "photo-sphere-viewer/dist/photo-sphere-viewer.css";

interface VirtualTourProps {
  img: string;
}

const VirtualTourComponent = ({ img }: VirtualTourProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const viewerInstance = useRef<any>(null);

  useEffect(() => {
    const loadViewer = async () => {
      try {
        const { Viewer } = await import("photo-sphere-viewer");

        if (containerRef.current && !viewerInstance.current) {
          viewerInstance.current = new Viewer({
            container: containerRef.current,
            panorama: img,
            loadingImg: "",
            navbar: ["fullscreen"],
            size: {
              height: "387px",
            },
          });
        }
      } catch (error) {
        console.error("خطا در بارگذاری تور مجازی:", error);
      }
    };

    loadViewer();

    return () => {
      viewerInstance.current?.destroy();
      viewerInstance.current = null;
    };
  }, []);

  useEffect(() => {
    if (viewerInstance.current) {
      viewerInstance.current.setPanorama(img, {
        transition: 1000,
        showLoader: true,
      });
    }
  }, [img]);

  return (
    <div className="relative w-full">
      <div
        ref={containerRef}
        className="w-full h-[387px] rounded-xl overflow-hidden"
      />
    </div>
  );
};

const VirtualTour = dynamic(() => Promise.resolve(VirtualTourComponent), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[387px] flex items-center justify-center bg-gray-100">
      <p>در حال بارگزاری بازدید 3 بعدی</p>
    </div>
  ),
});

export default VirtualTour;
