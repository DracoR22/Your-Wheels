import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";
import prismadb from '@/app/libs/prismadb'

export async function DELETE(req: Request, {params}: {params: {vehicleId: string}}) {

    const currentUser = await getCurrentUser()
    if(!currentUser) {
        return new NextResponse('Unauthorized', {status: 400})
    }

    if(!params.vehicleId || typeof params.vehicleId !== 'string') {
        return new NextResponse('Listing ID is required', {status: 401})
    }

    const listing = await prismadb.vehicle.deleteMany({
        where: {
            id: params.vehicleId,
            userId: currentUser.id
        }
    })

    return NextResponse.json(listing)
}