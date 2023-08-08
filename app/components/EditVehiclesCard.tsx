'use client'

import Image from "next/image";
import { useRouter } from "next/navigation";
import { SafeUser, SafeVehicle } from "../types";
import Button from "./Button";
import { useCallback } from "react";

interface VehiclesCardProps {
  vehicles: SafeVehicle & { images: { url: string }[] };
  currentUser?: SafeUser | null
  onAction?: (id: string) => void
  actionLabel?: string
  actionId?: string
}

const EditVehiclesCard: React.FC<VehiclesCardProps> = ({ vehicles, onAction,
   actionId = '', actionLabel }) => {

const router = useRouter()

const handleCancel = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()

    onAction?.(actionId)
 }, [onAction, actionId]
 )

  return (
    <div className="cursor-pointer">
      
        <div className="w-full flex-shrink-0 bg-white rounded-xl p-4">
          <div className="aspect-square relative w-full overflow-hidden rounded-xl">
            <Image alt="Vehicle" src={vehicles.images[0].url} fill
             className="object-cover w-full h-full" onClick={() => router.push(`vehicles/${vehicles.id}`)}/>
          </div>
          <div className="pt-4">
            <h1 className="font-bold text-xl pb-1 truncate">{vehicles.title.charAt(0).toUpperCase() + vehicles.title.slice(1)}</h1>
            <hr className="pb-2" />
            <p className="text-neutral-700">{vehicles.location}</p>
            <h3 className="pt-2 font-semibold text-lg">Price</h3>
            <p className="py-1 text-neutral-700">${vehicles.price} USD</p>

            {onAction && actionLabel && (
              <>
              <Button small label={actionLabel} onClick={handleCancel}/>
              <hr className="my-2"/>
              <Button small label='Edit your vehicle information' onClick={() => router.push(`/edit-vehicles/${vehicles.id}`)}/>
              </>
            )}
          </div>
        </div>
      
  
    </div>
  );
};

export default EditVehiclesCard;
