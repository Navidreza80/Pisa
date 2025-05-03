interface InputProps {
  id: string;
  placeholder: string;
  title: string;
  type: string;
}

function Input({ id, placeholder, title, type }: InputProps) {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
      >
        {title}
      </label>
      <input
        type={type}
        id={id}
        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
        placeholder={placeholder}
      />
    </div>
  );
}

export default Input;
