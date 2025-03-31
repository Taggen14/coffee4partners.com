'use client'

import React from 'react'
import content from "@/app/sv.json"
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { CldImage } from 'next-cloudinary'

const Home = () => {
    const { machines, descriptions, partnersLogos, shopLinksTitle, shopProductLinks, serviceLink } = content.landingPage
    return (
        <div className='p-0 py-10 sm:p-8 flex flex-col gap-10'>
            <div className='flex flex-wrap gap-4 justify-center'>
                {machines.map((machine, i) => (
                    <Link key={i} href={machine.cta.href} className="relative w-full sm:max-w-[300px] h-96 border p-4 flex flex-col justify-end overflow-hidden shadow-sm">
                        <CldImage
                            src={machine.image.url}
                            alt={machine.image.alt}
                            fill
                            className='object-cover'
                        />
                        <div className="absolute inset-0 bg-black opacity-20"></div>
                        <div className="relative z-10 space-y-2">
                            <h2 className='text-background'>{machine.title}</h2>
                            <p className='text-sm text-background'>{machine.description}</p>
                            <Button variant={'secondaryInverted'}>
                                {machine.cta.text}
                            </Button>
                        </div>
                    </Link>
                ))}
            </div>
            <div className='flex flex-col gap-4'>
                {descriptions.map((d, i) => (
                    <p key={i} className='text-center'>{d}</p>
                ))}
            </div>
            {/* PARTNERS LOGOS */}
            <div className='flex gap-4 flex-wrap justify-center'>
                {partnersLogos.map((logo, i) => (
                    <div key={i} className='relative w-48 h-48'>
                        <CldImage
                            src={logo.image.url}
                            alt={logo.image.alt}
                            fill
                            preserveTransformations
                            className='object-contain'
                        />
                    </div>
                ))}
            </div>
            {/* SHORT LINKS TO WEBSHOP */}
            <div>
                <h2 className='text-center py-10'>{shopLinksTitle}</h2>
                <div className='flex gap-4 flex-wrap justify-center'>
                    {shopProductLinks.map((product, i) => (
                        <Link key={i} href={product.href}>
                            <div key={i} className='relative w-48 h-48 group overflow-hidden'>
                                <CldImage
                                    src={product.image.url}
                                    alt={product.image.alt}
                                    fill
                                    preserveTransformations
                                    className='object-cover group-hover:scale-110 transition-transform ease-in-out duration-500'
                                />
                                <div className="absolute inset-0 bg-black opacity-30 group-hover:opacity-20 transition-opacity ease-in-out duration-300"></div>
                                <p className='text-background text-xl relative z-10 flex justify-center items-center h-full'>{product.title}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
            {/* SHORT LINK TO SERVICE */}
            <div className='relative w-full h-[700px] sm:h-[500px] p-5 flex items-end lg:items-center'>
                <CldImage
                    src={serviceLink.image.url}
                    alt={serviceLink.image.alt}
                    fill
                    preserveTransformations
                    className='object-cover'
                />
                <div className='flex flex-col z-10 relative bg-background lg:w-1/3 gap-2 p-4 h-fit'>
                    <h3>{serviceLink.title}</h3>
                    <span>{serviceLink.tagline}</span>
                    <p>{serviceLink.description}</p>
                    <Button className='w-fit'>
                        <Link href={serviceLink.cta.href}>{serviceLink.cta.text}</Link>
                    </Button>
                </div>
            </div>
        </div>

    )
}

export default Home