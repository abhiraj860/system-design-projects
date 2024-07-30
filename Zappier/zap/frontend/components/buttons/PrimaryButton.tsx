import { ReactNode } from "react"

export const PrimaryButton = ({ children, onClick, size = "small" }: {
    children: ReactNode,
    onClick: () => void,
    size?: "big" | "small"
}) => {
    return <div onClick={onClick} className={`${size === "small" ? "text-sm" : "text-xl"} ${size === "small" ? "px-8 py-2" : "px-14 py-2"} cursor-pointer hover:shadow-md bg-amber-700  border text-white rounded-full text-center flex justify-center flex-col border-amber-700`}>
        {children}
    </div>
}