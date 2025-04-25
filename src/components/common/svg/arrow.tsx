export default function ArrowSVG() {
  return (
    <>
      <svg
        width="32"
        height="32"
        className="mt-1.5"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M16 29.3333C24 29.3333 26 23.32 26 16C26 8.67998 24 2.66667 16 2.66667C7.99991 2.66667 6 8.67995 6 16C6 23.32 7.99991 29.3333 16 29.3333Z"
          stroke="black"
          strokeWidth="1.5"
        />
        <path
          d="M15.9844 9.11812V15.6781"
          stroke="black"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M13.3281 10.4781C14.6401 9.11813 15.4401 7.91813 16.0481 8.00438C16.5601 8.00013 17.0401 8.79813 18.6721 10.4781"
          stroke="black"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M18.6721 14.8541C17.3601 16.2141 16.5601 17.4141 15.9521 17.3279C15.4401 17.3321 14.9601 16.5341 13.3281 14.8541"
          stroke="black"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <p className="mt-2 font-semibold text-sm text-black">{t("scroll")}</p>
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="animate-bounce"
      >
        <path
          d="M15 7.50004C15 7.50004 11.3176 12.5 10 12.5C8.68233 12.5 5 7.5 5 7.5"
          stroke="black"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </>
  );
}
