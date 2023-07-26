'use client'

import Image from "next/image";
import { useRouter } from "next/navigation";
import { SafeVehicle } from "../types";

interface VehiclesCardProps {
  vehicles: (SafeVehicle & { images: { url: string }[] })[] | null;
}

const VehiclesCard: React.FC<VehiclesCardProps> = ({ vehicles }) => {

const router = useRouter()

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4
     xl:grid-cols-5 2xl:grid-cols-6 gap-8 cursor-pointer">
      {vehicles?.map((vehicle) => (
        <div key={vehicle.id} className="w-full flex-shrink-0 bg-white rounded-xl p-4"
         onClick={() => router.push(`vehicles/${vehicle.id}`)}>
          <div className="aspect-square relative w-full overflow-hidden rounded-xl">
            <Image alt="Vehicle" src={vehicle.images[0].url} fill
             className="object-cover w-full h-full hover:scale-110 transition" />
          </div>
          <div className="pt-4">
            <h1 className="font-bold text-xl pb-1 truncate">{vehicle.title}</h1>
            <hr className="pb-2" />
            <p className="text-neutral-700">{vehicle.location}</p>
            <h3 className="pt-2 font-semibold text-lg">Price</h3>
            <p className="pt-1 text-neutral-700">${vehicle.price} USD</p>
          </div>
        </div>
      ))}

    </div>
  );
};

export default VehiclesCard;
