'use client'

import React from "react";
import { Image as Images } from "@prisma/client";
import Image from "next/image";
import { SafeUser, SafeVehicle } from "@/app/types";
import { useRouter } from "next/navigation";

interface VehicleGalleryProps {
  vehicle: SafeVehicle & { user: SafeUser } & { images: Images[] } | null;
  currentUser?: SafeUser | null
}

const VehicleGallery: React.FC<VehicleGalleryProps> = ({ vehicle, currentUser }) => {

  const router = useRouter()

  if (!vehicle) {
    return null;
  }

  const mainImage = vehicle.images[0]?.url || "";
  const restImages = vehicle.images.slice(1);


  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <>
    <div className="flex flex-col gap-4 md:flex-row md:gap-0 mx-16 bg-white rounded-xl p-3">
      <div className="rounded-tl-xl" onClick={() => router.push(`/gallery/${vehicle.id}`)}>
        <Image src={mainImage} alt="Main"
         className="h-auto object-cover rounded-lg cursor-pointer"
         width={500} height={500} />
      </div>
      <div className="md:flex flex-col gap-4 md:gap-0 rounded-lg hidden">
        {restImages.map((image) => (
          <div key={image.id} className="px-4" 
          onClick={() => router.push(`/gallery/${vehicle.id}`)}>
            <Image
              src={image.url}
              alt="Rest"
              width='130'
              height='130'
              className="object-cover py-2 rounded-lg cursor-pointer"
            />
          </div>
        ))}
      </div>

      <div className="ml-[30px] mt-2">
        <div className="flex flex-col">
          <div>
            <p className="text-sm text-neutral-500 mb-2">
             Posted by <span className="font-semibold"> {vehicle.user.name} </span>
           <span className="pl-1"> At </span>{formatDate(vehicle.createdAt)}
            </p>
          </div>
          <h1 className="font-bold text-2xl">
          {vehicle.title}
          </h1>
          <p className="text-neutral-600 text-xl my-6">
           $ {vehicle.price} USD
          </p>

          <p>
          <span className="font-medium mr-2">
             Vehicle´s color:
             </span>
              <span className="text-neutral-500">
                {vehicle.color}
              </span>
          </p>

            <hr className="my-4"/>

          <p>
          <span className="font-medium mr-2">
             Vehicle´s location:
             </span>
              <span className="text-neutral-500">
                {vehicle.location}
              </span>
          </p>

             <hr className="my-4"/>

          <p className="">
           <span className="font-medium mr-2">
             Seller´s contact:
             </span>
              <span className="text-neutral-500">
                {vehicle.category}
              </span>
          </p>
        </div>
      </div>
    </div>
       
       <div className="mx-16 my-6 bg-white rounded-xl p-4">
         <div className="text-2xl font-bold my-2">
            About this vehicle: 
         </div>

         <div>
          <p>
            {vehicle.description}
          </p>
         </div>
       </div>
    </>
  );
};

export default VehicleGallery;