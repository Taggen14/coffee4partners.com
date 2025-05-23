import BackButton from '@/components/back-button'
import { SignIn } from '@clerk/nextjs'

export default function Page() {
    return (
        <div className='flex flex-col gap-10 items-center justify-center h-screen'>
            <SignIn />
            <BackButton />
        </div>
    )
}