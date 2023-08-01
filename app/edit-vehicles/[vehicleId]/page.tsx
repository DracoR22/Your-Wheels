import EditVehiclePage from "./components/Edit"
import getVehicleById from "@/app/actions/getVehicleById"


const EditHome = async ({params}: {params: {vehicleId: string}}) => {

const vehicle = await getVehicleById(params)

  return (
    <>
    <EditVehiclePage vehicle={vehicle}/>
    </>
  )
}

export default EditHome