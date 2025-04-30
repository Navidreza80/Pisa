'use client';

import Image from "next/image";
import { useState, useEffect } from 'react';

const GEAR_SIZE_MIN = 20;
const GEAR_SIZE_MAX = 80;
const NUM_GEARS = 30; // افزایش تعداد چرخ‌دنده‌ها
const MAX_OFFSET = 20;
const MAX_ROTATION = 180;

const IMAGE_TOP_START = 150;
const IMAGE_HEIGHT = 400;
const BUTTON_HEIGHT = 50;
const BUTTON_BOTTOM_START = 600;
const HORIZONTAL_MARGIN = 50; // کاهش حاشیه برای تراکم بیشتر
const VERTICAL_MARGIN = 50;   // کاهش حاشیه برای تراکم بیشتر

export default function ErrorPage() {
    const [gears, setGears] = useState([]);
    const [windowHeight, setWindowHeight] = useState(0);
    const [windowWidth, setWindowWidth] = useState(0);

    useEffect(() => {
        const handleResize = () => {
            setWindowHeight(window.innerHeight);
            setWindowWidth(window.innerWidth);
        };

        handleResize();
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        const newGears = [];
        const pageWidth = windowWidth;
        const pageHeight = windowHeight;

        const imageLeft = pageWidth / 2 - 350;
        const imageRight = pageWidth / 2 + 350;
        const buttonLeft = pageWidth / 2 - 100;

        const maxX = pageWidth - HORIZONTAL_MARGIN;
        const minX = HORIZONTAL_MARGIN;
        const maxY = pageHeight - VERTICAL_MARGIN;
        const minY = VERTICAL_MARGIN;

        for (let i = 0; i < NUM_GEARS; i++) {
            let top, left;
            const size = GEAR_SIZE_MIN + Math.random() * (GEAR_SIZE_MAX - GEAR_SIZE_MIN);
            const offsetX = (Math.random() - 0.5) * MAX_OFFSET;
            const offsetY = (Math.random() - 0.5) * MAX_OFFSET;
            const rotation = (Math.random() - 0.5) * MAX_ROTATION;

            let attempts = 0;
            while (attempts < 100) {
                left = minX + Math.random() * (maxX - minX - size);
                top = minY + Math.random() * (maxY - minY - size);
                const gearRight = left + size;
                const gearBottom = top + size;

                const imageOverlap = !(
                    left > imageRight ||
                    gearRight < imageLeft ||
                    top > IMAGE_TOP_START + IMAGE_HEIGHT ||
                    gearBottom < IMAGE_TOP_START
                );

                const buttonOverlap = !(
                    left > buttonLeft + 200 ||
                    gearRight < buttonLeft ||
                    top > BUTTON_BOTTOM_START + BUTTON_HEIGHT ||
                    gearBottom < BUTTON_BOTTOM_START
                );

                let overlap = false;
                for (let j = 0; j < newGears.length; j++) {
                    const otherGear = newGears[j];
                    const otherLeft = otherGear.left;
                    const otherTop = otherGear.top;
                    const otherSize = otherGear.size;
                    const otherRight = otherLeft + otherSize;
                    const otherBottom = otherTop + otherSize;

                    if (!(
                        left > otherRight ||
                        gearRight < otherLeft ||
                        top > otherBottom ||
                        gearBottom < otherTop
                    )) {
                        overlap = true;
                        break;
                    }
                }

                if (!imageOverlap && !buttonOverlap && !overlap) {
                    break;
                }
                attempts++;
            }

            if (attempts < 100) {
                newGears.push({
                    id: `random-${i}`,
                    size: size,
                    top: top + offsetY,
                    left: left + offsetX,
                    duration: 5 + Math.random() * 5,
                    rotation: rotation,
                });
            }
        }
        setGears(newGears);
    }, [windowWidth, windowHeight]);

    return (
        <div className="min-h-[100vh] bg-gray-100 flex flex-col items-center justify-center relative">
            {/* بخش مربوط به چرخ‌دنده‌ها */}
            <div className="absolute top-0 left-0 w-full h-full z-0 opacity-50 pointer-events-none">
                {gears.map((gear) => (
                    <div
                        key={gear.id}
                        className="absolute"
                        style={{
                            top: `${gear.top}px`,
                            left: `${gear.left}px`,
                            width: `${gear.size}px`,
                            height: `${gear.size}px`,
                            transform: `rotate(${gear.rotation}deg)`,
                        }}
                    >
                        <Image
                            src="/gear.svg"
                            alt="Gear"
                            width={gear.size}
                            height={gear.size}
                            className="animate-spin-slow"
                            style={{
                                width: '100%',
                                height: '100%',
                                animationDuration: `${gear.duration}s`,
                                filter: 'invert(39%) sepia(74%) saturate(368%) hue-rotate(181deg) brightness(96%) contrast(94%)',
                            }}
                        />
                    </div>
                ))}
            </div>

            {/* بخش مربوط به عکس */}
            <div className="relative z-10 flex justify-center mb-8">
                <Image
                    src="/55.svg"
                    alt="Error Illustration"
                    width={700}
                    height={500}
                    className="w-full object-contain"
                />
            </div>

            {/* دکمه پایین تصویر */}
            <div className="z-10 mb-8">
                <button
                    onClick={() => (window.location.href = "/")}
                    className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition"
                >
                    بازگشت به صفحه اصلی
                </button>
            </div>
        </div>
    );
}
