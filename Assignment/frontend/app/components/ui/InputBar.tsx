import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function InputWithButton({changeHandler, valueText} : any) {
  return (
    <div className=" w-full max-w-lg items-center space-x-2">
      <Input value={valueText} onChange={changeHandler} type="text" placeholder="Input Data" className="border-2 border-red-900 focus:ring-0  border-solid"/>
    </div>
  )
}
