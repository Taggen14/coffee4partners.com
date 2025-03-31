'use client'

import { CldImage } from 'next-cloudinary'
import React from 'react'
import content from "@/app/sv.json"

const Service = () => {
  const { title, services, image } = content.service

  return (
    <div className=''>
      <h1>{title}</h1>
      <div className='flex flex-col md:flex-row gap-10 md:gap-5 p-0 md:p-10'>
        <div className='flex-1 space-y-5 p-5 md-p-0'>
          {services.map((service, i) => (
            <div key={i}>
              <h2>{service.title}</h2>
              <span>{service.tagLine}</span>
              <p>{service.description}</p>
            </div>
          ))}
        </div>
        <div className='md:flex-1 relative w-full h-72'>
          <CldImage
            src={image.url}
            alt={image.alt}
            fill
            preserveTransformations
            className='object-contain'
          />
        </div>
      </div>
    </div>
  )
}

export default Service