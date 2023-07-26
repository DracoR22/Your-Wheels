import getCurrentUser from "@/app/actions/getCurrentUser";
import prismadb from "@/app/libs/prismadb";
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
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

        const vehicle = await prismadb.vehicle.create({
            data: {
                title,
                description,
                color,
                category,
                location,
                price: parseInt(price, 10),
                images: {
                    createMany: {
                        data: [
                            ...images.map((image: { url: string }) => image)
                        ]
                    }
                },
               userId: currentUser.id
            }
        })

        return NextResponse.json(vehicle)
    } catch (error) {
        console.log('[VEHICLES_POST]', error)
        return new NextResponse('Internal error', { status: 500 })
    }
}