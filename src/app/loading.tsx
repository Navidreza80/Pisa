"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { MoonIcon, SunIcon, RefreshCw, Home, Loader2 } from "lucide-react";
import "./[locale]/globals.css";

// Translation items
const translations = {
  fa: {
    title: "در حال بارگذاری",
    subtitle: "لطفا صبر کنید",
    description: "در حال آماده‌سازی محتوا برای شما هستیم.",
    backToHome: "بازگشت به خانه",
    tryAgain: "تلاش مجدد",
    explore: "کاوش در سایت",
    langSwitch: "EN",
    loading: "بارگذاری",
  },
  en: {
    title: "Loading",
    subtitle: "Please wait",
    description: "We are preparing the content for you.",
    backToHome: "Back to Home",
    tryAgain: "Try Again",
    explore: "Explore Site",
    langSwitch: "فا",
    loading: "Loading",
  },
};

export default function LoadingPage() {
  // Hooks
  const [locale, setLocale] = useState<"fa" | "en">("fa");
  const [isDark, setIsDark] = useState(true);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);
  const [glitchActive, setGlitchActive] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Handle mouse movement for parallax effect
  const handleMouseMove = (e: MouseEvent) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setMousePosition({
        x: ((e.clientX - rect.left) / containerRef.current.offsetWidth) - 0.5,
        y: ((e.clientY - rect.top) / containerRef.current.offsetHeight) - 0.5
      });
    }
  };

  useEffect(() => {
    const current = window.location.pathname.startsWith("/en") ? "en" : "fa";
    setLocale(current);

    if (localStorage.getItem("theme") === "dark") {
      document.documentElement.classList.add("dark");
      setIsDark(true);
    }
    
    // Animation sequence
    setTimeout(() => setIsLoaded(true), 300);
    
    // Glitch effect interval
    const glitchInterval = setInterval(() => {
      setGlitchActive(true);
      setTimeout(() => setGlitchActive(false), 200);
    }, 3000);
    
    // Add mouse move listener
    window.addEventListener('mousemove', handleMouseMove);
    
    // Initialize stars canvas
    const initStars = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      
      // Set canvas size
      const setCanvasSize = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      };
      
      setCanvasSize();
      window.addEventListener('resize', setCanvasSize);
      
      // Create stars
      const stars: {x: number, y: number, size: number, speed: number}[] = [];
      for (let i = 0; i < 200; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 1.5,
          speed: Math.random() * 0.5 + 0.1
        });
      }
      
      // Animation loop
      const animate = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw stars
        stars.forEach(star => {
          ctx.fillStyle = isDark ? 'rgba(255, 255, 255, 0.8)' : 'rgba(88, 108, 255, 0.8)';
          ctx.beginPath();
          ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
          ctx.fill();
          
          // Move stars
          star.y += star.speed;
          
          // Reset stars when they reach bottom
          if (star.y > canvas.height) {
            star.y = 0;
            star.x = Math.random() * canvas.width;
          }
        });
        
        requestAnimationFrame(animate);
      };
      
      animate();
    };
    
    initStars();
    
    return () => {
      clearInterval(glitchInterval);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isDark]);
  
  const t = translations[locale];

  // Toggle language
  const toggleLanguage = () => {
    const newLocale = locale === "fa" ? "en" : "fa";
    const newPath = window.location.pathname.replace(
      /^\/(fa|en)/,
      `/${newLocale}`
    );
    window.location.href = newPath;
  };

  // Toggle theme
  const toggleDark = () => {
    const isNowDark = document.documentElement.classList.toggle("dark");
    localStorage.setItem("theme", isNowDark ? "dark" : "light");
    setIsDark(isNowDark);
  };
  
  // Reload page
  const reloadPage = () => {
    window.location.reload();
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-white to-blue-50 dark:from-black dark:to-gray-900 transition-colors duration-500">
      {/* Stars background */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 z-0 opacity-70"
      />
      {/* Main content */}
      <div 
        ref={containerRef}
        className="relative z-10 flex flex-col items-center justify-center min-h-screen p-4"
      >
        <div 
          className={`max-w-3xl w-full relative ${isLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-1000`}
        >
          {/* 3D Floating elements with parallax effect */}
          <div className="absolute -top-20 -left-20 w-40 h-40 bg-primary/10 dark:bg-primary/20 rounded-full blur-3xl"
            style={{
              transform: `translate(${mousePosition.x * -30}px, ${mousePosition.y * -30}px)`,
              transition: 'transform 0.1s ease-out'
            }}
          />
          <div className="absolute -bottom-20 -right-20 w-60 h-60 bg-indigo-400/10 dark:bg-indigo-400/20 rounded-full blur-3xl"
            style={{
              transform: `translate(${mousePosition.x * 30}px, ${mousePosition.y * 30}px)`,
              transition: 'transform 0.1s ease-out'
            }}
          />
          
          {/* Main card */}
          <div 
            className={`relative bg-white/40 dark:bg-gray-900/40 backdrop-blur-xl rounded-3xl overflow-hidden border border-white/50 dark:border-gray-800/50 shadow-2xl ${glitchActive ? 'animate-glitch' : ''}`}
            style={{
              transform: `perspective(1000px) rotateX(${mousePosition.y * 5}deg) rotateY(${mousePosition.x * -5}deg)`,
              transition: 'transform 0.1s ease-out'
            }}
          >
            {/* Glitch overlay */}
            {glitchActive && (
              <div className="absolute inset-0 bg-primary/10 dark:bg-primary/20 z-10 animate-pulse" />
            )}
            
            {/* Card content */}
            <div className="p-8 md:p-12">
              {/* Loading spinner with 3D effect */}
              <div className="relative mb-8 flex justify-center overflow-hidden">
                <div className="text-[150px] font-black text-transparent bg-clip-text bg-gradient-to-b from-primary to-indigo-400 dark:from-primary dark:to-indigo-300 leading-none select-none flex items-center justify-center">
                  <Loader2 className="w-32 h-32 animate-spin text-primary" />
                </div>
                
                {/* Shadow effect */}
                <div className="absolute text-[150px] font-black text-transparent bg-clip-text bg-gradient-to-b from-primary/10 to-indigo-400/10 dark:from-primary/10 dark:to-indigo-300/10 leading-none blur-md select-none flex items-center justify-center"
                  style={{
                    transform: `translate(${mousePosition.x * 10}px, ${mousePosition.y * 10}px)`,
                    transition: 'transform 0.1s ease-out'
                  }}
                >
                  <Loader2 className="w-32 h-32 animate-spin text-primary/10" />
                </div>
              </div>
              
              {/* Content with staggered animation */}
              <div className="text-center space-y-4 mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white">
                  {t.title}
                </h2>
                
                <p className="text-xl md:text-2xl font-medium text-gray-700 dark:text-gray-200">
                  {t.subtitle}
                </p>
                
                <p className="text-gray-600 dark:text-gray-400 max-w-lg mx-auto">
                  {t.description}
                </p>
              </div>
              
              {/* Action buttons */}
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <Link
                  href={`/${locale}`}
                  className="flex-1 group relative overflow-hidden flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 transition-all px-6 py-3 rounded-xl text-lg font-bold shadow-lg shadow-primary/20 text-white"
                >
                  <Home className="w-5 h-5" />
                  <span>{t.backToHome}</span>
                  
                  {/* Button animation effect */}
                  <span className="absolute inset-0 translate-y-[102%] group-hover:translate-y-0 bg-indigo-600 transition-transform duration-300 ease-out rounded-xl" />
                </Link>
                
                <button
                  onClick={reloadPage}
                  className="flex-1 group relative overflow-hidden flex items-center justify-center gap-2 bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 transition-all px-6 py-3 rounded-xl text-lg font-medium shadow-md text-gray-800 dark:text-white"
                >
                  <RefreshCw className="w-5 h-5" />
                  <span>{t.tryAgain}</span>
                </button>
              </div>
            </div>
            
            {/* Decorative circuit lines */}
            <svg className="absolute top-0 left-0 w-full h-full pointer-events-none z-0 opacity-20 dark:opacity-30" viewBox="0 0 800 600" xmlns="http://www.w3.org/2000/svg">
              <path d="M50,250 Q200,150 350,250 T650,250" stroke="#586CFF" strokeWidth="1" fill="none" />
              <path d="M100,350 Q250,450 400,350 T700,350" stroke="#586CFF" strokeWidth="1" fill="none" />
              <circle cx="50" cy="250" r="5" fill="#586CFF" />
              <circle cx="650" cy="250" r="5" fill="#586CFF" />
              <circle cx="100" cy="350" r="5" fill="#586CFF" />
              <circle cx="700" cy="350" r="5" fill="#586CFF" />
              <circle cx="350" cy="250" r="3" fill="#586CFF">
                <animate attributeName="opacity" values="1;0.3;1" dur="2s" repeatCount="indefinite" />
              </circle>
              <circle cx="400" cy="350" r="3" fill="#586CFF">
                <animate attributeName="opacity" values="0.3;1;0.3" dur="2s" repeatCount="indefinite" />
              </circle>
            </svg>
          </div>
          
          {/* Footer */}
          <div className="mt-8 text-center text-gray-500 dark:text-gray-400 text-sm">
            <p>© {new Date().getFullYear()} Next-elites</p>
          </div>
        </div>
      </div>
      
      {/* Add custom keyframes for glitch animation */}
      <style jsx global>{`
        @keyframes glitch {
          0% { transform: translate(0); }
          20% { transform: translate(-2px, 2px); }
          40% { transform: translate(-2px, -2px); }
          60% { transform: translate(2px, 2px); }
          80% { transform: translate(2px, -2px); }
          100% { transform: translate(0); }
        }
        .animate-glitch {
          animation: glitch 0.2s linear;
        }
      `}</style>
    </div>
  );
}