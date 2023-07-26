import getCurrentUser from "../actions/getCurrentUser"
import getVehicles from "../actions/getVehicles"
import ClientOnly from "../components/ClientOnly"
import EmptyState from "../components/EmptyState"
import YourVehiclesClient from "./YourVehiclesClient"


const YourVehiclesPage = async () => {

  const currentUser = await getCurrentUser()

  if(!currentUser) {
    return (
        <ClientOnly>
            <EmptyState title="Unauthorized" subtitle="Please login"/>
        </ClientOnly>
    )
  }

  const vehicles = await getVehicles({ userId: currentUser.id })

  if(vehicles.length === 0) {
    return (
        <ClientOnly>
            <EmptyState title="No vehicles found" subtitle="Looks like you have no vehicles posted"/>
        </ClientOnly>
    )
  }

  return (
    <ClientOnly>
        <YourVehiclesClient vehicles={vehicles} currentUser={currentUser}/>
    </ClientOnly>

  )
}

export default YourVehiclesPage