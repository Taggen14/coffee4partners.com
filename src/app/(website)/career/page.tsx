"use client";

import React from "react";
import content from "@/app/sv.json";
import FormTemplate from "@/components/website/form-template";
import { usePathname } from "next/navigation";

const Career = () => {
  const { title, subTitle, descriptions } = content.career;
  const pathname = usePathname().slice(1);
  return (
    <div>
      <h1>{title}</h1>
      <div className="flex flex-col md:flex-row gap-10 md:gap-5 p-0 md:p-10">
        <div className="flex-1 space-y-5 p-5 md-p-0">
          <h2>{subTitle}</h2>
          {descriptions.map((d, i) => (
            <p key={i}>{d}</p>
          ))}
        </div>
        <div className="md:flex-1 p-5 md-p-0">
          <FormTemplate subject={pathname} />
        </div>
      </div>
    </div>
  );
};

export default Career;
