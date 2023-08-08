'use client'

import useRegisterModal from '@/app/hooks/useRegisterModal'
import axios from 'axios'
import React, { useCallback, useState } from 'react'
import { useForm, FieldValues, SubmitHandler } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import Heading from '../Heading'
import Input from '../inputs/Input'
import Modal from './Modal'
import { FcGoogle } from 'react-icons/fc'
import Button from '../Button'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import useLoginModal from '@/app/hooks/useLoginModal'
import { signIn } from 'next-auth/react'

const RegisterModal = () => {

 const registerModal = useRegisterModal()
 const loginModal = useLoginModal()
 const [isLoading, setIsLoading] = useState(false)

 const formSchema = z.object({
    email: z.string().email("Invalid email format").min(3),
    name: z.string().min(3),
    password: z.string().min(6)
 })

 const {register, handleSubmit, formState: {errors}} = useForm<FieldValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
        name: '', email: '', password: ''
    }
 })

 const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    axios.post('/api/register', data)
    .then(() => {
        toast.success('Registered!')
        registerModal.onClose()
        loginModal.onOpen()
    })
    .catch((error) => {toast.error('Invalid email or password')})
    .finally(() => {setIsLoading(false)})
 }

 const toggle = useCallback(() => {
  registerModal.onClose()
  loginModal.onOpen()
 }, [registerModal, loginModal])

 const bodyContent = (
    <div className='flex flex-col gap-4'>
      <Heading title='Welcome to Your Wheels' subtitle='Create your account'/>
      <Input type='email' id='email' label='Email' disabled={isLoading} register={register} errors={errors} required/>
      <Input id='name' label='Name' disabled={isLoading} register={register} errors={errors} required/>
      <Input id='password' label='Password' disabled={isLoading} register={register} errors={errors} required/>
    </div>
 )

 const footerContent = (
    <div className='flex flex-col gap-4 mt-3'>
    <hr />
     <Button outline label='Continue with Google' icon={FcGoogle} onClick={() => signIn('google')}/>
     <div className='text-neutral-500 text-center mt-4 font-light'>
       <div className='justify-center flex flex-row items-center gap-2'>
        <div>
          Already have an account?
        </div>
        <div className='text-neutral-800 cursor-pointer hover:underline' onClick={toggle}>
          Log in
        </div>
       </div>
     </div>
  </div>
 )

  return (
    <Modal disabled={isLoading} isOpen={registerModal.isOpen} title='Register' actionLabel='Continue'
    onClose={registerModal.onClose} onSubmit={handleSubmit(onSubmit)} body={bodyContent} 
    footer={footerContent}/>
  )
}

export default RegisterModal