import React, { type ReactNode } from "react";
import type { StaticImageData } from "next/image";
import { Globe, Share2 } from "lucide-react";

/* Local types (kept in this file for simplicity) */
export interface Affiliation {
  name: string;
  url?: string;
}

export interface ContactInfo {
  address?: string;
  email?: string;
  officePhone?: string;
  mobilePhone?: string;
  appointmentUrl?: string;
}

export interface SocialLink {
  url: string;
  icon?: ReactNode; // React.createElement(Globe) etc.
  label?: string;
}

export interface AdvisorInfo {
  name: string;
  englishName?: string;
  image?: StaticImageData | string;
  affiliations?: Affiliation[];
  contact?: ContactInfo;
  socialLinks?: SocialLink[];
}

export const advisorInfo: AdvisorInfo = {
  // Advisor name translated to English
  name: "Dr. Suradet Jitprapaikulsarn",
  englishName: "DR. Suradet Jitprapaikulsarn",
  // use public image path (or change to imported StaticImageData if you prefer)
  image: "/images/Advisor.jpeg",
  affiliations: [
    {
      name: "Department of Electrical and Computer Engineering (ECPE)",
      url: "https://ecpe.nu.ac.th",
    },
    {
      name: "Faculty of Engineering",
      url: "http://www.eng.nu.ac.th/eng2022/index.php",
    },
    {
      name: "Naresuan University",
      url: "https://www.nu.ac.th/",
    },
  ],
  contact: {
    address:
      "99 Moo 9, Tha Pho Subdistrict, Mueang Phitsanulok District, Phitsanulok 65000, Thailand",
    email: "suradet.j@gmail.com / suradet@nu.ac.th",
    officePhone: "055-96-4391",
    mobilePhone: "089-451-8144",
    appointmentUrl: "http://tinyurl.com/SJ-appointment",
  },
  socialLinks: [
    {
      url: "https://www.facebook.com/suradetj",
      // lucide doesn't include brand Facebook; use a neutral/share icon instead
      icon: React.createElement(Share2),
      label: "Facebook",
    },
    {
      url: "https://suradetj.wordpress.com/",
      icon: React.createElement(Globe),
      label: "Website",
    },
  ],
};
