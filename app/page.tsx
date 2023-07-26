import getCurrentUser from "./actions/getCurrentUser";
import getVehicles, { IVehiclesParams } from "./actions/getVehicles";
import ClientOnly from "./components/ClientOnly";
import Container from "./components/Container";
import Hero from "./components/Hero";
import VehiclesCard from "./components/VehiclesCard";

interface HomeProps {
  searchParams: IVehiclesParams
}

const HomePage = async ({searchParams}: HomeProps) => {

const vehicles = await getVehicles(searchParams)
const currentUser = await getCurrentUser()

  return (
  <ClientOnly>
    <Container>
        <Hero/>
        <div className="px-10 mt-12 mb-8">
           <h2 className="text-lg uppercase text-neutral-700">
            Recent posted vehicles
           </h2>
        </div>
        <VehiclesCard vehicles={vehicles} />
    </Container>
  </ClientOnly>
  );
};

export default HomePage;