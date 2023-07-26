import getVehicleById from "@/app/actions/getVehicleById"
import ClientOnly from "@/app/components/ClientOnly"
import VehicleClient from "./VehicleClient"
import getCurrentUser from "@/app/actions/getCurrentUser"


const VehiclePage = async ({params}: {params: {vehicleId?: string}}) => {

   const vehicle = await getVehicleById(params)
   const currentUser = await getCurrentUser()

  return (
   <ClientOnly>
     <VehicleClient vehicle={vehicle} currentUser={currentUser}/>
   </ClientOnly>
  )
}

export default VehiclePage