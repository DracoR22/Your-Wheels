import getVehicleById from "@/app/actions/getVehicleById"
import Gallery from "./Gallery"


const GalleryPage = async ({params}: {params: {vehicleId: string}}) => {

const vehicle = await getVehicleById(params)

  return (
    <div>
      <Gallery vehicle={vehicle}/>
    </div>
  )
}

export default GalleryPage