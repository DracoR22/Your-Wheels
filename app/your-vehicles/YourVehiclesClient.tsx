'use client'

import { useRouter } from "next/navigation";
import { SafeUser, SafeVehicle } from "../types";
import { useCallback, useState } from "react";
import Container from "../components/Container";
import Heading from "../components/Heading";
import EditVehiclesCard from "../components/EditVehiclesCard";
import axios from "axios";
import { toast } from "react-hot-toast";

interface YourVehiclesClientProps {
  vehicles: (SafeVehicle & { images: { url: string }[] })[] | null;
  currentUser?: SafeUser | null;
}

const YourVehiclesClient: React.FC<YourVehiclesClientProps> = ({ vehicles, currentUser }) => {

  const router = useRouter();
  const [deletingId, setDeletingId] = useState('');

  const onCancel = useCallback((id: string) => {
    setDeletingId(id)
  
    axios.delete(`api/vehicles/${id}`)
    .then(() => {toast.success('Vehicle deleted');
     router.refresh()})
     .catch(() => {toast.error('Could not delete your vehicle')})
     .finally(() => {setDeletingId('')}) 
   }, [router])

  return (
    <Container>
      <Heading title="Your vehicles" subtitle="List of your vehicles" />
      <div className="my-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4
       xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {vehicles?.map((vehicle) => (
          <div key={vehicle.id}>
            <EditVehiclesCard
              vehicles={vehicle} // Pass a single vehicle, not an array
              actionLabel="Delete vehicle"
              onAction={onCancel}
              actionId={vehicle.id}
            />
          </div>
        ))}
      </div>
    </Container>
  );
};

export default YourVehiclesClient;