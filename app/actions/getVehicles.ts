import prismadb from "../libs/prismadb"

export interface IVehiclesParams {
    userId?: string
    title?: string
    description?: string
    color?: string
    category?: string
    images?: { url: string }[];
    location?: string
    price?: number
}

const getVehicles = async (params: IVehiclesParams) => {
    try {

        const {userId, title, description, color, category, location, price, images} = params

        let query: any = {}

        if(userId) {
            query.userId = userId
        }

        if(title) {
            query.title = title
        }

        if(description) {
            query.description = description
        }

        if(color) {
            query.color = color
        }

        if(category) {
            query.category = category
        }

        if(location) {
            query.location = location
        }

        if(price) {
            query.price = price
        }

        const vehicles = await prismadb.vehicle.findMany({
            where: query,
            orderBy: {
              createdAt: 'desc'
            },
            include: {
              images: true
            }
          });

          // Map the returned vehicles to the SafeVehicle type
          const safeVehicles = vehicles.map((vehicle) => ({
            ...vehicle,
            createdAt: vehicle.createdAt.toISOString(),
            images: vehicle.images.map((image) => ({ url: image.url })),
          }));
      
          return safeVehicles;
    } catch (error: any) {
        throw new Error(error)
    }
}

export default getVehicles