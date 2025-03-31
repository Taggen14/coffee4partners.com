'use client'

import React from 'react'
import FormTemplate from '@/components/form-template';
import { usePathname } from 'next/navigation';
import content from "@/app/sv.json"
import { CldImage } from 'next-cloudinary';


const Contact = () => {
  const { title, description, contact } = content.contact
  const pathname = usePathname().slice(1);

  return (
    <div className='flex flex-col'>
      <h1>{title}</h1>
      <div className='flex flex-col md:flex-row gap-10 md:gap-5 p-0 md:p-10'>
        <div className='flex-1 space-y-5 p-5 md-p-0'>
          <p>{description}</p>
          <div className='flex flex-col'>
            <a href='tel:+46104406345' className='text-secondary-foreground font-bold'>{contact.phone}
              <span className='text-foreground font-normal hover:text-foreground/80 transition-colors duration-300'> 010-440 63 45</span>
            </a>
            <a href='mailto:???' className='text-secondary-foreground font-bold'>{contact.mail}
              <span className='text-foreground font-normal hover:text-foreground/80 transition-colors duration-300'> info@coffee4partner.se???</span>
            </a>
          </div>
        </div>
        <div className='md:flex-1 p-5 md-p-0'>
          <FormTemplate subject={pathname} />
        </div>
      </div>
      <div>
        <h2 className='text-center'>{contact.staffheader}</h2>
        <div className='flex justify-center py-10'>
          {contact.staffs.map((staff, i) => (
            <div key={i} className='flex flex-col w-fit bg-white p-1 rounded-lg shadow-lg'>
              <div className='relative h-48 w-auto'>
                <CldImage
                  src={staff.image.url}
                  alt={staff.image.alt}
                  fill
                  preserveTransformations
                  className='object-contain'
                />
              </div>
              <div className='flex flex-col items-center'>
                <span>{staff.worktitle}</span>
                <span>{staff.name}</span>
                <a className='hover:text-foreground/80 transition-colors duration-300' href={staff.mail.href}>{staff.mail.address}</a>
                <a className='hover:text-foreground/80 transition-colors duration-300' href={staff.phone.href}>{staff.phone.nr}</a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Contact