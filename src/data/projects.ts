import { type Project } from './types';
import luxBrandOutlet from '../assets/images/lux-brand-outlet.webp';
import wonderKids from '../assets/images/wonderkids.webp';
import sevenWonders from '../assets/images/7wonders.webp';
import spiderBaby from '../assets/images/spiderbaby.webp';
import amrTrading from '../assets/images/amr-trading.webp';
import amrRealEstate from '../assets/images/amr-realestate.webp';
import amrRealEstateMobileApp from '../assets/images/amr-realestate-app.webp';
import saniserviceCalendarWebApp from '../assets/images/saniservice.webp';
import saniserviceMobileApp from '../assets/images/saniservice-app.webp';
import visaFlyer from '../assets/images/visa-flyer.webp';
import visaFlyer2 from '../assets/images/flyer.webp';

export const projects: Project[] = [
  {
    id: 'lux-brand-outlet',
    title: 'Lux Brand Outlet',
    description: 'A modern e-commerce platform built for a luxury retail audience, featuring intuitive product discovery, smart category filtering, and a frictionless checkout experience. Designed and developed end-to-end with a custom brand identity to elevate trust, conversions, and overall shopping experience.',
    role: 'Full Stack Developer & Brand Designer',
    techStack: ['React', 'TypeScript', 'Vite', 'CSS Modules', 'SEO Optimization', 'Responsive Design', 'UI/UX Design'],
    image: luxBrandOutlet,
    images: [luxBrandOutlet],
    liveUrl: 'https://www.luxoutlet.ae/'
  },
  {
    id: 'wonder-kids',
    title: 'Wonder Kids',
    description: 'A parent-friendly kidswear e-commerce store focused on ease of use, fast navigation, and clear size selection. The platform balances playful visuals with performance-driven UX, supported by a custom logo that reflects a fun yet reliable brand identity.',
    role: 'Full Stack Developer & Brand Designer',
    techStack: ['React', 'TypeScript', 'Vite', 'CSS Modules', 'REST API', 'SEO Optimization', 'Responsive Design'],
    image: wonderKids,
    images: [wonderKids],
    liveUrl: 'https://www.wonderkids.ae/'
  },
  {
    id: '7wonders',
    title: '7wonders',
    description: 'A travel services website designed to present tour packages, visa assistance, and corporate travel solutions in a clear and professional way. Built with SEO and conversion in mind, alongside a cohesive logo that strengthens brand recognition across digital touchpoints.',
    role: 'Full Stack Developer & Brand Designer',
    techStack: ['React', 'TypeScript', 'Vite', 'CSS Modules', 'SEO Optimization', 'Responsive Design', 'UI/UX Design'],
    image: sevenWonders,
    images: [sevenWonders],
    liveUrl: 'https://www.7wonders.ae/'
  },
  {
    id: 'spiderbaby',
    title: 'SpiderBaby',
    description: 'A responsive kidswear e-commerce experience designed for smooth browsing, quick decision-making, and secure checkout. The project includes both the website and brand logo, combining playful aesthetics with a clean, conversion-focused layout.',
    role: 'Full Stack Developer & Brand Designer',
    techStack: ['React', 'TypeScript', 'Vite', 'CSS Modules', 'SEO Optimization', 'Responsive Design', 'UI/UX Design'],
    image: spiderBaby,
    images: [spiderBaby],
    liveUrl: 'https://www.spiderbaby.ae/'
  },
  {
    id: 'amr-trading',
    title: 'AMR Trading',
    description: 'A corporate website developed to clearly communicate product offerings, company background, and business inquiry flows. Focused on credibility, clarity, and scalability, with a clean UI that supports long-term brand growth.',
    role: 'Full Stack Developer',
    techStack: ['React', 'TypeScript', 'Vite', 'CSS Modules', 'SEO Optimization', 'Responsive Design', 'UI/UX Design'],
    image: amrTrading,
    images: [amrTrading],
    liveUrl: 'https://www.amrtrade.ae/'
  },
  {
    id: 'amr-real-estate',
    title: 'AMR Real Estate',
    description: 'A real estate platform tailored for buyers and investors, featuring dynamic property listings, advanced filtering, and streamlined inquiry forms. Built to balance performance, usability, and SEO, helping users quickly find and act on relevant properties.',
    role: 'Full Stack Developer',
    techStack: ['React', 'TypeScript', 'Vite', 'CSS Modules', 'REST API', 'SEO Optimization', 'Responsive Design'],
    image: amrRealEstate,
    images: [amrRealEstate],
    liveUrl: 'https://www.amrrealestate.ae/'
  },
  {
    id: 'amr-real-estate-mobile-app',
    title: 'AMR Real Estate Mobile App',
    description: 'A mobile-first real estate application enabling users to browse listings, contact agents, schedule viewings, and manage inquiries on the go. Designed for speed, clarity, and ease of use across Android and iOS devices.',
    role: 'Mobile Application Developer',
    techStack: ['Flutter', 'Dart', 'REST API', 'UI/UX Design', 'Android Studio'],
    image: amrRealEstateMobileApp,
    images: [amrRealEstateMobileApp]
  },
  {
    id: 'saniservice-calendar-web-app',
    title: 'Saniservice Calendar Booking',
    description: 'A calendar-driven booking system that simplifies service scheduling through real-time availability, automated technician assignment, and centralized service management. Built to reduce operational friction and improve booking efficiency for both users and admins.',
    role: 'Frontend Developer',
    techStack: ['React', 'JavaScript', 'Tailwind CSS', 'REST API', 'Redux', 'UI/UX Design'],
    image: saniserviceCalendarWebApp,
    images: [saniserviceCalendarWebApp],
    liveUrl: 'https://bookings.saniservice.com/home'
  },
  {
    id: 'saniservice-mobile-app',
    title: 'Saniservice Mobile App',
    description: 'An all-in-one service platform allowing users to book services, purchase products, read blogs, track orders, and communicate with support in real time. Designed as a scalable mobile ecosystem with integrated payments and a user-friendly experience.',
    role: 'Mobile Application Developer',
    techStack: ['React Native', 'Tailwind CSS', 'REST API', 'Payment Gateway', 'WooCommerce', 'UI/UX Design'],
    image: saniserviceMobileApp,
    images: [saniserviceMobileApp],
    liveUrl: 'https://apps.apple.com/il/app/saniservice/id6749528313'
  },
  {
    id: 'uae-visa-flyer-design',
    title: 'UAE Visa Flyer Design',
    description: 'A conversion-focused digital flyer designed for a UAE visa services provider, optimized for social media platforms and WhatsApp Business sharing. The layout prioritizes clear pricing, fast readability on mobile devices, and strong trust signals to drive inquiries through direct messaging.',
    role: 'Graphic Designer',
    techStack: ['Adobe Illustrator', 'Adobe Photoshop', 'Layout Design', 'Typography', 'Visual Hierarchy'],
    image: visaFlyer,
    images: [visaFlyer]
  },
  {
    id: 'uae-visa-flyer-campaign-iteration',
    title: 'UAE Visa Flyer (Campaign Iteration)',
    description: 'A refined follow-up design created for the same client at a later stage, building on previous performance insights. The updated layout improves visual hierarchy, call-to-action clarity, and brand consistency while remaining optimized for social media feeds and messaging platforms like WhatsApp Business.',
    role: 'Graphic Designer',
    techStack: ['Adobe Illustrator', 'Adobe Photoshop', 'Layout Design', 'Typography', 'Brand Consistency'],
    image: visaFlyer2,
    images: [visaFlyer2]
  }
];