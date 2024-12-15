"use client"
import LoginWithGoogle from '@/api/auth/login-google.api'
import { CredentialResponse, GoogleLogin } from '@react-oauth/google'
import { useRouter } from 'next/navigation'
import React from 'react'
import toast from 'react-hot-toast'

export default function GoogleAuthButton({context}:{context?:("signin"|"signup")}) {
  const router = useRouter()
  async function onSuccess(res:CredentialResponse){
    if(res.credential){
      await LoginWithGoogle(res.credential)
      toast.success("Logged in successfully")
      router.push("/")
    }
  }

  function onError(){
    toast.error("An error occured try again later")
  }
  return (

    <div className="w-full">
    <GoogleLogin  shape='rectangular' width={377} context={context||'signin'}  onSuccess={onSuccess} onError={onError} />
    </div>
  )
}