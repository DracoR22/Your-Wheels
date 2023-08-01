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



export async function PATCH(req: Request, {params}: {params: {vehicleId: string}}) {

   try {

    const currentUser = await getCurrentUser()
    const body = await req.json()

    const {title, description, color, category, location, price, images} = body

    
    if(!currentUser) {
        return new NextResponse('Unauthenticated', { status: 401 })
    }

    if(!title) {
        return new NextResponse('Title is required', { status: 400 })
    }

    if(!description) {
        return new NextResponse('Description is required', { status: 400 })
    }

    if(!color) {
        return new NextResponse('Color is required', { status: 400 })
    }

    if(!category) {
        return new NextResponse('Category is required', { status: 400 })
    }

    if(!location) {
        return new NextResponse('Location is required', { status: 400 })
    }

    if(!price) {
        return new NextResponse('Price is required', { status: 400 })
    }

    if(!images || !images.length) {
        return new NextResponse('Images is required', { status: 400 })
    }

    await prismadb.vehicle.update({
        where: {
            id: params.vehicleId
        },
        data: {
            title,
            description,
            color,
            category,
            location,
            price,
            images: {
                deleteMany: {}
            }
        }
    })


    const product = await prismadb.vehicle.update({
        where: {
            id: params.vehicleId
        },
        data: {
            images: {
                createMany: {
                    data: [
                        ...images.map((image: { url: string }) => image)
                    ]
                }
            }
        }
    })


    return NextResponse.json(product)
   } catch (error) {
    console.log('[VEHICLE_PATCH]', error)
        return new NextResponse('Internal error', {status: 500})
   }

}