import React from 'react'
import { GiCompass, GiDiamondHard, GiStabbedNote } from 'react-icons/gi'
export const links = [
  {
    id: 1,
    text: 'home',
    url: '/',
  },
  {
    id: 2,
    text: 'about',
    url: '/about',
  },
  {
    id: 3,
    text: 'products',
    url: '/products',
  },
]

export const services = [
  {
    id: 1,
    icon: <GiCompass />,
    title: 'mission',
    text:
     'Commitment to provide furniture that not only looks beautiful but also withstands the test of time. We are not just here to sell furniture; we are here to curate pieces that become an integral part of your life, adapting to your changing needs and growing alongside you.',
  },
  {
    id: 2,
    icon: <GiDiamondHard />,
    title: 'vision',
    text:
   'We are fueled by a customer-centric focus, constantly striving to understand your unique preferences, lifestyle, and aspirations. We believe that every home is as unique as the individuals who inhabit it. That is why we offer a range of customization options, allowing you to personalize our furniture to suit your individual style and needs.',
  },
  {
    id: 3,
    icon: <GiStabbedNote />,
    title: 'history',
    text:
    'Our story began when we realized the transformative power of thoughtfully crafted furniture pieces and how they can elevate spaces, creating a sanctuary for personal and shared moments. Present Since 2010.',
  },
]

export const products_url = 'https://course-api.com/react-store-products'

export const single_product_url = `https://course-api.com/react-store-single-product?id=`
