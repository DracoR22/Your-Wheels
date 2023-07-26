'use client'

import Image from "next/image"
import { useRouter } from "next/navigation"

const Logo = () => {

const router = useRouter()

  return (
   <div className="hidden lg:flex items-center cursor-pointer" onClick={() => router.push('/')}>
      <Image alt="Logo" src='/car.png'
     height='70' width='70'/>
     <h1 className="font-bold text-xl pl-[13px]">
       Your Wheels
     </h1>
   </div>
  )
}

export default Logo