'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai'
import MenuItem from './MenuItem'
import useRegisterModal from '@/app/hooks/useRegisterModal'
import useLoginModal from '@/app/hooks/useLoginModal'
import { SafeUser } from '@/app/types'
import { signOut } from 'next-auth/react'
import Avatar from '../Avatar'
import { useRouter } from 'next/navigation'

interface UserMenuProps {
  currentUser?: SafeUser | null
}

const UserMenu: React.FC<UserMenuProps> = ({currentUser}) => {

const [isOpen, setIsOpen] = useState(false)
const registerModal = useRegisterModal()
const loginModal = useLoginModal()
const router = useRouter()
const menuRef = useRef<HTMLDivElement>(null)

const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value)
}, [])

//Close menu when click outside
const closeMenu = useCallback(() => {
  setIsOpen(false)
}, [])

useEffect(() => {
  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      closeMenu()
    }
  }

  document.addEventListener('click', handleClickOutside)
  return () => {
    document.removeEventListener('click', handleClickOutside)
  }
}, [closeMenu])



  return (
    <>
    <div className="relative" ref={menuRef}>
        <div className="flex flex-row items-center gap-3">
           
           {currentUser ? (
            <>
           <button className="hidden md:block py-3 px-4 rounded-full border
             bg-sky-500 hover:bg-sky-600 transition text-white font-medium"
              onClick={() => router.push('/vehicles')}>
             Post your vehicle
           </button>
           <div onClick={toggleOpen} className='cursor-pointer ml-2'>
           <Avatar src={currentUser?.image}/>
           </div>
           {isOpen && (
            <div className='absolute right-0 top-20 w-[40vh] rounded-md bg-white overflow-hidden 
           text-sm'>
              <div className='flex flex-col cursor-pointer'>
                 <p className='p-4 font-semibold'>
                  User: <span className='text-neutral-500 pl-2'>{currentUser.name}</span> 
                 </p>
                <hr />
                <MenuItem onClick={() => router.push('/your-vehicles')} label='My vehicles'/>
                <hr />
                <MenuItem onClick={() => router.push('/vehicles')} label='Post my vehicle'/>
                <hr />
                <MenuItem onClick={() => signOut()} label='Log Out'/>
                  </div>
                  </div>
                )}
            </>
           ) : (
            <>
           <div className="hidden md:block cursor-pointer px-4" onClick={loginModal.onOpen}>
            <p className="text-neutral-700 text-sm hover:text-black font-medium">
              Log In
            </p>
           </div>
 
           <button className="hidden md:block py-3 px-4 rounded-full border
            bg-sky-500 hover:bg-sky-600 transition text-white font-medium" 
            onClick={loginModal.onOpen}>
             Post your vehicle
           </button>
           </>
           )}

        </div>

       
    </div>

   
    </>
  )
}

export default UserMenu