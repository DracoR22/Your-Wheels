'use client'

import { SafeUser, SafeVehicle } from "@/app/types";
import { Image as Images } from "@prisma/client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {AiOutlineArrowLeft} from "react-icons/ai";

interface GalleryProps {
    vehicle: SafeVehicle & { user: SafeUser } & { images: Images[] } | null;
}

const Gallery: React.FC<GalleryProps> = ({vehicle}) => {

    const mainImage = vehicle?.images[0]?.url || "";
    const restImages = vehicle?.images.slice(1);
    const router = useRouter()

  return (
    <div className="flex flex-col gap-4 md:flex-row md:gap-0 rounded-xl p-3">

      <div className="-mt-[38px] cursor-pointer bg-white rounded-full p-4"
       onClick={() => router.back()}>
          <AiOutlineArrowLeft size={35}/>
      </div>

      <div className="absolute right-0 left-0 mt-8 mx-[100px]">
        <Image src={mainImage} alt="Main"
         className="h-auto w-full object-cover rounded-lg"
         width={600} height={500}/>

         {restImages?.map((image) => (
          <div key={image.id}>
            <Image
              src={image.url}
              alt="Rest"
              width={600} height={500}
              className="object-cover py-2 rounded-lg h-auto w-full"
            />
          </div>
           ))}

      </div>
    </div>
  )
}

export default Gallery