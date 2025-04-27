// Types for type safety
import ButtonProps from "@/types/auth"

export default function Button({ text }: ButtonProps) {
    return (
        <button type="submit" className='w-[100%] max-[600px]:h-[56px] h-[48px] cursor-pointer bg-[#586CFF] rounded-[16px] text-white font-bold text-[18px] hover:bg-[#3b5fc9] transition-all'>
            {text}
        </button>
    )
}