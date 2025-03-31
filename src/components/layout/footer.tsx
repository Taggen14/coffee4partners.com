'use client'

import React from 'react'
import { CldImage } from "next-cloudinary";
import content from "@/app/sv.json"
import { Check, Instagram, Mail } from 'lucide-react';
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { newsletterForm } from '@/formSchema/newsletter-form';

const Footer = () => {
    const { newsLetterTitle, newsLetterInputPlaceholder, newsLetterSubscribButton, contact, usps } = content.layout.footer

    const form = useForm<z.infer<typeof newsletterForm>>({
        resolver: zodResolver(newsletterForm),
        defaultValues: {
            email: "",
        },
    })

    function onSubmit(values: z.infer<typeof newsletterForm>) {
        console.log('onSubmit')
        // läggtill values.mail till nyhetsbrev
        console.log(values)
        form.reset()
    }
    return (
        <footer>
            <div className='flex items-start justify-center gap-5 p-5 sm:p-10 flex-wrap'>
                {usps.map((usp, i) => (
                    <div key={i} className='flex flex-col justify-center items-center gap-2 flex-1 min-w-[300px] max-w-[500px]'>
                        <h3 className='text-secondary-foreground flex font-bold gap-1'><Check />{usp.title}</h3>
                        <p className='text-center'>{usp.description}</p>
                    </div>
                ))}
            </div>
            <div className='bg-secondary text-secondary-foreground flex flex-col gap-10 py-5'>
                <div className='flex flex-col md:flex-row gap-5 items-center md:items-start justify-evenly'>
                    <div>
                        <CldImage
                            src={`https://res.cloudinary.com/CLOUD_NAME/image/upload/v1743062927/coffee4partners_logotyp_x36_2x_m2lkv8.png`}
                            alt={`coffee4partners logo`}
                            width={300}
                            height={300}
                            preserveTransformations
                        />
                    </div>
                    <div className='flex flex-col'>
                        <span>{newsLetterTitle}</span>
                        <div>
                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(onSubmit)} className="flex">
                                    <FormField
                                        control={form.control}
                                        name={"email"}
                                        render={({ field }) => (
                                            <FormItem className='flex-grow'>
                                                <FormLabel />
                                                <FormControl>
                                                    <Input
                                                        {...field}
                                                        className='border-none focus-visible:ring-0 p-0'
                                                        type="text"
                                                        placeholder={newsLetterInputPlaceholder} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <Button className='bg-secondary text-secondary-foreground p-0 cursor-pointer w-24 justify-end hover:bg-secondary hover:text-secondary-foreground/80 transition-colors duration-300' type='submit'>
                                        {form.watch("email") ?
                                            <span className='text-sm'>{newsLetterSubscribButton}</span>
                                            : <Mail style={{ width: '1.5rem', height: '1.5rem' }} />
                                        }
                                    </Button>
                                </form>
                                <div className='bg-secondary-foreground h-[2px] w-full' />
                            </Form>
                        </div>
                    </div>
                    <div className='flex flex-col'>
                        <a className='hover:text-secondary-foreground/80 transition-colors duration-300' href='tel:+46104406345'>{contact.tele}: 010-440 63 45</a>
                        <a className='hover:text-secondary-foreground/80 transition-colors duration-300' href='mailto:sebastian@coffee4partners.com'>{contact.mail}: info@coffee4partners.com???</a>
                        <a className='hover:text-secondary-foreground/80 transition-colors duration-300 mt-2' href='https://www.instagram.com/coffee4partners/' target='_blank'><Instagram /></a>
                    </div>
                </div>
                <div className='self-center text-xs'>
                    <span>&copy; 2025 Coffee4partners</span>
                </div>
            </div>
        </footer>
    )
}

export default Footer