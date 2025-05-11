// Next
import Link from "next/link";

// Images
import FallbackImage from "@/components/common/FallbackImage";

// Types
import type ProfileProps from "@/types/about-us";

// SVGs
import GithubSVG from "../common/svg/github";
import LinkedinSVG from "../common/svg/linkedin";

/**
 * About us input for displaying next elite image
 *
 * @component
 * @param {ProfileProps} props - Component props
 * @returns {JSX.Element} - Rendered next elite image
 */

export default function ProfileNextElites({
  profile,
  name,
  job,
}: ProfileProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden transform transition-all hover:scale-105">
      <div className="h-40 bg-gradient-to-r from-blue-400 to-indigo-500"></div>
      <div className="relative px-6 pb-6">
        <FallbackImage
          src={profile}
          alt={name}
          className="w-32 h-32 object-cover rounded-full mx-auto -mt-16 border-4 border-white dark:border-gray-700 shadow-md"
          fallbackSrc="https://via.placeholder.com/150"
        />
        <h3 className="text-xl font-bold text-center text-gray-800 dark:text-gray-100 mt-4 mb-2">
          {name}
        </h3>
        <p className="text-blue-600 dark:text-blue-400 text-center font-medium mb-4">
          {job}
        </p>
        <div className="flex justify-center gap-4 mt-4">
          <Link
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-blue-600 transition"
          >
            <GithubSVG />
          </Link>

          <Link
            href="https://linkedin.com/in"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-blue-600 transition"
          >
            <LinkedinSVG />
          </Link>
        </div>
      </div>
    </div>
  );
}
