// Types
import type AboutUsInputProps from "@/types/about-us";

/**
 * About us input for contact us section
 *
 * @component
 * @param {AboutUsInputProps} props - Component props
 * @returns {JSX.Element} - Rendered about us input
 */

export default function Input({ id, placeholder, title, type, ...rest }: AboutUsInputProps) {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-sm font-medium text-text-secondary mb-1"
      >
        {title}
      </label>
      <input
        {...rest}
        type={type}
        id={id}
        className="w-full px-4 py-2 border border-border rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 text-text dark:placeholder-gray-400"
        placeholder={placeholder}
      />
    </div>
  );
}
