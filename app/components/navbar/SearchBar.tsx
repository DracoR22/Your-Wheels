'use client'

import { useCallback, useEffect, useRef, useState } from "react"
import { useQuery } from '@tanstack/react-query'
import axios from "axios"
import { Prisma, Vehicle } from "@prisma/client"
import debounce from 'lodash.debounce'
import { usePathname, useRouter } from "next/navigation"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "../ui/command"
import { Car } from "lucide-react"
import { useOnClickOutside } from "@/app/hooks/useOnClickOutside"

const SearchBar = () => {

const [input, setInput] = useState<string>('')
const [isMounted, setIsmounted] = useState(false)
const commandRef = useRef<HTMLDivElement>(null)
const router = useRouter()
const pathname = usePathname()

const {data: queryResults, refetch, isFetched, isFetching} = useQuery({
  queryFn: async () => {
    if(!input) return []
    const {data} = await axios.get(`/api/search?q=${input}`)
    return data as (Vehicle & {
      _count: Prisma.VehicleCountOutputType
    })[]
  },
  queryKey: ['search-query'],
  enabled: false
})

const request = debounce(async () => {
  refetch()
}, 300)

const debounceRequest = useCallback(() => {
  request()
}, [request])


useOnClickOutside(commandRef, () => {
  setInput('')
})


useEffect(() => {
 setInput('')
}, [pathname])

useEffect(() => {
  setIsmounted(true)
}, [])

if(!isMounted) return null


  return (
  <Command ref={commandRef}
  className="relative rounded-full border max-w-lg z-50 overflow-visible bg-white
  outline-none border-neutral-300 focus:border-none focus:outline-none ring-0">
     <CommandInput value={input}
      onValueChange={(text) => {setInput(text); debounceRequest()}}
      className="outline-none border-none focus:border-none focus:outline-none ring-0"
      placeholder="Search for vehicles"/>

      {input.length > 0 ? (
        <CommandList className="absolute bg-white top-full inset-x-0 rounded-b-lg text-black">
           {isFetched && <CommandEmpty>No results found.</CommandEmpty>}
           {(queryResults?.length ?? 0) > 0 ? (
             <CommandGroup heading='Vehicles'>
               {queryResults?.map((vehicle) => (
                <CommandItem 
                 onSelect={(e) => {router.push(`/vehicles/${vehicle.id}`); router.refresh()}}
                  key={vehicle.id} value={vehicle.title} className="text-black">
                    <Car className="mr-2 h-4 w-4"/>
                    <a href={`/vehicles/${vehicle.id}`}>{vehicle.title}</a>
                </CommandItem>
               ))}
             </CommandGroup>
           ) : null}
       </CommandList>
      ) : null}
  </Command>
  )}

export default SearchBar