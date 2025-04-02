"use client";

import React from "react";
import content from "@/app/sv.json";
import { CldImage } from "next-cloudinary";

const About = () => {
  const { title, descriptions, image } = content.about;

  return (
    <div className="">
      <h1>{title}</h1>
      <div className="flex flex-col md:flex-row gap-10 md:gap-5 p-0 md:p-10">
        <div className="flex-1 space-y-5 p-5 md-p-0">
          {descriptions.map((d, i) => (
            <p key={i}>{d}</p>
          ))}
        </div>
        <div className="md:flex-1 relative w-full h-72">
          <CldImage
            src={image.url}
            alt={image.alt}
            fill
            preserveTransformations
            className="object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default About;
