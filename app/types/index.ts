import { User, Vehicle } from '@prisma/client'

export type SafeUser = Omit<User, 'createdAt' | 'updatedAt' | 'emailVerified'> &  {
    createdAt: string
    updatedAt: string
    emailVerified: string | null
}

export type SafeVehicle = Omit<Vehicle, 'createdAt'> & {
    createdAt: string
}