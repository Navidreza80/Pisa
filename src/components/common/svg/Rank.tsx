const RankSVG = ({ className }) => {
  return (
    <svg
      className={`hover:shadow-amber-200 ${className}  rounded-full cursor-pointer hover:animate-shake hover:shadow-md transition-all duration-300`}
      width="64"
      height="64"
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="1" y="1" width="62" height="62" rx="31" fill="white" />
      <rect
        x="1"
        y="1"
        width="62"
        height="62"
        rx="31"
        stroke="#F5FF6D"
        strokeWidth="2"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M26.1669 20.6421C26.5845 19.6841 26.7933 19.205 27.2084 18.9359C27.6235 18.6667 28.1536 18.6667 29.2137 18.6667H34.7865C35.8466 18.6667 36.3766 18.6667 36.7918 18.9359C37.2069 19.205 37.4157 19.6841 37.8333 20.6421L40.5253 26.8184C41.1893 28.3418 41.5213 29.1035 41.2234 29.7558C40.9255 30.4081 40.1259 30.6702 38.5267 31.1943L32.0001 33.3334L25.4734 31.1943C23.8742 30.6702 23.0746 30.4081 22.7767 29.7558C22.4788 29.1035 22.8108 28.3418 23.4748 26.8184L26.1669 20.6421Z"
        stroke="black"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M31.9999 33.3334L27.3333 19.3334M36.6666 31.3334L31.9999 18.6667"
        stroke="black"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M33.0365 34.1998L34.0924 36.329C34.2364 36.6254 34.6204 36.9096 34.9444 36.964L36.8581 37.2847C38.082 37.4903 38.37 38.3856 37.4881 39.2687L36.0003 40.7688C35.7483 41.023 35.6103 41.5128 35.6883 41.8638L36.1143 43.7207C36.4503 45.1906 35.6763 45.7592 34.3864 44.991L32.5927 43.9203C32.2687 43.7268 31.7347 43.7268 31.4048 43.9203L29.6109 44.991C28.3271 45.7592 27.5472 45.1846 27.8831 43.7207L28.3091 41.8638C28.3871 41.5128 28.2491 41.023 27.9971 40.7688L26.5093 39.2687C25.6334 38.3856 25.9154 37.4903 27.1392 37.2847L29.053 36.964C29.3709 36.9096 29.7549 36.6254 29.8989 36.329L30.9548 34.1998C31.5308 33.0444 32.4667 33.0444 33.0365 34.1998Z"
        stroke="black"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
export default RankSVG;
