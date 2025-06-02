"use client"

import BackButton from '@/components/back-button'
import { Button } from '@/components/ui/button'
import { SignIn } from '@clerk/nextjs'
import { redirect } from 'next/navigation'

export default function Page() {
    return (
        <div className='flex flex-col gap-10 items-center justify-center h-screen'>
            <SignIn />
            <div className='border flex flex-col items-center p-8 gap-5 shadow-xl border-gray-200 rounded-lg'>
                <div className='flex flex-col items-center gap-1'>
                    <p>Är du inte redan kund hos oss?</p>
                    <Button
                        variant={"secondaryInverted"}
                        onClick={() => redirect("create-account")}
                    >
                        Bli kund
                    </Button>
                </div>
                <BackButton />
            </div>
        </div>
    )
}