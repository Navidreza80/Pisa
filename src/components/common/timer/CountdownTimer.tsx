"use client";

import { useEffect, useState } from "react";
import TimerSVG from "@/components/common/svg/timer";

interface CountdownTimerProps {
  targetDate: Date;
}

export default function CountdownTimer({ targetDate }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = targetDate.getTime() - new Date().getTime();
      
      if (difference <= 0) {
        setTimeLeft({ hours: 0, minutes: 0, seconds: 0 });
        return;
      }
      
      setTimeLeft({
        hours: Math.floor((difference / (1000 * 60 * 60))),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      });
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  const formatTime = (value: number) => {
    return value < 10 ? `0${value}` : value;
  };

  return (
    <div className="bg-[#FF5454] py-[12px] px-[16px] rounded-[16px] h-[50px] flex flex-row-reverse gap-[8px] font-yekannum">
      <h1 className="my-auto text-white text-[20px] font-[600]">
        {`${formatTime(timeLeft.hours)}:${formatTime(timeLeft.minutes)}:${formatTime(timeLeft.seconds)}`}
      </h1>
      <TimerSVG color="white" />
    </div>
  );
}