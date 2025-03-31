import React, { useState } from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { Path, useForm } from "react-hook-form"
import { z } from "zod"
import { formSchema } from '@/formSchema/form-schema'
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
import content from "@/app/sv.json"
import { Textarea } from './ui/textarea'
import { Check } from 'lucide-react'

interface FormTemplateProps {
    subject: string;
}

const FormTemplate = ({ subject }: FormTemplateProps) => {
    const { fields, submitButton } = content.components.form
    const [isSent, SetIsSent] = useState(false)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            phone: "",
            message: "",
        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log({ ...values, subject: subject })

        // SKICKA TILL MAIL

        form.reset()
        SetIsSent(true)
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                {fields.map((fieldData, i) => (
                    <div key={i}>
                        {fieldData.type === "textarea" ?
                            <FormField
                                control={form.control}
                                name={fieldData.name as Path<z.infer<typeof formSchema>>}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>{fieldData.label}</FormLabel>
                                        <FormControl>
                                            <Textarea className='h-32' {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )} />
                            :
                            <FormField
                                control={form.control}
                                name={fieldData.name as Path<z.infer<typeof formSchema>>}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>{fieldData.label}</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )} />
                        }
                    </div>
                ))}
                {
                    !isSent ?
                        <Button variant={'default'} type="submit">{submitButton.send}</Button>
                        :
                        <Button variant={'default'} type="submit" className='flex gap-1 bg-ring'><Check />{submitButton.sent}</Button>
                }
            </form>
        </Form>
    )
}

export default FormTemplate