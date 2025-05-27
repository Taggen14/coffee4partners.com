"use client"

import { Button } from '@/components/ui/button'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import Image from 'next/image'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Input } from '@/components/ui/input'

const roleSchema = z.object({
    companyName: z.string().min(1, "Du behöver ange ditt företagsnamn"),
    name: z.string().min(1, "Du behöver ange ditt namn"),
    lastName: z.string().optional(),
    email: z.string().email("Måste vara en giltig e-post!"),
})

type RoleFormValues = z.infer<typeof roleSchema>

export default function CreateAccount() {
    const form = useForm<RoleFormValues>({
        resolver: zodResolver(roleSchema),
        defaultValues: {
            companyName: '',
            name: '',
            lastName: '',
            email: '',
        },
    })

    function onSubmit(data: RoleFormValues) {

    }

    return (
        <div className="flex items-center justify-center py-10">
            <div className="flex flex-col items-center gap-5 bg-white justify-center px-8 py-10 shadow-lg rounded-lg border border-gray-200 w-full max-w-sm">
                <h1 className="text-2xl font-semibold p-0">Bli kund</h1>
                <Image src="/logo.png" alt="Coffee4partners logotyp" width={270} height={33} priority />
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="w-full flex flex-col gap-6">
                        <FormField
                            control={form.control}
                            name="companyName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Företags namn*</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Namn*</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="lastName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Efternamn</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>E-post*</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" variant="default" className="w-full">
                            Nästa
                        </Button>
                    </form>
                </Form>
            </div>
        </div>
    )
}
