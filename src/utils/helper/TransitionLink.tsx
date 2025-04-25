"use client";
import Link, { LinkProps } from "next/link";
import { useRouter } from "next/navigation";
import { ReactNode, useState } from "react";

interface TransitionLinkProps extends LinkProps {
  children: ReactNode;
  href: string;
  className: string;
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const TransitionLink = ({
  children,
  href,
  ...props
}: TransitionLinkProps) => {
  const router = useRouter();
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleTransition = async (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    e.preventDefault();
    setIsTransitioning(true);

    // Wait for animation to complete
    router.push(href);
    await sleep(800);
    await setIsTransitioning(false);
  };

  return (
    <>
      {isTransitioning && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background dark:bg-surface-dark animate-[var(--animation-curtain-open)]">
          <div className="animate-[var(--animation-building-appear)] [animation-delay:0.1s] [animation-fill-mode:both] opacity-0">
            <svg width="120" height="120" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 22H23" stroke="#586CFF" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M19.78 22.01V17.55" stroke="#586CFF" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M19.8 10.89C18.58 10.89 17.6 11.87 17.6 13.09V15.36C17.6 16.58 18.58 17.56 19.8 17.56C21.02 17.56 22 16.58 22 15.36V13.09C22 11.87 21.02 10.89 19.8 10.89Z" stroke="#586CFF" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 22V6C2 4.9 2.9 4 4 4H12C13.1 4 14 4.9 14 6V22" stroke="#586CFF" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M5 8H11" stroke="#586CFF" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M5 12H11" stroke="#586CFF" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M5 16H8" stroke="#586CFF" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
      )}
      <Link onClick={handleTransition} href={href} {...props}>
        {children}
      </Link>
    </>
  );
};
