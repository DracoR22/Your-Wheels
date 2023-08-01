'use client'

import { z } from "zod"
import { useForm  } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod"
import Heading from "../components/Heading"
import { Form, FormControl, FormField, FormItem, FormMessage } from "../components/ui/form"
import ImageUpload from "../components/inputs/ImageUpload"
import { useEffect, useState } from "react"
import { Button } from "../components/ui/button"
import axios from "axios"
import { useRouter } from 'next/navigation'
import { toast } from "react-hot-toast"
import { Input } from "../components/inputs/FormInput"


const formSchema = z.object({
    title: z.string().min(1),
    description: z.string().min(1),
    color: z.string().min(1),
    category: z.string().min(1),
    location: z.string().min(1),
    price: z.coerce.number().min(1),
    images: z.object({ url: z.string() }).array(),
})

type VehicleFormValues = z.infer<typeof formSchema>

const VehiclePage = () => {

const [isLoading, setIsLoading] = useState(false)
const router = useRouter()
const [isMounted, setIsMounted] = useState(false);
 
  const form = useForm<VehicleFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
        title: '',
        description: '',
        color: '',
        category: '',
        location: '',
        price: 0,
        images: [],
       
    }
  })

  const onSubmit = async (data: VehicleFormValues) => {
    try {
        setIsLoading(true);
        await axios.post('/api/vehicles', data)
        router.refresh()
        router.push('/')
        toast.success('Post created!')
        
    } catch (error) {
        if(axios.isAxiosError(error)) {
          if(error.response?.status === 401) {
             toast.error('Please login first')
          } 

          if(error.response?.status === 400) {
            toast.error('Please fill all the fields')
         } 

        } else {
          toast.error('Something went wrong!')
        }
    } finally {
        setIsLoading(false)
    }
  }

  useEffect(() => {
    setIsMounted(true);
  }, []);
  
  if (!isMounted) {
    return null;
  }

  return (
    <div className="mx-10 bg-white p-6 rounded-xl">
       <Heading title="Post your vehicle" subtitle="Describe your vehicle"/>
       <hr className="my-4"/>
       <Form {...form}>
         <form className="space-y-8 w-full block" onSubmit={form.handleSubmit(onSubmit)} >
          <FormField control={form.control} name="images" render={({field}) => (
            <FormItem>
                <h1 className="mt-6 font-bold text-xl">
                    Upload an image of your vehicle
                </h1>
                <FormControl>
                    <ImageUpload 
                    value={field.value.map((image) => image.url)}
                    onChange={(url) => field.onChange([...field.value, { url }])}
                    onRemove={(url) => field.onChange([...field.value.filter((current) => current.url !== url)])}/>
                </FormControl>
            </FormItem>
          )}/>

         <div>
            <FormField control={form.control} name="title" render={({ field }) => (
                <FormItem>
                    <h1 className="mt-6 font-bold text-xl">
                      Vehicle:
                    </h1>
                    <FormControl>
                      <Input disabled={isLoading} placeholder="Title of your vehicle" {...field}/>
                    </FormControl>
                </FormItem>
            )}/>
         </div>

         <div>
            <FormField control={form.control} name="description" render={({ field }) => (
                <FormItem>
                    <h1 className="mt-6 font-bold text-xl">
                    Description of your vehicle
                    </h1>
                    <FormControl>
                    <Input disabled={isLoading} placeholder="Description of your vehicle" {...field}/>
                    </FormControl>
                </FormItem>
            )}/>
         </div>

         <div className="grid grid-cols-2 gap-4">
            <FormField control={form.control} name="color" render={({ field }) => (
                <FormItem>
                    <h1 className="mt-6 font-bold text-xl">
                      Color
                    </h1>
                    <FormControl>
                    <Input disabled={isLoading} placeholder="Color of your vehicle" {...field}/>
                    </FormControl>
                </FormItem>
            )}/>

             <FormField control={form.control} name="location" render={({ field }) => (
                <FormItem>
                    <h1 className="mt-6 font-bold text-xl">
                      Location
                    </h1>
                    <FormControl>
                    <Input disabled={isLoading} placeholder=" Location of your vehicle" {...field}/>
                    </FormControl>
                </FormItem>
            )}/>
         </div>

         <div>
            <FormField control={form.control} name="category" render={({ field }) => (
                <FormItem>
                    <h1 className="mt-6 font-bold text-xl">
                      Contact
                    </h1>
                    <FormControl>
                    <Input disabled={isLoading} placeholder="Contact of the seller" {...field}/>
                    </FormControl>
                </FormItem>
            )}/>
         </div>

         <div>
            <FormField control={form.control} name="price" render={({ field }) => (
                <FormItem>
                    <h1 className="mt-6 font-bold text-xl">
                      Price
                    </h1>
                    <FormControl>
                    <Input type="number" disabled={isLoading} placeholder="Price of your vehicle" {...field}/>
                    </FormControl>
                </FormItem>
            )}/>
         </div>

           <Button disabled={isLoading} type="submit" 
           className="mx-auto bg-sky-500 w-full hover:bg-sky-700 transition rounded-xl py-6">
              Submit
           </Button>
         </form>
       </Form>
    </div>
  )
}

export default VehiclePage