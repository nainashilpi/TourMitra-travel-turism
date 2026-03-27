import Image from "next/image";

type ButtonProps={
    type:'button' | 'submit';
    title:string;
    icon?:string;
    variant:'btn_dark_green'
}

const Button = ({type, title,icon, variant}: ButtonProps) => {
  return (
    <button type={type} className="flex item-center justify-center gap-3 rounded-full border  px-3 py-3 t text-white transition-all bg-gradient-to-r from-orange-500 to-[#111827] text-[12px] hover:bg-black hover:text-[13px] ">
        {icon && <Image src={icon} alt={title} width={15} height={15} />}
        <label className="bold-16 whitespace-nowrap">{title}</label>
    </button>
  )
}

export default Button