import React from "react";

function ArrowSVG({ className }: { className: string }) {
  return (
    <svg
      width="12"
      height="9"
      viewBox="0 0 8 6"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M7 1L4 4L1 1" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

export default ArrowSVG;
