export default function BuildingsSvg(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={120}
      height={80}
      className="hidden mx-auto max-[1150px]:block"
      viewBox="0 0 120 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      {/* Sun */}
      <circle cx={20} cy={18} r={7} fill="url(#sunGradient)" opacity="0.7" />
      {/* Clouds */}
      <ellipse cx={45} cy={15} rx={7} ry={3} fill="#E2E8F0" opacity="0.7" />
      <ellipse cx={60} cy={10} rx={4} ry={2} fill="#E2E8F0" opacity="0.5" />

      {/* Shadows */}
      <ellipse cx={22.5} cy={72} rx={13} ry={2.5} fill="#BEE3F8" opacity="0.5" />
      <ellipse cx={60} cy={72} rx={16} ry={3} fill="#A0AEC0" opacity="0.4" />
      <ellipse cx={95} cy={72} rx={10} ry={2} fill="#A0AEC0" opacity="0.3" />

      {/* Left Building */}
      <rect x={10} y={30} width={25} height={40} rx={3} fill="url(#leftGradient)" />
      {/* Roof */}
      <polygon points="10,30 22.5,22 35,30" fill="#4C51BF" opacity="0.7" />
      {/* Windows */}
      <rect x={17} y={50} width={11} height={20} rx={1.5} fill="#fff" />
      <rect x={17} y={35} width={11} height={10} rx={1.5} fill="#fff" />

      {/* Middle Building (taller) */}
      <rect x={45} y={15} width={30} height={55} rx={4} fill="url(#middleGradient)" />
      {/* Roof */}
      <polygon points="45,15 60,7 75,15" fill="#5A67D8" opacity="0.7" />
      {/* Windows */}
      <rect x={55} y={50} width={10} height={20} rx={1.5} fill="#fff" />
      <rect x={55} y={35} width={10} height={10} rx={1.5} fill="#fff" />
      <rect x={55} y={22} width={10} height={8} rx={1.5} fill="#fff" />

      {/* Right Building */}
      <rect x={85} y={40} width={20} height={30} rx={2.5} fill="url(#rightGradient)" />
      {/* Roof */}
      <polygon points="85,40 95,33 105,40" fill="#434190" opacity="0.7" />
      {/* Windows */}
      <rect x={91} y={55} width={8} height={15} rx={1.2} fill="#fff" />
      <rect x={91} y={45} width={8} height={7} rx={1.2} fill="#fff" />

      {/* Gradients */}
      <defs>
        <linearGradient id="leftGradient" x1="10" y1="30" x2="35" y2="70" gradientUnits="userSpaceOnUse">
          <stop stopColor="#A3BFFA" />
          <stop offset="1" stopColor="#63B3ED" />
        </linearGradient>
        <linearGradient id="middleGradient" x1="45" y1="15" x2="75" y2="70" gradientUnits="userSpaceOnUse">
          <stop stopColor="#667EEA" />
          <stop offset="1" stopColor="#63B3ED" />
        </linearGradient>
        <linearGradient id="rightGradient" x1="85" y1="40" x2="105" y2="70" gradientUnits="userSpaceOnUse">
          <stop stopColor="#5A67D8" />
          <stop offset="1" stopColor="#A3BFFA" />
        </linearGradient>
        <radialGradient id="sunGradient" cx="0" cy="0" r="1" gradientTransform="translate(20 18) scale(7)" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFD700" />
          <stop offset="1" stopColor="#FEEBC8" />
        </radialGradient>
      </defs>
    </svg>
  );
}