import { ReactNode } from "react"

export const DarkButton = ({ children, onClick, size = "small" }: {
    children: ReactNode,
    onClick: () => void,
    size?: "big" | "small"
}) => {
    return <div onClick={onClick} className={`flex justify-center font-semibold px-8 py-2 cursor-pointer hover:shadow-md bg-purple-800 text-white rounded text-center`}>
            <div className="pr-1 py-0.5">
                <AddSymbol /> 
            </div>
            {children}
    </div>
}

function AddSymbol() {
    return <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="3" stroke="currentColor" className="size-5">
  <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
</svg>

}