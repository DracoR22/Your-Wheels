import prismadb from "../libs/prismadb"

interface IParams {
    vehicleId?: string
}

const getVehicleById = async (params: IParams) => {
    try {
        const {vehicleId} = params

        const vehicle = await prismadb.vehicle.findUnique({
            where: {
                id: vehicleId
            },
            include: {
                user: true,
                images: true
            }
          })

          if(!vehicle) {
            return null
          }

          return {...vehicle, createdAt: vehicle.createdAt.toISOString(),
            user: {
           ...vehicle.user,
           createdAt: vehicle.user.createdAt.toISOString(),
           updatedAt: vehicle.user.updatedAt.toISOString(),
           emailVerified: vehicle.user.emailVerified?.toISOString() || null
          }}
    } catch (error: any) {
        throw new Error(error)
    }
}

export default getVehicleById