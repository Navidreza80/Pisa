import FallbackImage from "@/components/common/FallbackImage";
import GithubSVG from "@/components/common/svg/github";
import LinkedinSVG from "@/components/common/svg/linkedin";
import Link from "next/link";

/**
 * About us input for displaying next elite image
 *
 * @component
 * @param {ProfileProps} props - Component props
 * @returns {JSX.Element} - Rendered next elite image
 */

interface IProps {
  profile: string;
  name: string;
  job: string;
}

const SocialMedias = [
  { href: "https://github.com", svg: <GithubSVG /> },
  { href: "https://linkedin.com/in", svg: <LinkedinSVG /> },
];

const MemberCard: React.FC<IProps> = ({ profile, name, job }) => {
  return (
    <div className="bg-surface rounded-xl overflow-hidden">
      <div className="h-40 bg-gradient-to-r from-blue-400 to-indigo-500"></div>
      <div className="relative px-6 pb-6">
        <FallbackImage
          src={profile}
          alt={name}
          className="w-32 h-32 object-cover rounded-full mx-auto -mt-16 border-4 border-border shadow-md"
          fallbackSrc="https://via.placeholder.com/150"
        />
        <h3 className="text-xl font-bold text-center text-gray-800 dark:text-gray-100 mt-4 mb-2">
          {name}
        </h3>
        <p className="text-primary text-center font-medium mb-4">{job}</p>
        <div className="flex justify-center gap-4 mt-4">
          {SocialMedias.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition-all duration-300"
            >
              {item.svg}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MemberCard;
