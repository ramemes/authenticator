import { LoaderCircle } from "lucide-react";
import Image from "next/image";

export const Loading = () => {
  return (
    <div className="h-full w-full flex flex-col
    justify-center items-center">
      <LoaderCircle className="h-6 w-6 text-muted-foreground animate-spin"
        
      />
    </div>
  )
}